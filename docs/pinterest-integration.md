# Pinterest Integration — Interior Espacio

## Context

The site has no social media presence. Pinterest is an excellent fit for a Spanish-language therapy/wellness site — its audience skews toward the same demographics. Four features are in scope: a profile link in the footer, Rich Pins metadata for all pages, Save buttons on blog posts, and a board embed on the blog index. The user has an existing Pinterest business account (URL to be provided during implementation).

---

## Implementation Plan

### Step 1 — Constants & Environment

**Modify** [`lib/constants.ts`](../lib/constants.ts)

Add a `SOCIAL_LINKS` object:

```ts
export const SOCIAL_LINKS = {
  pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL ?? "",
  // ...other platforms
};
```

**Modify** `.env.example` — add:
```
PINTEREST_DOMAIN_VERIFY=
NEXT_PUBLIC_PINTEREST_URL=https://pinterest.com/interiorespacio
```

Create `.env.local` with the same keys (empty values for now).

---

### Step 2 — Root OG Metadata + Domain Verification

**Modify** [`app/layout.tsx`](../app/layout.tsx)

Extend the existing `metadata` export:

```ts
export const metadata: Metadata = {
  // ...existing keys...
  openGraph: {
    type: "website",
    locale: "es_EC",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | Terapia en Línea`,
    description,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  // Conditional: only emit if token is set (avoids empty meta tag in dev)
  ...(process.env.PINTEREST_DOMAIN_VERIFY
    ? { other: { "p:domain_verify": process.env.PINTEREST_DOMAIN_VERIFY } }
    : {}),
};
```

Import `SITE_URL` and `SITE_NAME` from `@/lib/constants`.

---

### Step 3 — Default OG Image

**Create** [`app/opengraph-image.tsx`](../app/opengraph-image.tsx)

Next.js metadata file — auto-served at `/opengraph-image`. Use `ImageResponse` from `next/og`:

- `size`: `{ width: 1200, height: 630 }`
- `contentType`: `"image/png"`
- Design: full-bleed `#5f7260` (primary sage) background, centered white "Interior Espacio" in large system serif, tagline in `#d4e0d4` (primary-light) below it
- Use inline styles only (no Tailwind, no CSS vars — `ImageResponse` runs in Edge runtime)

When `app/opengraph-image.tsx` exists, Next.js also automatically injects the `og:image` meta tag — the explicit `images` array in Step 2 provides `width`/`height`/`alt` attributes.

---

### Step 4 — Pinterest Brand Icon

**Create** [`components/ui/icons/PinterestIcon.tsx`](../components/ui/icons/PinterestIcon.tsx)

```ts
// Brand logo icon — fill-based, not stroke.
// Exception to Lucide-only rule: Pinterest is a brand mark, not a UI icon.

interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

export function PinterestIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      {/* Simple Icons "Pinterest" — MIT license */}
      <path d="M12 0C5.373 0 ..." />
    </svg>
  );
}
```

Export from [`components/ui/icons/index.ts`](../components/ui/icons/index.ts).

---

### Step 5 — Social Links Component

**Create** [`components/ui/SocialLinks.tsx`](../components/ui/SocialLinks.tsx)

A `platforms` array drives rendering — each entry has a `key` (matches a `SOCIAL_LINKS` key), `label`, `Icon`, and `href` transformer. The list is filtered to only render platforms where `SOCIAL_LINKS[key]` is truthy. Pinterest is the last entry with `href: (v) => v`.

```ts
{
  key: "pinterest" as const,
  label: "Pinterest de Interior Espacio",
  Icon: PinterestIcon,
  href: (v: string) => v,
},
```

Icons render at `size={iconSize}` (default 20), color `text-text-muted`, hover `text-primary`, `duration-150`.

**Modify** [`components/layout/Footer.tsx`](../components/layout/Footer.tsx)

In column 1 (logo + bio), below the bio `<p>`, add `<SocialLinks />`. No structural changes to the 3-column grid.

---

### Step 6 — Pinterest Save Button (blog posts)

**Create** [`components/blog/PinterestSaveButton.tsx`](../components/blog/PinterestSaveButton.tsx)

Props:
```ts
interface Props {
  pageUrl: string      // canonical post URL
  imageUrl: string     // absolute URL to featured/OG image
  description: string  // pre-filled pin description
  className?: string
}
```

Implementation: pure `<a>` link (no SDK, no `"use client"`):
- `href` = `https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&media=${enc(imageUrl)}&description=${enc(description)}`
- `target="_blank" rel="noopener noreferrer"`
- Content: `<PinterestIcon />` + "Guardar en Pinterest"
- Styling: pill shape with border, `text-text-muted` → `text-primary` on hover, 150ms transition

