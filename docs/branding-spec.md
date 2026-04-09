# Interior Espacio — Branding & UI/UX Specification

## Brand Philosophy

**North star**: "A person reading this site should feel less alone after 10 seconds."

The name "Interior Espacio" carries the brand's entire philosophy in two words: the inner world (*interior*) and the room it deserves (*espacio*). The site should feel like walking into a quiet, well-lit room where nothing is loud and everything is deliberate.

### Voice and Tone

| Dimension | Direction |
|---|---|
| Warmth | High. Feels like a trusted person, not an institution. |
| Authority | Present but light. Credibility through calm restraint, not credentials lists. |
| Urgency | Zero. Every CTA is an invitation, not a conversion funnel. |
| Clarity | Very high. Anxiety sufferers cannot parse cluttered layouts. |
| Formality | Low-medium. First names. Incomplete sentences are fine. |

---

## Color Palette

### Client Colors — Source of Truth

These six colors were specified by the client. All other tokens are derived from them.

| Swatch | Hex | Role |
|---|---|---|
| Linen Cream | `#F2E7D3` | Page background |
| Warm Sand | `#D7C5AE` | Section alternation (surface-1) |
| Warm Charcoal | `#4A4745` | Text / foreground |
| Sage Green | `#6E7C5C` | Primary brand (therapeutic trust) |
| Cognac | `#A56C3D` | Secondary brand (warmth, invitation) |
| Espresso | `#6B4428` | Accent (depth, decorative) |

### Role Assignment Rationale

**Surface hierarchy** — The palette naturally suggests a 3-tier stack from lightest to darkest: linen cream → warm sand → deeper sand. This creates clearly distinct section zones without needing unrelated colours.

**Primary: Sage green** — Chosen as primary because desaturated greens are linked to reduced physiological stress (Ulrich, 1984). It communicates "growth without pressure" — appropriate for the therapeutic context.

**Secondary: Cognac** — Warm, earthy, inviting. Used for secondary CTAs, decorative accents, and section dividers. Never on primary action buttons (sage owns trust; cognac owns warmth).

**Accent: Espresso** — The deepest value in the palette. Used sparingly: deep borders, hover states, decorative emphasis. Provides visual anchor without introducing an unrelated hue.

