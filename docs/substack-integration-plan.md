# Substack Integration — Espacio Interior

## Overview

Substack is the primary blog and newsletter platform. The website's `/blog` page pulls posts from the Substack RSS feed and displays them as cards. Visitors click through to Substack to read the full post. This drives newsletter subscriptions, which is the long-term engagement asset for Grace as a solo practitioner.

**Key principle:** The site displays the hook (card with cover image + excerpt). Substack delivers the full content and captures subscribers.

---

## Substack Account

| Field | Value |
|---|---|
| Publication subdomain | `espaciointeriorec.substack.com` |
| RSS feed | `https://espaciointeriorec.substack.com/feed` |
| Handle / profile | `https://substack.com/@espaciointeriorec` |
| Publication name | **Needs updating to "Espacio Interior EC"** in Settings → Basics |

---

## Architecture

```
Substack (Grace writes post)
    │
    ▼
RSS feed (https://espaciointeriorec.substack.com/feed)
    │
    ├──▶  /blog page (site) — cards with cover image + excerpt
    │         └── visitor clicks → opens full post on Substack
    │
    └──▶  Facebook automation (separate effort — see below)
```

---

## Implemented ✅

| File | What it does |
|---|---|
| `lib/substack.ts` | Fetches RSS, parses XML, returns `SubstackPost[]`. Graceful degradation — returns `[]` on any failure. 1-hour server cache. |
| `lib/blog-unified.ts` | Merges local + Substack posts, sorted by date desc. |
| `lib/blog.ts` | `PostMeta` extended with optional `source?` and `url?` fields. |
| `lib/constants.ts` | `SUBSTACK_RSS_URL`, `SUBSTACK_HANDLE`, `SUBSTACK_URL` constants. |
| `components/blog/SubstackSubscribeWidget.tsx` | Subscribe button linking to Substack profile. Two variants: `"footer"` and `"blog-page"`. Shows "Próximamente" when env var not set. |
| `components/layout/Footer.tsx` | Subscribe widget added to third column. |
| `app/(marketing)/blog/page.tsx` | Uses unified posts, all cards link out to Substack. Subscribe widget + Pinterest section below. |
| `.env.example` | `SUBSTACK_PUBLICATION` + `NEXT_PUBLIC_SUBSTACK_HANDLE` documented. |
| Admin section | Fully removed — `app/admin/`, `app/api/admin/`, `app/api/facebook/post/`, `proxy.ts`, `AdminFacebookTabs`, `BlogPostSharer`, `PostComposer` all deleted. |
| Local markdown post | `content/blog/bienvenida-al-espacio.md` deleted. |

---

## Environment Variables

```bash
# .env.local
SUBSTACK_PUBLICATION=espaciointeriorec        # server-only — RSS URL
NEXT_PUBLIC_SUBSTACK_HANDLE=espaciointeriorec # client+server — subscribe link
```

---

## Pending — Blog Card UI 🔲

The blog page currently renders a plain list. Cards need to be redesigned with:

### Layout
- Container: `max-w-5xl`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`

### Card anatomy
```
┌──────────────────────────────────┐
│  [cover image — full width]      │  ← from RSS <enclosure> or <media:content>
│  (sage-green placeholder if none)│
├──────────────────────────────────┤
│  date                            │
│  Title (display font, 2 lines)   │
│  Excerpt (3 lines, truncated)    │
│                                  │
│  Leer artículo → ↗               │
└──────────────────────────────────┘
```

### Cover image
Substack includes cover images in the RSS feed via `<enclosure>` or `<media:content>`. Needs verification once a post is published. `SubstackPost` type needs an `imageUrl?: string` field added to `lib/substack.ts`.

### Writing guidance for Grace
- **Lead with the emotional hook** in the first sentence — that's the excerpt
- **No preamble** ("En este artículo...") — wastes the 200-character window
- **Set a custom subtitle** in Substack's post editor — Substack may use this as the RSS `<description>` instead of raw body text (verify once first post is published)
- **Always set a cover image** in the post editor — it becomes the card visual

### Files to modify
- `lib/substack.ts` — add `imageUrl?: string` to `SubstackPost`, extract from `<enclosure>` or `<media:content>`
- `app/(marketing)/blog/page.tsx` — replace list with card grid

---

## Pending — Remaining Gaps 🔲

### 1. Substack icon in social links
Substack should appear alongside Instagram, Facebook, LinkedIn, Pinterest in the footer social links. Needs a Substack SVG icon added to `components/ui/SocialLinks.tsx` and `SOCIAL_LINKS` in `lib/constants.ts`.

### 2. Empty state — subscribe CTA
When the RSS feed has no posts (currently the case), the page shows "Próximamente." The subscribe widget should be front and center in the empty state — not buried below a missing list.

### 3. RSS cache lag (1 hour)
New Substack posts take up to 1 hour to appear on the site. Once the Facebook automation cron is built, the cron job should also call Next.js on-demand revalidation (`/api/revalidate`) so the blog page updates immediately when a new post is detected.

### 4. Phase B — Bilingual ES/EN
Separate initiative. See project memory for the full plan.

---

## Out of Scope — Separate Effort

### Substack → Facebook Automation
Infrastructure is partially provisioned (DynamoDB table, EventBridge cron, secrets in `.env.local`) but the application code does not exist yet.

**What's needed:**
- `app/api/cron/substack-sync/route.ts` — POST endpoint protected by `CRON_SECRET` header
  1. Fetch Substack RSS
  2. Check DynamoDB (`DYNAMODB_TABLE_NAME`) for already-posted slugs
  3. For each new post: call `publishPost()` from `lib/facebook.ts` with title + excerpt + Substack URL
  4. Write posted slugs to DynamoDB
- AWS EventBridge rule triggering the endpoint on a schedule (e.g. every 30 min)
- After posting to Facebook: trigger Next.js revalidation so the site blog updates too

**Env vars already in `.env.local`:**
```
CRON_SECRET=...
DYNAMODB_TABLE_NAME=interior-espacio-substack-posts
DYNAMODB_ACCESS_KEY_ID=...
DYNAMODB_SECRET_ACCESS_KEY=...
```

---

## Content Quality Checklist (for Grace)

Before publishing each Substack post:
- [ ] Cover image set (becomes the card visual on the website)
- [ ] Custom subtitle set (may become the card excerpt — verify with first post)
- [ ] First sentence is a strong emotional hook — not a preamble
- [ ] Post language is set to Español
- [ ] Publication name updated to "Espacio Interior EC" in Settings → Basics (one-time)
