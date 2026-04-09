# Interior Espacio — UI/UX Redesign (ES first, EN second, Mobile-first)

## Context
The scaffolded site is in English with generic therapy copy. The real therapist specialises in **online therapy for life transitions**. We build **everything in Spanish first, mobile-first** using Tailwind's `sm:` / `md:` / `lg:` breakpoint escalation (write for small screen, override up). A placeholder name `[Nombre de Terapeuta]` is used throughout.

---

## Mobile-first design contract (applies to every component)

- All layouts are **single-column by default**, expand to multi-column at `md:` or `lg:`
- Tap targets minimum `44px` (use `py-3` or larger on all buttons and nav links)
- Font sizes: base `text-base` mobile, scale up with `md:text-lg` etc — never tiny
- Hero: stacked (photo below text) on mobile, split 50/50 at `md:`
- Navigation: hamburger on mobile, horizontal at `md:`
- Service cards: 1-col mobile → 2-col `sm:` → 4-col `lg:`
- Process steps: vertical numbered list mobile → horizontal row `md:`
- FAQ: full-width accordion — already stack-friendly
- Testimonials: 1-col mobile → 3-col `md:`
- Footer: 1-col mobile → 3-col `md:`
- All `px-` padding: `px-4` on mobile, `px-6` at `md:`, centred `max-w` container

---

## Phase A — Spanish-first Build ✅ Complete

### A1. `app/globals.css`
Added:
- `--terracotta: #b07060` — warm accent
- `--sage-light: #e8ede8` — very light sage, organic section backgrounds
- Radix Accordion keyframe animations (`animate-accordion-down` / `animate-accordion-up`)

### A2. `components/Logo.tsx`
SVG icon (two counter-rotated organic petal forms creating a visible inner space + centre dot) + wordmark.
- `size="sm"` — icon + "Interior Espacio" wordmark only (used in Header)
- `size="md"` — adds "Terapia en Línea" subtitle (used in Footer)

### A3. `app/layout.tsx`
- `<html lang="es">`
- Metadata: title `"Interior Espacio | Terapia en Línea"`, Spanish description, locale `es_EC`

### A4. `components/layout/Header.tsx`
- Logo (`size="sm"`)
- Mobile: animated hamburger (bars → X), full-width nav links with `py-3` tap targets
- Desktop `md:`: horizontal nav, "Agenda una sesión" pill CTA
- Nav: Inicio · Sobre mí · Servicios · Blog · Contacto

### A5. `components/sections/Hero.tsx`
```
Mobile:  pill tag → H1 (text-3xl) → subtitle → CTAs (full-width stacked) → photo placeholder
md:      two-column grid, text left / photo right, H1 text-5xl, CTAs flex-row
```
- Organic blob SVG behind photo (`md:block` only)
- Floating "Sesiones 100% en línea" badge on photo (bottom-right pill)

### A6. `components/sections/Services.tsx`
4 real therapist specialty categories:

| Icon | Título |
|------|--------|
| `Globe` | Transiciones de vida y contexto |
| `Compass` | Transiciones internas |
| `Heart` | Transiciones emocionales |
| `Users` | Transiciones relacionales |

Grid: `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-4`.
Closing quote from the therapist's brief.

### A7. `components/sections/Process.tsx`
"Cómo funciona" — 3 steps.
- Mobile: vertical flex list (number left, content right)
- `md:`: horizontal `grid-cols-3`, connector line between steps

| # | Título |
|---|--------|
| 01 | Escríbeme |
| 02 | Sesión de exploración gratuita |
| 03 | Comenzamos |

### A8. `components/sections/About.tsx`
Single therapist framing. Photo top on mobile → left on `md:`.
CTA → `/about`.

### A9. `components/sections/FAQ.tsx`
`@radix-ui/react-accordion` — 6 Q&A in Spanish, `max-w-2xl mx-auto`.