**Foreground: Charcoal** — A warm near-black (not pure #000000). Avoids the harshness of true black against cream backgrounds; the warmth ties it to the earth tones.

### Full Token Set (`app/globals.css`)

```css
:root {
  /* ── Surfaces ── */
  --background:           #F2E7D3;   /* client: linen cream — warm page base */
  --surface-1:            #D7C5AE;   /* client: warm sand — clearly distinct sections */
  --surface-2:            #C9B49C;   /* derived: deeper sand — cards on surface-1 */
  --foreground:           #4A4745;   /* client: warm charcoal */

  /* ── Text ── */
  --text-primary:         #4A4745;   /* client charcoal — headings, strong copy */
  --text-secondary:       #5a5755;   /* derived: slightly lighter charcoal — body copy */
  --text-muted:           #6a6158;   /* derived: warm mid-grey — captions, overlines */
  --text-inverse:         #F2E7D3;   /* linen cream — on dark/primary backgrounds */

  /* ── Primary: Sage Green ── */
  --primary:              #6E7C5C;   /* client: sage green */
  --primary-hover:        #586748;   /* derived: 15% darker */
  --primary-light:        #B8C8A8;   /* derived: light sage — icon containers, pill tags */
  --primary-muted:        #D8E3CE;   /* derived: very light sage — hero blob, tints */
  --primary-foreground:   #ffffff;   /* white on sage — WCAG AA (4.5:1) */

  /* ── Secondary: Cognac ── */
  --secondary:            #A56C3D;   /* client: cognac */
  --secondary-hover:      #8A5A31;   /* derived */
  --secondary-light:      #D4A87A;   /* derived: light cognac tint */
  --secondary-foreground: #ffffff;   /* white on cognac — passes AA */

  /* ── Accent: Espresso ── */
  --accent:               #6B4428;   /* client: espresso */
  --accent-hover:         #573620;   /* derived */
  --accent-light:         #C09878;   /* derived: medium warm brown */
  --accent-foreground:    #F2E7D3;   /* linen cream on dark espresso */

  /* ── Borders ── */
  --border:               #C4B09C;   /* derived: visible on linen bg */
  --border-strong:        #A89078;   /* derived: focused inputs, separators */
  --border-subtle:        #D7C5AE;   /* = surface-1 — hairlines, soft dividers */

  /* ── Semantic ── */
  --success:              #4a7c59;
  --success-light:        #d8ece0;
  --warning:              #b07030;
  --warning-light:        #f0dfc0;
  --destructive:          #c0392b;
  --destructive-light:    #fde8e6;

  /* ── Interaction ── */
  --ring:                 #6E7C5C;   /* = primary */
  --ring-offset:          #F2E7D3;   /* = background */
  --overlay:              rgba(74, 71, 69, 0.5);

  /* ── Shadows — warm-toned, visible depth ── */
  --shadow-xs: 0 1px 3px rgba(74,71,69,0.10);
  --shadow-sm: 0 2px 8px rgba(74,71,69,0.14);
  --shadow-md: 0 4px 16px rgba(74,71,69,0.18);
  --shadow-lg: 0 8px 32px rgba(74,71,69,0.24);

  /* ── Border radius ── */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   18px;
  --radius-xl:   24px;
  --radius-2xl:  32px;
  --radius-full: 9999px;
}
```

### WCAG Contrast Audit (AA)

| Token | Hex | On | Ratio | Result |
|---|---|---|---|---|
| `--text-primary` | #4A4745 | #F2E7D3 bg | ~7.7:1 | AAA ✓ |
| `--text-secondary` | #5a5755 | #F2E7D3 bg | ~6.4:1 | AAA ✓ |
| `--text-muted` | #6a6158 | #F2E7D3 bg | ~4.6:1 | AA ✓ |
| `--text-muted` | #6a6158 | #D7C5AE surface-1 | ~3.2:1 | AA Large (use 14px+) |
| `--primary` | #6E7C5C | #F2E7D3 bg | ~3.7:1 | AA Large / decorative |
| White on `--primary` | #fff / #6E7C5C | — | ~4.5:1 | AA ✓ (buttons) |
| `--accent` | #6B4428 | #F2E7D3 bg | ~7.0:1 | AAA ✓ |

> **Note**: Sage green (#6E7C5C) and cognac (#A56C3D) do not pass AA for normal body text on the linen background — they are brand/accent colours used for headings, buttons, icons, and decorative elements only. All body copy uses `--text-secondary` (#5a5755) which passes AAA.

### What NOT to do

- Do not use `bg-primary/10` opacity modifiers — use named tokens (`bg-primary-light`, `bg-primary-muted`)
- Do not use `--text-muted` for paragraph body copy — reserved for captions and overlines
- Do not set `--surface-1` close to `--background` — sections must be perceptibly distinct
- Do not use shadow opacity below 10% — invisible on most displays

---

## Typography

### Typefaces

| Role | Font | Rationale |
|---|---|---|
| Display / Headings | **Playfair Display** | Serif signals permanence and thoughtfulness; pairs naturally with the rich earthen palette |
| Body / UI | **Inter** | Clean humanist sans-serif; legible at small sizes for forms, labels, navigation |

Both loaded via `next/font/google` with `display: "swap"`.

### Font Loading (`app/layout.tsx`)

```typescript
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],   // italic for blockquotes and pull quotes
  display: "swap",
});
```

### Type Scale

```css
/* Display — Playfair Display */
--text-display-xl:  3rem;      /* 48px — hero h1, desktop */
--text-display-lg:  2.25rem;   /* 36px — page titles, h1 mobile */
--text-display-md:  1.875rem;  /* 30px — section h2, desktop */
--text-display-sm:  1.5rem;    /* 24px — card headings, h2 mobile */
--text-display-xs:  1.25rem;   /* 20px — pull quotes, CTA headings */

/* Body — Inter */
--text-body-xl:     1.25rem;   /* 20px — hero subtext */
--text-body-lg:     1.125rem;  /* 18px — primary body copy */
--text-body-md:     1rem;      /* 16px — standard body */
--text-body-sm:     0.875rem;  /* 14px — secondary info, nav, buttons */
--text-body-xs:     0.75rem;   /* 12px — captions, badges, fine print */

/* Line heights */
--leading-display:  1.15;
--leading-heading:  1.25;
--leading-body:     1.65;      /* Generous — reduces reading anxiety */
--leading-relaxed:  1.75;      /* Long-form descriptions */

/* Letter spacing */
--tracking-display:  -0.02em;
--tracking-heading:  -0.01em;
--tracking-overline:  0.1em;
```

### Usage Rules

- **Playfair Display**: h1–h3 only. Pull quotes (italic). **Never below 20px.**
- **Inter**: All body copy, navigation, buttons, labels, captions, badges, forms.
- **Italic Playfair**: Reserved for blockquotes and testimonial pull quotes only.
- **Overlines**: Inter 500, 11px, uppercase, `--tracking-overline`, `--text-muted`.
- **Body copy colour**: Always `--text-secondary` (#5a5755). Never `--text-muted` for paragraphs.

---

## Spacing & Layout

```css
:root {
  --section-padding-y-sm:  64px;
  --section-padding-y-md:  96px;    /* Standard — use py-24 in Tailwind */
  --section-padding-y-lg:  128px;
  --max-w-content:         672px;   /* Prose — contact, about intro */
  --max-w-layout:          1024px;  /* Card grids */
  --max-w-wide:            1152px;  /* Full sections (max-w-6xl) */
  --card-padding:          24px;
  --card-padding-lg:       32px;
}
```

### Section Alternation — Page Sequence

| Section | Background | Note |
|---|---|---|
| Hero | `bg-surface-1` | Warm sand opening |
| Services | `bg-background` | Linen — card grid reads clearly |
| Process | `bg-surface-1` | Warm sand |
| About | `bg-background` | Linen |
| FAQ | `bg-surface-1` | Warm sand |
| Testimonials | `bg-background` | Linen — cards use `bg-surface-1` |
| ContactCTA | `bg-primary` | Sage green — strong close |

Never place two `bg-surface-1` sections adjacent. Testimonial cards on a linen section use `bg-surface-1` + `border-border` to read as distinct.

---

## UI Components

### Buttons (all pill-shaped `rounded-full`)

| Variant | Use | Background | Text | Hover |
|---|---|---|---|---|
| **Primary** | Main CTA | `--primary` (#6E7C5C) | white | `--primary-hover` |
| **Secondary** | Warm CTA | `--secondary` (#A56C3D) | white | `--secondary-hover` |
| **Ghost** | Alternate CTA | transparent | `--foreground` | bg `--surface-1` |
| **Outlined Sage** | Tertiary | transparent | `--primary` | bg `--primary-muted` |
| **Link** | Inline | none | `--primary` | `--primary-hover`, underline |

- Primary/Secondary: `py-3.5 px-8`, Inter 500 14px
- Header CTA: `py-2 px-5`, 13px
- Focus: ring-2 ring-offset-2, color `--ring`
- Active: `scale(0.98)`, 100ms
- **Never `hover:opacity-90`** — use explicit `hover:bg-primary-hover`

### Cards

**Service cards**: bg `--background`, border `1px --border`, `--radius-xl` (24px), 24px padding. Hover: `translateY(-3px)`, `--shadow-md`.

**Testimonial cards** (on linen section): bg `--surface-1`, border `1px --border`, `--radius-xl`, 32px padding. Decorative Playfair italic `"` in `--primary-light`.

**Process step circles**: bg `--background`, border `2px --primary-light`, number in `--primary`. Never `bg-primary/10`.

### Forms

- Input border: `1.5px --border`, focus → `--border-strong` + `3px --primary-light` ring
- Border-radius: `--radius-md` (12px)
- Placeholder: `--text-muted`, italic
- Error: `--destructive` text, `--destructive-light` bg, `AlertCircle` icon prefix

**Success state**: quiet panel — `CheckCircle` (sage), Playfair "Mensaje recibido", Inter body. No auto-dismiss.

### Navigation

- Links: `--text-secondary` → `--text-primary`, 150ms
- Active: 2px bottom `after:` border, `--primary`, `aria-current="page"`
- Header border: transparent → `--border` after 60px scroll (Framer Motion `useScroll`)
- Mobile menu: `AnimatePresence`, height 0 → auto, 250ms ease-out

### Icon System

- Lucide React only. `strokeWidth={1.5}` always.
- Container: square `--radius-md` (12px), `bg-primary-light`
- Sizes: decorative 24px, card 20px, inline 16px
- Avoid: medical/clinical icons, opacity modifiers on containers

---

## Motion & Animation

### Principles

Motion serves three purposes only: **orientation**, **feedback**, **breath**. Never startle or rush.

- Easing: always `ease-out` or `ease-in-out`. Never `ease-in`.
- `viewport={{ once: true }}` — never re-animates on scroll-back.
- `useReducedMotion()` — skip to `"visible"` state when true.

### Shared Tokens (`lib/motion.ts`)

```typescript
export const transitions = {
  gentle: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  smooth: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  micro:  { duration: 0.15, ease: "easeOut" },
};
export const fadeUp           = { hidden: { opacity: 0, y: 16 },      visible: { opacity: 1, y: 0,      transition: transitions.gentle } };
export const fadeIn           = { hidden: { opacity: 0 },             visible: { opacity: 1,            transition: transitions.gentle } };
export const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
export const staggerContainerSlow = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
export const slideInLeft      = { hidden: { opacity: 0, x: -20 },    visible: { opacity: 1, x: 0,      transition: transitions.smooth } };
export const scaleIn          = { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: transitions.smooth } };
export const mobileMenu       = { hidden: { opacity: 0, height: 0 }, visible: { opacity: 1, height: "auto", transition: { duration: 0.25, ease: "easeOut" } }, exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } } };
```

### Animation Budget

| Section | Variant | Stagger |
|---|---|---|
| Hero (pill → h1 → body → CTAs → photo) | `fadeUp` | 0/100/200/300ms |
| Service cards | `staggerContainer` + `fadeUp` | 80ms |
| Process steps | `staggerContainerSlow` + `fadeUp` | 120ms |
| Testimonial cards | `staggerContainer` + `fadeIn` | 80ms |
| About photo | `slideInLeft` | — |
| About text | `fadeUp` | 150ms delay |
| ContactCTA | `scaleIn` | — |
| Mobile menu | `AnimatePresence` + `mobileMenu` | — |

**Never animate**: route transitions, heading hover, form focus, contact page content.

---

## Imagery Direction

### Therapist Portrait
- Natural window light, warm clothing (cream, sage, soft olive). No stark black or bright colours.
- Medium shot, generous negative space on one side.
- Background: blurred bookshelf, plant, or plain warm wall.

### Blog / Content
- Abstract nature (shallow depth plants, light through leaves), hands journaling, warm household spaces.
- **Avoid**: stock "smiling at laptop", clinical settings, wellness clichés.

### Treatment
All photos: `filter: brightness(0.98) saturate(0.90)` — harmonises with the warm linen palette.

### Hero Blob
SVG blob behind therapist photo. Color: `--primary-muted` (`#D8E3CE`).

### Logo
SVG uses `currentColor` throughout. Wrap in `text-primary` (sage) for default use, `text-primary-foreground` (white) on the sage ContactCTA section.

---

## Emotional Design Rationale

| Decision | Why it builds connection |
|---|---|
| Linen cream `#F2E7D3` background | Richer than off-white; associated with aged paper, letters, handwritten notes — human artefacts |
| Warm sand `#D7C5AE` surface-1 | Clear rhythmic contrast; sections breathe and separate without jarring colour shifts |
| Charcoal `#4A4745` text | Warm near-black avoids the coldness of pure #000 against cream; visually cohesive with earth palette |
| Sage green `#6E7C5C` primary | Therapeutic trust colour; enough saturation to anchor the page but not aggressive |
| Cognac `#A56C3D` secondary | Warmth and earthiness; signals invitation rather than clinical precision |
| Espresso `#6B4428` accent | Provides the deepest visual weight; used sparingly so it registers as intentional, not decorative noise |
| Pill-shaped buttons | No sharp corners → no perceived aggression; the form says "you can approach this" |
| Playfair Display serif | Signals permanence and thoughtfulness; pairs naturally with earthy palette |
| `leading-body: 1.65` | Generous line-height → reader doesn't feel rushed |
| `fadeUp` for cards | Things gently rising = emergence, readiness, possibility |
| `fadeIn` for testimonials | Testimonials should feel arrived, grounded — truth, not possibility |
| Zero animations on contact page | Reaching out is vulnerable; visual noise increases anxiety |
| Named tokens, no opacity modifiers | Opacity modifiers produce unpredictable pale washes; named tokens are explicit and auditable |

---

## Implementation Files

| File | Role |
|---|---|
| `app/globals.css` | All `:root` tokens, `@theme inline`, base styles, reduced-motion rule |
| `app/layout.tsx` | Font loading — weights, italic, `display: "swap"` |
| `lib/motion.ts` | Shared Framer Motion variants |
| `components/Logo.tsx` | `currentColor` SVG |
| `components/layout/Header.tsx` | Scroll border, `AnimatePresence` mobile menu, active indicator |
| `components/layout/Footer.tsx` | `bg-surface-1`, token-correct text |
| `components/sections/Hero.tsx` | Staggered `fadeUp`, `--primary-muted` blob |
| `components/sections/Services.tsx` | `staggerContainer` + `whileInView`, `bg-primary-light` icons |
| `components/sections/Process.tsx` | `staggerContainerSlow`, token-correct circles |
| `components/sections/About.tsx` | `slideInLeft` photo, `fadeUp` text |
| `components/sections/FAQ.tsx` | `bg-surface-1`, token-correct text, `strokeWidth={1.5}` |
| `components/sections/Testimonials.tsx` | `staggerContainer` + `fadeIn`, `bg-surface-1` cards |
| `components/sections/ContactCTA.tsx` | `scaleIn`, Logo white |
| `components/forms/ContactForm.tsx` | `--radius-md` inputs, `AlertCircle` errors, success panel |

---

## Verification Checklist

- [ ] All 6 client colours visible in browser DevTools `:root`
- [ ] `--background` (#F2E7D3) visibly distinct from `--surface-1` (#D7C5AE) on screen
- [ ] No `bg-primary/10` or opacity modifier classes anywhere
- [ ] No `hover:opacity-90` on any button
- [ ] No `text-muted-foreground` on body paragraph copy
- [ ] Card borders visible on linen background
- [ ] Card hover shadow perceptible (`--shadow-md` at 18%)
- [ ] Section sequence: surface-1 / background / surface-1 / background / surface-1 / background / primary
- [ ] Playfair italic WOFF2 variant loads (Network tab)
- [ ] Lighthouse accessibility `/contact` — target 95+
- [ ] Mobile menu exit animation fires on close
- [ ] `prefers-reduced-motion` skips all Framer Motion animations
- [ ] ContactCTA Logo and text render white on sage green
- [ ] Process step circles: `bg-background` + `border-primary-light` (not `bg-primary/10`)
