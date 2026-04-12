# SEO — Phase 2

## Context

Phase 1 delivered the foundational SEO infrastructure (robots.txt, sitemap, JSON-LD schemas, canonicals, metadataBase) — all complete and building clean. Phase 2 does three things:

1. **Schema & keyword upgrades** — align with the additional targets and schema types called out in `docs/ad-strategy.md` (MedicalBusiness, expanded keywords)
2. **Conversion tracking** — wire up Meta Pixel, GA4 events on WhatsApp clicks and form submits (required before paid ads run)
3. **Auto-SEO script** — a Node.js/Claude API script that keeps blog post metadata current as content grows

---

## Phase 1 Status (Done — do not re-implement)
- `app/layout.tsx` — `metadataBase`, GA4, Meta Pixel already in place
- `app/robots.ts`, `app/sitemap.ts` — live
- `app/page.tsx` — `metadata` export + `Person` / `ProfessionalService` / `FAQPage` JSON-LD
- All marketing pages — canonical URLs + improved meta descriptions + page-level JSON-LD
- `app/(marketing)/about/page.tsx` — `Person` JSON-LD, visual content updated with Fielding MA + Cornell cert

---

## A. SEO Schema & Keyword Upgrades

### A1 — `app/page.tsx`: Upgrade business schema to `MedicalBusiness`

`ad-strategy.md` calls for `MedicalBusiness`/`LocalBusiness` schema with Ecuador for local SEO. Replace `ProfessionalService` with a dual-type schema. `MedicalBusiness` is a `LocalBusiness` subtype valid for licensed therapists — it triggers Google's local business knowledge panel + Maps eligibility.

```json
{
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "ProfessionalService"],
  "name": "Espacio Interior",
  "medicalSpecialty": "Psychiatry",
  "description": "Acompañamiento psicológico en línea para transiciones de vida, momentos de cambio y procesos internos. Un espacio seguro para volver a ti.",
  "provider": { "@type": "Person", "name": "Grace P. Pacheco" },
  "areaServed": [
    { "@type": "Country", "name": "Ecuador" },
    { "@type": "Place", "name": "Latinoamérica y comunidad hispanohablante internacional" }
  ],
  "availableLanguage": ["Spanish", "English"],
  "url": "<SITE_URL>",
  "priceSpecification": {
    "@type": "PriceSpecification",
    "description": "Sesión de exploración gratuita de 15 minutos"
  }
}
```

### A2 — `app/(marketing)/about/page.tsx`: Update `Person` JSON-LD with full credentials

Visual content shows Fielding MA + Cornell cert, but `Person` schema only lists USFQ. Add both universities to `alumniOf` and add `hasCredential`:

```json
"alumniOf": [
  { "@type": "CollegeOrUniversity", "name": "Universidad San Francisco de Quito (USFQ)", "address": { "@type": "PostalAddress", "addressCountry": "EC" } },
  { "@type": "CollegeOrUniversity", "name": "Fielding Graduate University", "address": { "@type": "PostalAddress", "addressCountry": "US" } }
],
"hasCredential": [
  { "@type": "EducationalOccupationalCredential", "name": "Master of Arts in Media Psychology", "credentialCategory": "degree", "recognizedBy": { "@type": "Organization", "name": "Fielding Graduate University" } },
  { "@type": "EducationalOccupationalCredential", "name": "Human Resources Essentials", "credentialCategory": "certification", "recognizedBy": { "@type": "Organization", "name": "Cornell University" } }
]
```

### A3 — `app/page.tsx`: Expand keyword list

Add to `metadata.keywords`:
`psicóloga online Ecuador`, `psicólogo online Quito`, `terapia para ansiedad`, `terapia individual online`, `terapia para expatriados`, `consulta psicológica online`, `ayuda psicológica online`

---

## B. Conversion Tracking

GA4 (`G-TT0466WK4C`) and Meta Pixel (`933865076303150`) are both now in `app/layout.tsx`. ✅

Conversion events still need to be wired up in components.

### B1 — `app/layout.tsx` ✅ Done — GA4 + Meta Pixel both live

### B2 — `lib/analytics.ts` (new file)

Centralized helpers that fire both platforms together:

```ts
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppClick(source: "contact_page" | "floating_button" | "footer") {
  window.gtag?.("event", "whatsapp_click", { event_category: "contact", event_label: source });
  window.fbq?.("track", "Contact", { content_name: "WhatsApp", source });
}

export function trackFormSubmit() {
  window.gtag?.("event", "form_submit", { event_category: "contact", event_label: "contact_form" });
  window.fbq?.("track", "Lead", { content_name: "ContactForm" });
}
```

### B3 — `components/ui/WhatsAppContactOption.tsx`

Add `onClick={() => trackWhatsAppClick("contact_page")}` to the `<a>` tag.

### B4 — `components/ui/WhatsAppFloat.tsx`

Add `onClick={() => trackWhatsAppClick("floating_button")}` to the `<motion.a>` element.

### B5 — `components/forms/ContactForm.tsx`

After `/api/contact` returns `ok`, call `trackFormSubmit()` before setting state to `"success"`.

---

## C. Auto-SEO Maintenance Script

### C1 — `scripts/seo-update.ts` (new file)

CLI: `npm run seo:update` / `npm run seo:check`

1. Reads all `.md` files from `content/blog/`
2. Parses frontmatter with `gray-matter`
3. Flags posts where `excerpt` is missing or under 80 chars, or `title` looks like a raw slug
4. Calls `claude-haiku-4-5-20251001` to generate `{ seoTitle, excerpt, keywords[] }` — prompt includes site keyword strategy from `docs/ad-strategy.md`
5. Merges generated values back into frontmatter (preserves existing values, fills gaps only)
6. Writes updated `.md` to disk
7. Prints summary table

`--check` flag: reports without writing.

**New dependency:** `@anthropic-ai/sdk` (devDependency)

### C2 — `package.json`

```json
"seo:update": "tsx scripts/seo-update.ts",
"seo:check": "tsx scripts/seo-update.ts --check"
```

### C3 — Scheduled agent

After implementation: `/schedule` monthly remote agent that runs `seo:check`, then `seo:update` if updates are needed.

---

## File Modification Summary

| File | Change |
|------|--------|
| `app/layout.tsx` | ✅ Done — GA4 + Meta Pixel |
| `app/page.tsx` | Upgrade to `MedicalBusiness` schema; expand keywords |
| `app/(marketing)/about/page.tsx` | Update `Person` JSON-LD — `alumniOf` array + `hasCredential` |
| `lib/analytics.ts` | **New** — `trackWhatsAppClick`, `trackFormSubmit` |
| `components/ui/WhatsAppContactOption.tsx` | Add `onClick` tracking |
| `components/ui/WhatsAppFloat.tsx` | Add `onClick` tracking |
| `components/forms/ContactForm.tsx` | `trackFormSubmit()` on success |
| `scripts/seo-update.ts` | **New** — Claude API blog SEO generator |
| `package.json` | Add `seo:update` and `seo:check` scripts |

---

## Verification

1. `npm run build` — no TypeScript errors
2. DevTools Network: click WhatsApp → `gtag` `whatsapp_click` event fires
3. Meta Events Manager: verify `PageView` and `Contact` events register
4. Submit contact form → `form_submit` + `Lead` events fire
5. `npm run seo:check` — reports posts with thin metadata
6. Add test post with no excerpt, run `npm run seo:update` — frontmatter updated
7. [Google Rich Results Test](https://search.google.com/test/rich-results) — `MedicalBusiness` + `FAQPage` valid
