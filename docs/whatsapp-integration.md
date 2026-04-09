# WhatsApp Business Integration — Tier 1 (Click-to-Chat)

## Context

Espacio Interior serves Spanish-speaking clients in Ecuador where WhatsApp is the dominant communication channel. Adding click-to-chat entry points throughout the site lowers friction for prospective clients to reach the therapist directly. No API key or Meta Business account needed — just a phone number in the env file.

---

## Scope

Three touch points, all opening `https://wa.me/{NUMBER}?text={PREFILLED_ES}` in a new tab:

1. **Floating button** — persists on every page, bottom-right, 52 × 52 px
2. **Contact page card** — above the existing `ContactForm`, separated by an "o" divider
3. **ContactCTA secondary button** — alongside the existing "Agenda tu consulta" link on the homepage

---

## Files to create

| Path | Purpose |
|---|---|
| `components/ui/icons/WhatsAppIcon.tsx` | SVG icon matching the existing `IconProps` pattern |
| `components/ui/WhatsAppFloat.tsx` | Floating button — client component (needs `useEffect` for delayed mount) |
| `components/ui/WhatsAppContactOption.tsx` | Card for the contact page |
| `components/layout/ClientProviders.tsx` | Thin client boundary so `app/layout.tsx` stays a Server Component |

## Files to modify

| Path | Change |
|---|---|
| `lib/constants.ts` | Add `WHATSAPP_NUMBER` + `WHATSAPP_PREFILLED_MESSAGE` |
| `.env.example` | Add `NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX` |
| `components/ui/icons/index.ts` | Export `WhatsAppIcon` |
| `app/layout.tsx` | Import `ClientProviders`, wrap `<main>` |
| `app/(marketing)/contact/page.tsx` | Add `WhatsAppContactOption` + "o" divider above `ContactForm` |
| `components/sections/ContactCTA.tsx` | Wrap existing `<Link>` + new WhatsApp `<a>` in a flex container |

---

## Implementation steps

### 1. Config (`lib/constants.ts` + `.env.example`)

```ts
// lib/constants.ts — append after existing exports
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "593XXXXXXXXX";

export const WHATSAPP_PREFILLED_MESSAGE = encodeURIComponent(
  "Hola, me gustaría agendar una consulta de exploración gratuita con Espacio Interior."
);
```

`.env.example` — append one line:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=593XXXXXXXXX
```

### 2. Icon (`components/ui/icons/WhatsAppIcon.tsx`)

Follow the existing `IconProps` interface (same shape as `ContactoIcon.tsx`). Single-path fill SVG at `viewBox="0 0 24 24"`. Export as named export, add to `index.ts`.

### 3. `ClientProviders.tsx`

`app/layout.tsx` is a Server Component and must stay one (it exports `metadata`). The floating button needs `useEffect` so it can only live inside a client boundary.

```tsx
// components/layout/ClientProviders.tsx
"use client";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WhatsAppFloat />
    </>
  );
}
```

`app/layout.tsx` change — replace `<main>` with:
```tsx
import ClientProviders from "@/components/layout/ClientProviders";

// body:
<Header />
<ClientProviders>
  <main className="flex-1">{children}</main>
</ClientProviders>
<Footer />
```

### 4. Floating button (`components/ui/WhatsAppFloat.tsx`)

Key decisions:
- `"use client"` — uses `useState`/`useEffect`
- 1 200 ms delayed mount via `setTimeout` — avoids competing with LCP paint; also prevents hydration mismatch (server renders nothing, client shows button after delay)
- `AnimatePresence` + `motion.a` — reuses Framer Motion already in the project
- `<a>` not `<button>` — navigates to an external URL, semantically correct
- `target="_blank" rel="noopener noreferrer"`
- Size: 52 × 52 px (exceeds 44 px WCAG minimum tap target)
- Background: `#25D366` (WhatsApp brand green — only permitted exception in the palette)
- Focus ring: uses `--ring` (sage green) via `focus-visible:ring-[var(--ring)]`
- `z-40` — above page content, below Header (`z-50`)

### 5. Contact page card (`components/ui/WhatsAppContactOption.tsx`)

Renders as a styled `<a>` card:
- Left: round icon container with warm-sand background (`--secondary-light`) + WhatsApp green icon
- Center: "Escribir por WhatsApp" headline + "Respondo lo antes posible, normalmente el mismo día." subtext
- Right: chevron arrow that lightens on hover

`contact/page.tsx` — insert before `<ContactForm />`:
```tsx
<WhatsAppContactOption />
<div className="flex items-center gap-4 my-8" role="separator">
  <span className="flex-1 border-t border-border" />
  <span className="text-xs text-text-muted tracking-widest uppercase">o</span>
  <span className="flex-1 border-t border-border" />
</div>
```

### 6. ContactCTA secondary button (`components/sections/ContactCTA.tsx`)

`ContactCTA.tsx` is already `"use client"`. Change the single `<Link>` into a flex container:

```tsx
<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
  <Link
    href="/contact"
    className="inline-block w-full sm:w-auto rounded-full bg-white text-primary px-8 py-3.5 text-sm font-medium transition-colors duration-200 hover:bg-primary-light active:scale-[0.98]"
  >
    Agenda tu consulta
  </Link>
  <a
    href={WA_HREF}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escríbeme por WhatsApp"
    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-white/50 text-primary-foreground px-8 py-3.5 text-sm font-medium transition-colors duration-200 hover:bg-white/10 active:scale-[0.98]"
  >
    <WhatsAppIcon size={16} className="text-[#25D366]" aria-hidden />
    WhatsApp
  </a>
</div>
```

`WA_HREF` is module-level:
```ts
import { WHATSAPP_NUMBER, WHATSAPP_PREFILLED_MESSAGE } from "@/lib/constants";
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILLED_MESSAGE}`;
```

---

## Verification

- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run build` — clean build
- [ ] `app/layout.tsx` still has no `"use client"` directive and still exports `metadata`
- [ ] Floating button appears ~1.2 s after page load on all routes
- [ ] Button does not cover Footer content when scrolled to bottom
- [ ] All three links open `https://wa.me/593...` in a new tab with Spanish pre-filled text
- [ ] Contact form (`ContactForm`) still submits to `/api/contact` — unaffected
- [ ] On mobile, the two ContactCTA buttons stack vertically; on `sm:+` they are side by side
- [ ] Focus ring on floating button is sage green (not WhatsApp green)
- [ ] No hydration warnings in browser console

---

## No new npm packages required

All dependencies (`framer-motion`, `lucide-react`, Tailwind, React) are already in `package.json`.
