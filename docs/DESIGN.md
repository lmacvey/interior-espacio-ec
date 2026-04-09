# Espacio Interior — Design Document

## 1. Project Overview

**Espacio Interior** is an online therapy practice website built for a Spanish-speaking audience (Ecuador / Latin America). The site serves as the public-facing presence for a solo therapist offering 100% online individual therapy, with a focus on life transitions and internal processes.

**Primary goals:**
- Establish trust and communicate warmth before a prospective client ever books
- Lower the barrier to first contact (free 15-minute consultation)
- Present services clearly without clinical jargon
- Function as a content/resource hub over time (blog)

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Primitives | Radix UI (via shadcn/ui) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Font — body | Inter (Google Fonts) |
| Font — display | Playfair Display (Google Fonts) |
| Hosting | Vercel (recommended) |

---

## 3. Brand Identity

### 3.1 Voice & Tone

- Warm, calm, direct — never clinical or corporate
- First-person singular ("acompaño", "vengo a", "creo que")
- Invites without pressure; normalises asking for help
- Spanish (Ecuador): `es_EC` locale

### 3.2 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#6b7f6b` | Sage green — CTAs, icons, accents |
| `--primary-foreground` | `#ffffff` | Text on primary backgrounds |
| `--secondary` | `#c4a882` | Warm sand — supporting accents |
| `--background` | `#faf9f7` | Page background (warm off-white) |
| `--muted` | `#f5f0eb` | Section backgrounds, cards |
| `--muted-foreground` | `#78716c` | Body copy, secondary text |
| `--border` | `#e7e0d8` | Borders, dividers, photo placeholders |
| `--foreground` | `#1c1917` | Primary text |
| `--terracotta` | `#b07060` | Warm accent (decorative use) |
| `--sage-light` | `#e8ede8` | Very light sage (blob SVGs, organic backgrounds) |
| `--destructive` | `#dc2626` | Form validation errors |

### 3.3 Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Playfair Display | 400–600 | H1, H2, H3, section headings |
| Body | Inter | 400–500 | All body copy, labels, nav |

**Heading scale (Tailwind):**
- H1: `text-3xl sm:text-4xl md:text-5xl`
- H2: `text-2xl sm:text-3xl md:text-4xl`
- H3: `text-lg` (card titles) or `text-xl md:text-2xl` (section sub-headers)
- Body: `text-sm` (cards/lists) / `text-base` (default) / `text-lg` (lead paragraphs)

### 3.4 Shape & Motion

- Border radius: `rounded-2xl` (cards), `rounded-3xl` (hero photo), `rounded-full` (pills, buttons)
- Shadows: `hover:shadow-md` on interactive cards only — no resting shadows
- Organic SVG blob used in Hero (sage-light fill) to soften the layout
- Animations: subtle, short (200ms ease-out); reserved for accordion open/close and future scroll-reveal
- No heavy transitions — therapeutic context calls for calm, not flair

---

## 4. Site Architecture

```
/                       → Home (landing page)
/about                  → Sobre mí (therapist bio + approach)
/services               → Servicios (4 transition categories)
/blog                   → Recursos (article index)
/blog/[slug]            → Individual blog post
/contact                → Contacto (contact form)
/api/contact            → POST endpoint (form submission → Resend)
```

All marketing pages are grouped under `app/(marketing)/` using a Next.js route group so they can share a layout without affecting the URL.

---

## 5. Page-by-Page Layout

### 5.1 Home (`/`)

Section order (top → bottom):

| # | Component | Description |
|---|-----------|-------------|
| 1 | `Hero` | 2-col: headline + CTAs (left), photo placeholder + blob (right) |
| 2 | `Services` | 4-card grid of transition categories + closing quote |
| 3 | `Process` | How a session / process works (to be built) |
| 4 | `About` | 2-col: photo (left), bio excerpt (right) |
| 5 | `FAQ` | Accordion of common questions (to be built) |
| 6 | `Testimonials` | 3-col blockquote grid |
| 7 | `ContactCTA` | Full-width sage-green banner + single CTA button |

### 5.2 About (`/about`)

- Photo + intro headline (2-col grid)
- "Mi enfoque" — 4 value cards (Sin juicio, A tu ritmo, 100% en línea, Proceso individual)
- "Formación" — bullet list (placeholder items to replace)
- Inline CTA card (free consultation)

### 5.3 Services (`/services`)

- Page header + intro
- 4 expanded category sections (icon + title + intro paragraph + bullet list)
- "Otros momentos" section
- Closing quote + CTA button

### 5.4 Contact (`/contact`)

- Short intro copy
- `ContactForm` (name, email, message) with Zod validation
- Form POST → `/api/contact` → Resend email

### 5.5 Blog (`/blog` + `/blog/[slug]`)

- Index: article card grid (placeholder state)
- Post: `<article>` with `prose` styling, dynamic metadata from slug

---

## 6. Component Library

