# Plan: Terms & Conditions Page (`/terminos`)

## Context
Espacio Interior has no legal pages. A Terms & Conditions (T&C) page is standard for any service offering, especially a psychology practice collecting personal data, taking bookings, and offering paid sessions. It protects both the client and Grace.

## Approach

### 1. New page: `app/(marketing)/terminos/page.tsx`

Follow the exact pattern of existing pages (`about`, `services`):
- Export `metadata` with `title`, `description`, and `alternates.canonical`
- Return an `<article>` with `py-16 md:py-24 px-4 md:px-6`
- Max-width wrapper `max-w-4xl mx-auto`
- `font-display` for headings, `text-muted-foreground` for body, `rounded-2xl border border-border bg-muted` for callout cards

### 2. Content (Spanish) — sections

**Espacio Interior EC** is the primary contracting entity throughout. Grace P. Pacheco is introduced as the licensed clinical psychologist providing services on behalf of Espacio Interior EC.

| # | Section title | Key points |
|---|---------------|------------|
| 1 | **Descripción del servicio** | Espacio Interior EC provides online psychological support via video call; services delivered by Grace P. Pacheco, Psicóloga Clínica (USFQ); not a substitute for emergency/psychiatric care |
| 2 | **Servicios de emergencia** | Prominent warning: does NOT cover crises; direct to 171 (Ecuador emergency line) |
| 3 | **Sesiones y disponibilidad** | Sessions by appointment; Espacio Interior EC may reschedule for justified reasons |
| 4 | **Política de cancelación** | >24 h: no charge; <24 h or no-show: full session fee may apply |
| 5 | **Tarifas y pagos** | Fees communicated before booking; no refunds once session begins |
| 6 | **Confidencialidad** | Confidential per ethics; exceptions: imminent risk, legal obligation |
| 7 | **Uso aceptable** | No recording without consent; respectful conduct; service may be terminated for abuse |
| 8 | **Menores de edad** | 18+; minors need written parental consent directed to Espacio Interior EC |
| 9 | **Propiedad intelectual** | © Espacio Interior EC; no reproduction without written permission |
| 10 | **Limitación de responsabilidad** | Not liable beyond professional scope; not responsible for technical issues |
| 11 | **Modificaciones** | Terms may be updated; continued use = acceptance |
| 12 | **Ley aplicable** | Ecuadorian law; disputes in Quito courts |
| 13 | **Contacto** | contacto@espaciointeriorec.com |

### 3. Footer update: `components/layout/Footer.tsx`

Add `Términos y condiciones` link to the copyright bar.

## Files

| File | Change |
|------|--------|
| `app/(marketing)/terminos/page.tsx` | Create — new Terms page |
| `components/layout/Footer.tsx` | Edit — add link in copyright bar |

## Verification

1. `npm run dev` → `http://localhost:3000/terminos`
2. Page renders with correct layout (header + footer visible)
3. All sections display correctly on mobile and desktop
4. Footer link is clickable
5. `<title>` shows correct metadata