| # | Pregunta |
|---|----------|
| 1 | ¿Cómo son las sesiones en línea? |
| 2 | ¿Cuánto duran las sesiones? |
| 3 | ¿Necesito tener un diagnóstico para empezar? |
| 4 | ¿Con qué frecuencia nos vemos? |
| 5 | ¿Qué pasa si no sé bien qué me pasa? |
| 6 | ¿Es confidencial? |

### A10. `components/sections/Testimonials.tsx`
3 authentic Spanish anonymous quotes. Grid: `grid-cols-1` → `md:grid-cols-3`.

### A11. `components/sections/ContactCTA.tsx`
"¿Lista/o para comenzar?" · "Agenda tu consulta" · full-width button on mobile.

### A12. `app/page.tsx`
Section order:
```
Hero → Services → Process → About → FAQ → Testimonials → ContactCTA
```

### A13. `components/layout/Footer.tsx`
Logo (`size="md"`) + Spanish nav + CTA button. Grid: `grid-cols-1` → `md:grid-cols-3`.

### A14. `components/forms/ContactForm.tsx`
Spanish labels, `py-3` inputs, Spanish status messages.

### A15. `lib/validations.ts`
Spanish Zod error messages.

### A16. Inner pages

| Page | Status |
|------|--------|
| `app/(marketing)/about/page.tsx` | Full ES — intro, approach cards, formation placeholders, CTA |
| `app/(marketing)/services/page.tsx` | Full ES — 4 expanded categories, closing quote, CTA |
| `app/(marketing)/contact/page.tsx` | "Hablemos" heading, Spanish description |

---

## Phase B — Bilingual Layer (pending user approval of Spanish design)

Once the Spanish site is visually approved:

1. **`lib/i18n.ts`** — `{ es: {...}, en: {...} }` translation object covering all UI strings
2. **`contexts/LanguageContext.tsx`** — `"use client"`, `LanguageProvider`, `useLanguage()` hook with `localStorage` persistence
3. **`components/ClientProviders.tsx`** — thin client wrapper so server `layout.tsx` can include the provider
4. Update all text-bearing components to `"use client"` + `useLanguage()`
5. **`components/layout/Header.tsx`** — add `ES | EN` toggle (inside hamburger on mobile; beside nav on desktop)
6. **`app/layout.tsx`** — wrap `<body>` with `<ClientProviders>`

---

## Design tokens (globals.css)

| Variable | Value | Use |
|----------|-------|-----|
| `--background` | `#faf9f7` | Page background |
| `--foreground` | `#1c1917` | Body text |
| `--muted` | `#f5f0eb` | Section backgrounds |
| `--muted-foreground` | `#78716c` | Secondary text |
| `--border` | `#e7e0d8` | Borders, dividers |
| `--primary` | `#6b7f6b` | Sage green — buttons, icons, accents |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `#c4a882` | Warm sand |
| `--terracotta` | `#b07060` | Warm accent (hover states) |
| `--sage-light` | `#e8ede8` | Organic bg shapes |

Fonts: **Playfair Display** (h1–h3, display), **Inter** (body, UI).

---

## Branding mark concept

Two organic petal/leaf forms counter-rotated 18° around a shared centre point. Their overlapping interior creates a visible **inner space** — the core of the therapeutic journey. A gentle open arc below echoes the petal rims, suggesting the therapeutic container. The centre dot is "el yo" (the self).

---

## Verification checklist

- [ ] `npm run dev` — site loads fully in Spanish
- [ ] Mobile 375px — all sections single-column, buttons full-width, text readable
- [ ] Tablet 768px — hero split, services 2-col, footer 3-col
- [ ] Desktop 1280px — full layout
- [ ] `/about`, `/services`, `/contact` pages have full Spanish content
- [ ] Contact form shows Spanish validation errors on empty submit
- [ ] `npm run build` — zero TypeScript or lint errors ✅