### Layout
| File | Purpose |
|------|---------|
| `components/layout/Header.tsx` | Sticky header; animated hamburger menu (mobile); "Agenda una sesión" CTA pill |
| `components/layout/Footer.tsx` | 3-col grid: brand/tagline, nav links, contact + booking CTA |
| `components/Logo.tsx` | Shared logo component (size variants: `sm`, `md`, `lg`) — **to be created** |

### Sections
| File | Purpose |
|------|---------|
| `components/sections/Hero.tsx` | Split hero with organic blob SVG |
| `components/sections/Services.tsx` | 4-card grid with Lucide icons |
| `components/sections/Process.tsx` | Step-by-step process explainer — **to be created** |
| `components/sections/About.tsx` | Therapist intro with photo placeholder |
| `components/sections/FAQ.tsx` | Radix Accordion FAQ — **to be created** |
| `components/sections/Testimonials.tsx` | 3-col blockquote grid |
| `components/sections/ContactCTA.tsx` | Full-width CTA banner |

### Forms
| File | Purpose |
|------|---------|
| `components/forms/ContactForm.tsx` | React Hook Form + Zod; POST to `/api/contact` |
| `components/forms/BookingWidget.tsx` | Calendly/Acuity iframe embed (URL placeholder) |

### UI (`components/ui/`)
Reserved for shadcn/ui generated components (Button, Input, Label, Accordion, Dialog, etc.). Install individual components with:
```bash
npx shadcn@latest add <component>
```

---

## 7. Forms & API

### Contact Form Flow

```
User fills form
  → react-hook-form validates client-side (Zod schema)
  → POST /api/contact { name, email, message }
  → Server validates again (contactSchema.safeParse)
  → Resend sends email to CONTACT_EMAIL
  → 200 OK → success state shown in UI
```

### Zod Schema (`lib/validations.ts`)

```ts
contactSchema = {
  name:    string, min 2 chars
  email:   valid email
  message: string, min 10 chars
}
```

### Environment Variables (see `.env.example`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL |
| `RESEND_API_KEY` | Yes | Resend API key for email |
| `CONTACT_EMAIL` | Yes | Inbox to receive contact form submissions |

---

## 8. Responsive Design

**Breakpoints (Tailwind defaults):**
- `sm` — 640px (stack → row, single CTAs expand)
- `md` — 768px (2-col grids activate, desktop nav visible)
- `lg` — 1024px (4-col service grid, max-width containers)

**Mobile-first conventions used throughout:**
- Padding: `px-4 md:px-6`
- Typography: `text-2xl sm:text-3xl md:text-4xl`
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Section padding: `py-16 md:py-24`

**Minimum tap target:** 44×44px (applied to mobile nav hamburger button)

---

## 9. Accessibility

- `lang="es"` on `<html>` (set in `app/layout.tsx`)
- All icon-only buttons have `aria-label`
- Mobile menu toggle uses `aria-expanded`
- Form fields linked to labels via `htmlFor` / `id`
- Focus ring: `focus:ring-2 focus:ring-primary` on all interactive inputs
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<blockquote>`, `<address>`
- Decorative SVGs marked `aria-hidden="true"`

---

## 10. SEO

- `Metadata` exported from every page with `title` and `description`
- Root layout uses `title.template`: `"%s | Espacio Interior"`
- `openGraph.locale` set to `es_EC`
- Keywords: terapia en línea, psicología, transiciones de vida, salud mental, acompañamiento emocional, Ecuador
- All pages are statically pre-rendered at build time (except `/api/contact` and `/blog/[slug]`)

---

## 11. Remaining Work (To Do)

| Item | Priority | Notes |
|------|----------|-------|
| `components/Logo.tsx` | High | Referenced in Header and Footer; site won't build without it |
| `components/sections/Process.tsx` | High | Imported in `app/page.tsx` |
| `components/sections/FAQ.tsx` | High | Imported in `app/page.tsx` |
| Replace photo placeholders | High | Hero, About section, About page |
| Replace `[Nombre de Terapeuta]` | High | About page, About section |
| Wire up Resend in `/api/contact` | High | Uncomment and configure Resend send call |
| Replace Calendly URL in `BookingWidget` | Medium | `components/forms/BookingWidget.tsx` |
| Populate blog content | Medium | CMS or MDX files in `content/blog/` |
| Fill in "Formación" on About page | Medium | Degree, university, year |
| shadcn/ui component installs | Medium | Button, Input, Label, Accordion for FAQ |
| Framer Motion scroll-reveal | Low | Add to section entrances once content is final |
| OG image (`opengraph-image.tsx`) | Low | Add to `app/` for social sharing |
| `robots.txt` / `sitemap.xml` | Low | Add via Next.js metadata route handlers |

---

## 12. Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev        # → http://localhost:3000

# Type-check
npx tsc --noEmit

# Production build
npm run build
```

Copy `.env.example` to `.env.local` and fill in real values before testing the contact form.
