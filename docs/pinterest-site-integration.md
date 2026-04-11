# Pinterest — Site Integration Map

## Current Coverage

| Location | Type | Notes |
|----------|------|-------|
| `app/layout.tsx` | Domain verification meta tag | Conditional on `PINTEREST_DOMAIN_VERIFY` env var |
| Footer (`SocialLinks`) | Profile icon link | Conditional on `NEXT_PUBLIC_PINTEREST_URL` env var |
| `/blog` landing | Board embed ("Síguenos en Pinterest") | Loads `/recursos/` board, bottom of page |
| `/blog/[slug]` | Save button ("Guardar en Pinterest") | Share footer, after Facebook button |

---

## Recommended Integration Points

### 1. Homepage (`app/page.tsx`) — HIGH PRIORITY

**Testimonials section**
- Each of the 3 anonymous client quotes is ideal pin content — quote graphics are the highest-performing Pinterest format in wellness
- Add a small "Guardar" save link on each testimonial card
- `pageUrl` = homepage, `imageUrl` = OG image, `description` = quote text

**FAQ section**
- 6 FAQ answers are educational mental health content — exactly what users save on Pinterest
- Add a single "Guardar estos consejos" save button at the section level (cleaner than per-item)

### 2. Services page (`app/(marketing)/services/page.tsx`) — MEDIUM PRIORITY

**Closing quote card**
- "No necesitas tener todo claro para comenzar..." is quotable and shareable
- Single Save button below the quote

**Service category cards** (optional)
- The 4 transition categories could each have a save button
- Lower priority — more functional than inspirational

### 3. About page (`app/(marketing)/about/page.tsx`) — MEDIUM PRIORITY

**Approach philosophy cards**
- Grace's 4 integrative methodology cards describe her therapeutic approach in quotable language
- Save button per card or one at the section level

### 4. Contact page (`app/(marketing)/contact/page.tsx`) — SKIP

No Pinterest-shareable content.

---

## Integration Summary

| Integration Type | Status |
|-----------------|--------|
| Footer profile link | ✅ Already built |
| Domain verification | ✅ Already built |
| Blog post Save button | ✅ Already built |
| Blog landing board embed | ✅ Already built |
| Homepage testimonial Save buttons | ❌ Add |
| Homepage FAQ Save button (section-level) | ❌ Add |
| Services closing quote Save button | ❌ Add |
| About philosophy Save button | ❌ Optional |

---

## Files to Modify

| File | Change |
|------|--------|
| `app/page.tsx` | Add `PinterestSaveButton` to Testimonials and FAQ sections |
| `app/(marketing)/services/page.tsx` | Add `PinterestSaveButton` to closing quote |
| `app/(marketing)/about/page.tsx` | Add `PinterestSaveButton` to approach cards (optional) |

No new components needed — `components/blog/PinterestSaveButton.tsx` is reusable across all pages.

---

## Image Strategy Note

All Save buttons can use the global OG image (`/opengraph-image`) as the default pin image. For better Pinterest performance, each section should eventually get its own portrait-ratio (2:3) image — but the OG image is an acceptable starting point. The `imageUrl` prop on `PinterestSaveButton` makes swapping this in later trivial.

---

## Verification

1. `npm run dev` — Confirm Save buttons appear on homepage testimonials, FAQ, and services closing quote
2. Hover each button — border and text shift to `--primary` (sage green)
3. Click a button — Pinterest opens in new tab with `url`, `media`, and `description` params pre-filled and URL-encoded
4. Mobile — buttons are touch-friendly and don't clutter the layout