**Modify** [`app/(marketing)/blog/[slug]/page.tsx`](../app/(marketing)/blog/[slug]/page.tsx)

1. Extend `generateMetadata` to return article Rich Pins metadata:

```ts
openGraph: {
  type: "article",
  url: `${SITE_URL}/blog/${slug}`,
  title: `${post.title} | ${SITE_NAME}`,
  description: post.excerpt ?? "",
  images: [{ url: post.coverImage ?? `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  article: {
    publishedTime: post.date,
    authors: [SITE_URL],
  },
},
```

2. Add `<PinterestSaveButton>` in the post share footer.

---

### Step 7 — Pinterest Board Embed

**Create** [`components/blog/PinterestBoardEmbed.tsx`](../components/blog/PinterestBoardEmbed.tsx)

Mark as `"use client"` (required for Next.js `<Script>`):

Props:
```ts
interface Props {
  boardUrl: string   // full Pinterest board URL
  width?: number     // default 380
  height?: number    // default 500
  className?: string
}
```

Render:
1. Wrapper `<div>` with `aria-label="Tablero de Pinterest"`
2. `<div data-pin-do="embedBoard" data-pin-board-width={width} data-pin-scale-height={height} data-pin-scale-width="80" data-pin-href={boardUrl} />`
3. `<Script src="https://assets.pinterest.com/js/pinit.js" strategy="lazyOnload" />`

**Modify** [`app/(marketing)/blog/page.tsx`](../app/(marketing)/blog/page.tsx)

Add a "Síguenos en Pinterest" section below the posts list:

```tsx
<div className="mt-16 pt-12 border-t border-border">
  <h2>Síguenos en Pinterest</h2>
  <p>Recursos, reflexiones y bienestar emocional.</p>
  <Suspense fallback={<div className="h-[500px] rounded-xl bg-surface-2 animate-pulse" />}>
    <PinterestBoardEmbed
      boardUrl={`${SOCIAL_LINKS.pinterest}/recursos/`}
      width={380}
      height={500}
    />
  </Suspense>
</div>
```

`Suspense` provides a loading skeleton while Pinterest's `lazyOnload` script initializes.

---

## File Summary

| Action | File |
|--------|------|
| Modified | [`lib/constants.ts`](../lib/constants.ts) |
| Modified | `.env.example` / `.env.local` |
| Modified | [`app/layout.tsx`](../app/layout.tsx) |
| Created | [`app/opengraph-image.tsx`](../app/opengraph-image.tsx) |
| Created | [`components/ui/icons/PinterestIcon.tsx`](../components/ui/icons/PinterestIcon.tsx) |
| Modified | [`components/ui/icons/index.ts`](../components/ui/icons/index.ts) |
| Created | [`components/ui/SocialLinks.tsx`](../components/ui/SocialLinks.tsx) |
| Modified | [`components/layout/Footer.tsx`](../components/layout/Footer.tsx) |
| Created | [`components/blog/PinterestSaveButton.tsx`](../components/blog/PinterestSaveButton.tsx) |
| Modified | [`app/(marketing)/blog/[slug]/page.tsx`](../app/(marketing)/blog/[slug]/page.tsx) |
| Created | [`components/blog/PinterestBoardEmbed.tsx`](../components/blog/PinterestBoardEmbed.tsx) |
| Modified | [`app/(marketing)/blog/page.tsx`](../app/(marketing)/blog/page.tsx) |

---

## Before Going Live

1. Set `NEXT_PUBLIC_PINTEREST_URL` to the real Pinterest profile URL in production env vars
2. Get the domain verify token: Pinterest Business Hub → Claim Website → HTML tag method → copy the `content` value → set as `PINTEREST_DOMAIN_VERIFY`
3. Update the board path in `blog/page.tsx` to a real board URL (replace `/recursos/` with the actual board slug)

---

## Verification

1. **Footer link** — `npm run dev` → footer column 1 shows Pinterest icon; hover turns `--primary`; click opens Pinterest in a new tab.

2. **OG image** — visit `http://localhost:3000/opengraph-image` in browser; should render a 1200×630 PNG.

3. **Blog post metadata** — view page source of `/blog/any-slug`; confirm `og:type = article`, `og:image`, and `article:published_time` are present.

4. **Save button** — hover "Guardar en Pinterest" on a blog post; inspect `href` in dev tools; verify `url`, `media`, and `description` params are URL-encoded correctly.

5. **Board embed** — with a real board URL, load `/blog`; Network tab should show `pinit.js` loading lazily after the main bundle; board widget renders.

6. **Domain verification** (requires deploy) — set `PINTEREST_DOMAIN_VERIFY` in production → verify in Pinterest Business Hub → Claim Website.

7. **Rich Pins validation** — after deploy, test a URL at `developers.pinterest.com/tools/url-debugger/`.
