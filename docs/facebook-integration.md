# Facebook Integration Plan — Espacio Interior

## Context

The therapy site needs Facebook integration across four areas:
- **Auto-post blog articles**: One-click share of blog posts from an admin panel (true "auto-post" requires a persistent store we don't have, so the practical equivalent is a dedicated admin UI that surfaces unshared posts)
- **Admin composer**: Write and schedule posts to the Facebook Page, using Facebook's native scheduling via the Graph API (no our own scheduler needed)
- **Embedded feed**: Fetch recent Page posts server-side via Graph API and render natively on the site (no FB JS SDK, no iframe)
- **Share buttons**: Simple share links on blog post pages

Credentials: long-lived Page Access Token + Page ID in `.env` / environment variables.

---

## Prerequisite: Blog Foundation

The blog is currently scaffolded but empty (`content/blog/` is empty, pages show placeholders). All Facebook blog features depend on a real blog system.

### 1. Install `gray-matter`
```
npm install gray-matter
```

### 2. Create `lib/blog.ts`
Parse `.md` files from `content/blog/` with frontmatter:
```ts
// Frontmatter shape
type PostMeta = {
  title: string
  slug: string
  date: string          // ISO date
  excerpt: string
  published: boolean
}
```
Export:
- `getAllPosts(): PostMeta[]` — sorted newest-first, only `published: true` in production
- `getPostBySlug(slug: string): { meta: PostMeta; content: string } | null`

### 3. Wire up blog pages
- `app/(marketing)/blog/page.tsx` — list posts from `getAllPosts()`
- `app/(marketing)/blog/[slug]/page.tsx` — fetch via `getPostBySlug(slug)`, render markdown with `remark`/`remark-html`, add `generateStaticParams()`

> **Note:** `params` is now `Promise<{ slug: string }>` in Next.js 16 — must be awaited.

---

## Environment Variables

Add to `.env.example` and actual `.env.local`:
```
FACEBOOK_PAGE_ID=
FACEBOOK_PAGE_ACCESS_TOKEN=   # Long-lived (never expires) Page token
NEXT_PUBLIC_FACEBOOK_URL=     # Your Page URL (for footer/social links)
ADMIN_SECRET=                 # Passphrase to access /admin/*
```

---

## Phase 1: Facebook API Client (`lib/facebook.ts`)

All calls use `fetch()` to the Graph API. No SDK needed.

```ts
const BASE = `https://graph.facebook.com/v21.0`
const PAGE_ID = process.env.FACEBOOK_PAGE_ID
const TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

// Post immediately
export async function publishPost(message: string, link?: string)

// Schedule (uses FB native scheduling: published=false + scheduled_publish_time)
export async function schedulePost(message: string, publishAt: Date, link?: string)

// Fetch recent page posts for feed embed
export async function getPageFeed(limit = 5): Promise<FeedPost[]>
// FeedPost: { id, message, story, created_time, full_picture, permalink_url }
```

Graph API endpoints:
- Post: `POST /{page-id}/feed` with `message`, `link`, `access_token`
- Schedule: same endpoint + `published=false`, `scheduled_publish_time={unix_timestamp}`
- Feed: `GET /{page-id}/feed?fields=id,message,story,created_time,full_picture,permalink_url&limit={n}&access_token=...`

---

## Phase 2: API Routes

### `app/api/facebook/post/route.ts`
```ts
export async function POST(request: NextRequest)
```
- Body: `{ message: string, link?: string, scheduledAt?: string (ISO) }`
- Validates auth via cookie (`admin_session`) OR `Authorization: Bearer <secret>` header
- Calls `publishPost()` or `schedulePost()` from `lib/facebook.ts`
- Returns `{ success: true, postId }` or error

### `app/api/facebook/feed/route.ts`
```ts
export const revalidate = 1800 // 30 min cache
export async function GET()
```
- Calls `getPageFeed()`
- Returns JSON array of feed posts

---

## Phase 3: Admin Infrastructure

### `proxy.ts` (root level — replaces deprecated `middleware.ts`)
Protects all `/admin/*` routes using the `admin_session` cookie. Redirects to `/admin/login` if unauthenticated.

```ts
export function proxy(request: NextRequest) { ... }
export const config = { matcher: ['/admin/:path*'] }
```

### `app/api/admin/login/route.ts`
`POST` — validates body `{ secret }` against `ADMIN_SECRET`, sets httpOnly cookie.

### `app/api/admin/logout/route.ts`
`POST` — clears the cookie and redirects to `/admin/login`.

### `app/admin/login/page.tsx`
Server Component. Wraps `<LoginForm>` (the client form that calls `useSearchParams`) in `<Suspense>` to satisfy Next.js static prerendering requirements.

### `app/admin/layout.tsx`
Minimal admin shell (no public nav/footer). Includes a logout button.

---

## Phase 4: Admin Facebook UI

### `components/facebook/PostComposer.tsx` (Client Component)
- Textarea for message (char count, 63,206 limit)
- Optional link URL field
- Toggle: "Publicar ahora" vs "Programar" (shows datetime picker if scheduled)
- Submits to `POST /api/facebook/post` — cookie auth is automatic
- Shows success/error state with Facebook post ID on success

### `components/facebook/BlogPostSharer.tsx` (Client Component)
- Receives list of blog posts from parent (including drafts)
- Each row: title, date, draft badge, "Compartir en Facebook" button
- On click: prefills the PostComposer with `${title}\n\n${excerpt}\n\n${url}`

### `components/facebook/AdminFacebookTabs.tsx` (Client Component)
Tab switcher connecting PostComposer and BlogPostSharer. Handles prefill state.

### `app/admin/facebook/page.tsx` (Server Component)
- Fetches all posts via `getAllPosts(true)` (includes unpublished)
- Renders `<AdminFacebookTabs posts={posts} />`

---

## Phase 5: Site Components

### `components/facebook/PageFeed.tsx` (Server Component)
- Calls `getPageFeed()` directly (token stays server-side)
- Renders posts natively: image, message excerpt, date, "Ver en Facebook" link
- Returns `null` silently if FB credentials aren't configured (won't break the page)
- Wired into `/contact` page inside `<Suspense>`

### `components/facebook/ShareButton.tsx` (Client Component)
Uses the FB Share Dialog URL — no JS SDK:
```
https://www.facebook.com/sharer/sharer.php?u={encodedUrl}
```
Opens in a popup (`window.open` 600×400). Wired into `app/(marketing)/blog/[slug]/page.tsx`.

---

## Files Created / Modified

| File | Action |
|---|---|
| `lib/blog.ts` | Created |
| `lib/facebook.ts` | Created |
| `proxy.ts` | Created (replaces deprecated `middleware.ts`) |
| `content/blog/bienvenida-al-espacio.md` | Created (sample post) |
| `app/(marketing)/blog/page.tsx` | Modified — real post list |
| `app/(marketing)/blog/[slug]/page.tsx` | Modified — real content + share buttons |
| `app/(marketing)/contact/page.tsx` | Modified — added `<FacebookPageFeed>` |
| `app/api/facebook/post/route.ts` | Created |
| `app/api/facebook/feed/route.ts` | Created |
| `app/api/admin/login/route.ts` | Created |
| `app/api/admin/logout/route.ts` | Created |
| `app/admin/layout.tsx` | Created |
| `app/admin/login/page.tsx` | Created |
| `app/admin/login/LoginForm.tsx` | Created |
| `app/admin/facebook/page.tsx` | Created |
| `components/facebook/PostComposer.tsx` | Created |
| `components/facebook/BlogPostSharer.tsx` | Created |
| `components/facebook/AdminFacebookTabs.tsx` | Created |
| `components/facebook/PageFeed.tsx` | Created |
| `components/facebook/ShareButton.tsx` | Created |
| `lib/constants.ts` | Modified — added `pinterest` to `SOCIAL_LINKS` |
| `.env.example` | Modified — added FB + admin vars |

---

## Verification

1. **Blog**: Add a `.md` file to `content/blog/` with frontmatter — confirm it appears at `/blog` and `/blog/slug`
2. **Feed API**: `GET /api/facebook/feed` returns a JSON array of posts
3. **Post API**: `POST /api/facebook/post` with a valid cookie creates a real post on the Facebook Page
4. **Scheduled post**: Send `scheduledAt` in the future — confirm post appears as scheduled in Facebook Creator Studio
5. **Admin login**: Visiting `/admin/facebook` without the cookie → redirected to `/admin/login`; after entering the correct secret → access granted
6. **Blog sharer**: Click "Compartir en Facebook" in admin → PostComposer prefills; submit → post appears on Page
7. **Share button**: On a blog post page, share button opens the FB share dialog in a popup
8. **Feed embed**: `FacebookPageFeed` renders live posts from the Page on `/contact`

---

## Getting Your Page Access Token

1. Go to [developers.facebook.com](https://developers.facebook.com) → My Apps → create an app
2. Add the **Pages API** product
3. Use **Graph API Explorer** to get a short-lived token, then exchange it for a long-lived one:
   ```
   GET /oauth/access_token
     ?grant_type=fb_exchange_token
     &client_id={app_id}
     &client_secret={app_secret}
     &fb_exchange_token={short_lived_token}
   ```
4. Use the long-lived token to get a **Page Access Token** (never expires if the user doesn't revoke):
   ```
   GET /me/accounts?access_token={long_lived_user_token}
   ```
5. Copy the `access_token` for your Page into `FACEBOOK_PAGE_ACCESS_TOKEN`
