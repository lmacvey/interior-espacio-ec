# Substack Integration Plan — Espacio Interior

## Context
Client wants to use Substack as a newsletter/blog platform while keeping the site `/blog` as the reader-facing destination. Two goals: (1) pull Substack posts into the blog feed via RSS; (2) let visitors subscribe without leaving the site.

- **Publication/subdomain:** `espaciointeriorec.substack.com` → RSS feed at `https://espaciointeriorec.substack.com/feed`
- **Handle:** `@espaciointerior` → subscribe/profile page at `https://substack.com/@espaciointerior`

Code must degrade gracefully if the feed is empty or unavailable.

---

## Pre-requisites (manual steps)

1. Confirm the Substack publication name and description are set in Settings → Basics.
2. Publish at least one post so the RSS feed is non-empty before enabling the integration.

---

## Implementation Steps

### Step 1 — Environment config

**`.env.example`** — add at the bottom:
```
# Substack
# Publication subdomain (for RSS)
SUBSTACK_PUBLICATION=          # e.g. espaciointeriorec
# Handle (for subscribe link) — no @ prefix
NEXT_PUBLIC_SUBSTACK_HANDLE=   # e.g. espaciointeriorec
```

**`.env.local`** (not committed):
```
SUBSTACK_PUBLICATION=espaciointeriorec
NEXT_PUBLIC_SUBSTACK_HANDLE=espaciointeriorec
```

`SUBSTACK_PUBLICATION` is server-only (no `NEXT_PUBLIC_`) — the RSS fetch happens server-side only.
`NEXT_PUBLIC_SUBSTACK_HANDLE` is needed client-side for the subscribe button link.

---

### Step 2 — `lib/constants.ts`

Add constants:
```ts
// Server-side only (RSS)
export const SUBSTACK_RSS_URL = process.env.SUBSTACK_PUBLICATION
  ? `https://${process.env.SUBSTACK_PUBLICATION}.substack.com/feed`
  : ""

// Client + server (subscribe link)
export const SUBSTACK_HANDLE = process.env.NEXT_PUBLIC_SUBSTACK_HANDLE ?? ""
export const SUBSTACK_URL = SUBSTACK_HANDLE
  ? `https://substack.com/@${SUBSTACK_HANDLE}`
  : ""
```

---

### Step 3 — Install dependency

```bash
npm install fast-xml-parser
```

`fast-xml-parser` — ~20 KB, zero transitive deps, works in Node and Edge runtimes.

---

### Step 4 — New file `lib/substack.ts`

Server-side RSS fetching layer (mirrors `lib/facebook.ts` pattern).

Exports:
- `SubstackPost` type: `{ id, title, slug, date, excerpt, url, source: "substack" }`
- `getSubstackPosts(): Promise<SubstackPost[]>`

Behavior:
- If `SUBSTACK_RSS_URL` is empty → return `[]` immediately (no network call)
- Fetch `SUBSTACK_RSS_URL` with `next: { revalidate: 3600 }` (1-hour server cache)
- Parse RSS 2.0 XML with `fast-xml-parser`; map `<item>` → `SubstackPost`
- Fields: title from `<title>`, date from `<pubDate>`, url from `<link>`, excerpt from `<description>` (strip HTML with regex), slug from last URL path segment
- Wrap all in try/catch → return `[]` on any failure (graceful degradation)

---

### Step 5 — Extend `lib/blog.ts`

Add optional fields to the `PostMeta` type:
```ts
source?: "local" | "substack"
url?: string   // canonical URL — only set for substack posts
```

Local posts omit `source` (treated as `"local"`). No other changes to `lib/blog.ts`.

---

### Step 6 — New file `lib/blog-unified.ts`

Thin aggregation layer:
- `getUnifiedPosts(): Promise<PostMeta[]>`
- Calls `getAllPosts()` and `getSubstackPosts()` concurrently via `Promise.all`
- Normalizes both to `PostMeta` shape (local: `source: "local"`, Substack: `source: "substack"` + `url`)
- Merges and sorts by date descending

---

### Step 7 — Modify `app/(marketing)/blog/page.tsx`

- Replace `getAllPosts` import with `getUnifiedPosts` from `lib/blog-unified.ts`
- Make the component `async` (RSC — trivial change)
- In the post list render, branch on `post.source`:
  - `"substack"` → `<a href={post.url} target="_blank" rel="noopener noreferrer">` + small terracotta `#b07060` "Substack" badge + Lucide `ExternalLink` icon
  - `"local"` → existing `<Link href={/blog/${post.slug}}>` unchanged
