# Social Media Integration — Interior Espacio

## Context

The site has no social media presence wired up yet. The therapist needs Instagram, Facebook, LinkedIn, and WhatsApp profile links surfaced on the site, plus proper Open Graph meta tags so pages render rich preview cards when shared on social platforms. This is purely additive — no existing functionality changes.

---

## Scope

**Platforms:** Instagram, Facebook, LinkedIn, WhatsApp  
**Icons:** Custom organic SVGs matching the existing brand icon system  
**Placement:** Footer (column 1, below tagline) + OG meta tags sitewide  

---

## Files to Create

### 1. Four custom icon components

Follow the existing pattern in `components/ui/icons/` exactly:
- `IconProps` interface (`size`, `className`, `aria-label`, `aria-hidden`)
- `viewBox="0 0 24 24"`, `fill="none"`, `currentColor`, `strokeWidth={1.5}`, `strokeLinecap="round"`, `strokeLinejoin="round"`
- Rounded square frame (`rx={4}`) with `fillOpacity={0.10}` on each, platform mark inside

**`components/ui/icons/InstagramIcon.tsx`**  
Rounded square + inner circle (camera lens) + small filled corner dot (top-right).

**`components/ui/icons/FacebookIcon.tsx`**  
Rounded square + stroked "f" letterform (vertical stem, top curve, crossbar).

**`components/ui/icons/LinkedInIcon.tsx`**  
Rounded square + small filled dot (top-left, the "i" in "in") + vertical "l" stroke + "n" arch.

**`components/ui/icons/WhatsAppIcon.tsx`**  
Organic rounded speech-bubble outline with a small phone arc path inside.

### 2. `components/ui/SocialLinks.tsx`

Reusable component. Reads from `SOCIAL_LINKS` constant, renders an `<a>` for each platform that has a non-empty URL.

```tsx
// Props
interface SocialLinksProps {
  className?: string;
  iconSize?: "sm" | "md";  // 16px or 20px
}
```

- `flex gap-3 items-center` row
- Each link: `text-text-muted hover:text-primary transition-colors duration-150`
- `target="_blank" rel="noopener noreferrer"` on external links
- WhatsApp opens `https://wa.me/{number}` format
- Each icon wrapped with `aria-label` (e.g., `"Instagram de Interior Espacio"`)
- Skip rendering links where the URL is an empty string placeholder

### 3. `app/opengraph-image.tsx`

Uses Next.js `ImageResponse` from `next/og` (built into Next.js — no new dependency).  
Output: 1200×630px image with:
- Sage green background (`#e8ede8`)
- Centered logo mark (SVG inline) in primary color (`#6b7f6b`)
- Site name in Playfair Display
- Tagline in Inter

---

## Files to Modify

### `lib/constants.ts`

Add `SOCIAL_LINKS` object with placeholder strings. Empty string = link is skipped by `SocialLinks`.

```ts
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  facebook:  process.env.NEXT_PUBLIC_FACEBOOK_URL  ?? "",
  linkedin:  process.env.NEXT_PUBLIC_LINKEDIN_URL  ?? "",
  whatsapp:  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",  // digits only, e.g. "593912345678"
};
```

### `.env.example`

Add the four new env vars with comments.

### `components/ui/icons/index.ts`

Add exports for the four new icon components.

### `components/layout/Footer.tsx`

In column 1 (logo + tagline block), add `<SocialLinks className="mt-4" iconSize="sm" />` after the `<p>` tagline. No layout changes needed — the icon row fits naturally below the existing content.

### `app/layout.tsx`

Extend the existing `metadata` export with:

```ts
openGraph: {
  title: SITE_NAME,
  description: "Acompañamiento psicológico en línea para transiciones y procesos de cambio.",
  url: SITE_URL,
  siteName: SITE_NAME,
  locale: "es_EC",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: SITE_NAME,
  description: "Acompañamiento psicológico en línea...",
},
```

---

## Implementation Order

1. `lib/constants.ts` + `.env.example`
2. Four icon files + update `icons/index.ts`
3. `components/ui/SocialLinks.tsx`
4. `components/layout/Footer.tsx` (import + place `<SocialLinks>`)
5. `app/layout.tsx` (OG meta)
6. `app/opengraph-image.tsx`

---

## Verification

- `npm run dev` — no TypeScript errors, no lint errors
- Footer renders 4 icon links (or fewer if env vars not set) at 16px, inheriting `text-text-muted` → `text-primary` on hover
- Inspect SVG output in DevTools: `stroke-width="1.5"`, `currentColor` present, `aria-label` on each `<a>`
- WhatsApp link opens `https://wa.me/…` format
- Set one env var to empty string → that icon is hidden (graceful skip)
- OG: check `<meta property="og:title">` in page source
- Share a page URL in WhatsApp/Telegram to verify the preview card renders
