# Instagram Integration — Research & Analysis

## Context

**Site:** Espacio Interior — single-therapist online psychology practice (Grace P. Pacheco) targeting Spanish-speaking Latin American clients.

**Current Instagram status:** Footer icon link only — no feed embed, no API integration, no content publishing capability.

**Goal:** Analyze the benefits, technical options, risks, and recommended approach for a deeper Instagram integration.

---

## Key Findings

### 1. API Landscape (2025–2026)

| API | Status | Use |
|-----|--------|-----|
| Basic Display API | **Dead** (deprecated Dec 4, 2024) | N/A |
| Instagram Graph API | **Active** | Feed display, publishing, Reels, Insights |
| Meta oEmbed | Active (new version Apr 8, 2025) | Single-post embeds |

**Requirement:** Graph API requires Instagram Business or Creator account connected to a Facebook Page (same setup as the existing Facebook Page integration already scaffolded in the codebase).

---

### 2. Technical Options Ranked by Complexity

#### Option A — Third-Party Widget (Elfsight / LightWidget) — Lowest Effort
- Paste embed snippet into a Next.js component
- Displays latest feed posts automatically; zero API management
- Free tier available; no token refresh logic
- **Tradeoff:** External dependency, limited styling control, external script load
- **Setup:** ~15 min

#### Option B — Graph API Feed Embed — Moderate Effort
- `GET /me/media?fields=id,caption,media_url,permalink,timestamp`
- Server-side API route + 30-min cache (mirrors existing `/api/facebook/feed` pattern)
- Long-lived token (expires 60 days) needs refresh logic
- Full brand-consistent styling, no third-party script
- **Setup:** ~6–8 hours

#### Option C — Graph API + Content Publishing (Admin Panel) — High Effort
- Post/schedule Reels and feed content from Next.js admin panel
- Extends existing `lib/facebook.ts` publish/schedule pattern to Instagram
- Enables cross-posting Substack articles to Instagram automatically
- **Setup:** ~12–16 hours (includes admin panel UI)

#### Option D — Hybrid (Widget + Graph API Publishing) — Recommended
- Widget handles the public feed display (fast, zero maintenance)
- Graph API only for outbound publishing and Substack-to-Instagram automation
- Reuses cron automation pattern from `docs/substack-facebook-automation.md`

---

### 3. Benefits for a Therapy Practice

**Trust & Authority Building**
- Live Instagram feed on site shows active, engaged practice
- Educational carousel posts (anxiety, self-care) establish expertise
- Reduces "is this a real practice?" friction for prospective clients

**Booking Funnel**
- Instagram bio → Linktree → WhatsApp (already implemented) is a high-converting funnel for Spanish-speaking audiences
- Reels (breathing exercises, therapy explainers) drive organic discovery; 2025 algorithm heavily weights video engagement
- Stories with poll questions generate algorithm signals

**Content Repurposing**
- Substack articles → Instagram carousels (already planned for Facebook via `docs/substack-facebook-automation.md`)
- Same cron automation can cross-post to Instagram simultaneously

**Community & Language Reach**
- Spanish-language Reels and carousels reach Latin American audience organically via hashtags and suggested content
- Unique advantage: very few Ecuadorian therapists have polished Spanish-language Instagram + website integration

---

### 4. Restrictions & Risks

**Meta Health Advertising Policy (2025)**
- Meta Pixel **cannot track therapy-booking conversions** (restricted health category)
- Embedding the Instagram feed itself is NOT restricted
- Recommendation: Do not use Meta Pixel for `Lead` or `CompleteRegistration` events on this site — use Google Analytics or Plausible instead with neutral event names

**Token Management**
- Long-lived tokens expire after 60 days
- Must implement token refresh cron or reminder before expiry
- The site already has this concern on the Facebook side (same solution applies)

**Account Requirement**
- Grace's Instagram must be converted from Personal → Business or Creator account
- Must be linked to the `espaciointeriorec` Facebook Page (already exists)
- Conversion is effectively one-way

**Rate Limits**
- 200 API calls/hour (standard tier)
- 30-min server-side cache on feed (matches Facebook feed route pattern) easily stays within limits

---

## Recommended Implementation (Phased)

### Phase 1 — Feed Embed via Graph API Route (mirrors Facebook pattern)
**Why:** The codebase already has a complete pattern for this in `/api/facebook/feed` and `lib/facebook.ts`. Replicating it for Instagram is low-risk and keeps all styling on-brand (no third-party widget).

**Files to create:**
- `lib/instagram.ts` — Graph API client (getMediaFeed, publishPost, refreshToken)
- `app/api/instagram/feed/route.ts` — Server route with 30-min cache
- `components/instagram/InstagramFeed.tsx` — Feed grid component (reuse Facebook card pattern)
- `docs/instagram-integration.md` — Setup guide (mirrors `facebook-app-setup.md` structure)

**Files to modify:**
- `lib/constants.ts` — Add `INSTAGRAM_PROFILE_URL` to `SOCIAL_LINKS`
- `.env.example` — Add `INSTAGRAM_USER_ID`, `INSTAGRAM_ACCESS_TOKEN`

**Where to display:** Contact page (alongside existing Facebook PageFeed) or a new "Síguenos" section on the homepage between About and FAQ.

**Account setup steps (same as Facebook App):**
1. Convert Grace's Instagram to Business account
2. Link to `espaciointeriorec` Facebook Page
3. In existing Meta App (already created for Facebook), add Instagram product
4. Generate User Access Token → exchange for Long-Lived Token (60-day)
5. Note User ID from `GET /me` response

### Phase 2 — Content Publishing (optional, later)
- Add Instagram publish/schedule to the Substack automation cron
- Cross-post new Substack articles as Instagram carousels automatically
- Follows pattern already designed in `docs/substack-facebook-automation.md`

---

## Files Referenced

| File | Role |
|------|------|
| [lib/facebook.ts](../lib/facebook.ts) | Reference pattern for Graph API client to replicate |
| [app/api/facebook/feed/route.ts](../app/api/facebook/feed/route.ts) | Reference for cached API route pattern |
| [components/facebook/PageFeed.tsx](../components/facebook/PageFeed.tsx) | Reference for feed component UI pattern |
| [lib/constants.ts](../lib/constants.ts) | SOCIAL_LINKS — add Instagram URL |
| [docs/facebook-app-setup.md](facebook-app-setup.md) | Template for Instagram setup guide |
| [docs/substack-facebook-automation.md](substack-facebook-automation.md) | Pattern for Phase 2 cross-posting |

---

## Verification Plan

1. `INSTAGRAM_ACCESS_TOKEN` set in `.env.local` → `GET /api/instagram/feed` returns JSON with media items
2. `InstagramFeed` component renders 6–9 posts in a responsive grid
3. Token refresh: manually calling refresh endpoint returns a new token with reset 60-day expiry
4. Contact page (or new section) shows feed without layout shift or FOUC
5. `SocialLinks` footer icon links to configured Instagram profile URL
6. No Meta Pixel conversion events fire on form submission (verify with Meta Pixel Helper)