- Add `<SubstackSubscribeWidget variant="blog-page" />` between the post list and the Pinterest section (matching the existing `mt-16 pt-12 border-t` divider pattern)

---

### Step 8 — New file `components/blog/SubstackSubscribeWidget.tsx`

`"use client"` component.

Props: `{ variant: "footer" | "blog-page" }`

**Subscribe approach:** A styled link button pointing to `SUBSTACK_URL` (`substack.com/@espaciointerior`). Substack's publication page handles subscription — no API endpoint to maintain.

Structure:
- Heading: `"Recibe artículos en tu correo"`
- Subheading: `"Sin spam. Solo reflexiones y recursos sobre bienestar emocional."`
- `<a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">` styled as a button: `"Suscribirme en Substack"`
- If `SUBSTACK_URL` is empty: render a disabled `"Próximamente"` state

Styling: Tailwind CSS v4 with existing tokens. Button: sage green (`#6b7f6b`), rounded-full.

---

### Step 9 — Modify `components/layout/Footer.tsx`

Add `<SubstackSubscribeWidget variant="footer" />` to the third footer column, above the existing contact link/CTA. `"footer"` variant: compact, stacked, slightly smaller text.
---

### Step 10 — Remove entire admin section

With Substack handling blog publishing and offering native Facebook auto-sharing on post, the site's admin section has no remaining purpose.

**Delete entirely:**
- `app/admin/` — all admin pages (layout, login, facebook)
- `app/api/admin/` — login and logout API routes
- `app/api/facebook/post/` — Facebook posting API route (admin-only)
- `components/facebook/AdminFacebookTabs.tsx`
- `components/facebook/BlogPostSharer.tsx`
- `components/facebook/PostComposer.tsx`
- `proxy.ts` — auth middleware (only protected `/admin/*` routes)

**Keep (public site features, unrelated to admin):**
- `app/api/facebook/feed/` — fetches Facebook page feed for display on the public site
- `components/facebook/PageFeed.tsx` — renders the public Facebook feed section
- `lib/facebook.ts` — Facebook feed fetching utilities (used by PageFeed)

After deletion, remove the `ADMIN_SECRET` env var from `.env.example` and `.env.local`.

---

### Files untouched

`app/(marketing)/blog/[slug]/page.tsx`, existing markdown content in `content/blog/`, Pinterest components, social links. Substack posts link out externally — no local detail page.

---

## File Summary

| File | Action |
|---|---|
| `.env.example` | Add `SUBSTACK_PUBLICATION` + `NEXT_PUBLIC_SUBSTACK_HANDLE`; remove `ADMIN_SECRET` |
| `lib/constants.ts` | Add `SUBSTACK_RSS_URL`, `SUBSTACK_HANDLE`, `SUBSTACK_URL` |
| `lib/blog.ts` | Add `source?` and `url?` to `PostMeta` type |
| `lib/substack.ts` | **Create** — RSS fetch + parse + type |
| `lib/blog-unified.ts` | **Create** — merge local + Substack posts |
| `app/(marketing)/blog/page.tsx` | Use `getUnifiedPosts`, conditional links, add widget |
| `components/blog/SubstackSubscribeWidget.tsx` | **Create** — subscribe button, 2 variants |
| `components/layout/Footer.tsx` | Add subscribe widget to third column |
| `package.json` | Add `fast-xml-parser` |
| `app/admin/` | **Delete** entire directory |
| `app/api/admin/` | **Delete** entire directory |
| `app/api/facebook/post/` | **Delete** |
| `components/facebook/AdminFacebookTabs.tsx` | **Delete** |
| `components/facebook/BlogPostSharer.tsx` | **Delete** |
| `components/facebook/PostComposer.tsx` | **Delete** |
| `proxy.ts` | **Delete** |

---

## Verification

1. **Handle not set:** `NEXT_PUBLIC_SUBSTACK_HANDLE=""`. Blog shows only local post. Widget shows "Próximamente". No errors.
2. **Handle set, no posts yet:** RSS feed empty → only local posts shown. Subscribe button is active.
3. **Handle set, posts published:** Blog shows merged, date-sorted list. Substack posts show badge + external link icon.
4. **Failure simulation:** Nonexistent handle → RSS fails silently → only local posts shown.
5. **Production build:** `npm run build` passes even when env var is missing.
