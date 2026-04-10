# SEO Content Plan — Espacio Interior

## Context

The site has strong copy and brand identity but is missing critical technical SEO infrastructure: no `robots.txt`, no sitemap, no JSON-LD structured data, no `metadataBase`, and no canonical URLs. These gaps prevent search engines from correctly indexing the site and suppress rich results (FAQ snippets, professional service cards, article cards). This plan adds all missing SEO infrastructure and sharpens existing metadata across every page.

---

## Strategic Keyword Framing

**Primary:** `terapia en línea`, `psicóloga clínica`, `psicología online Ecuador`
**Secondary:** `transiciones de vida`, `salud mental`, `acompañamiento emocional`, `terapia individual`
**Long-tail:** `terapia en línea en español`, `sesión de exploración gratuita`, `psicóloga USFQ`, `ansiedad en línea`, `terapia para expatriados`

---

## Implementation Plan

### 1. `app/layout.tsx` — Add `metadataBase`

Add `metadataBase: new URL(SITE_URL)` to the root `metadata` export. This is required for Next.js to resolve relative OG image URLs correctly in production.

---

### 2. `app/robots.ts` — New file

Allow all crawlers and declare the sitemap URL.

---

### 3. `app/sitemap.ts` — New file

Dynamic sitemap using `getAllPosts()` from `@/lib/blog` for blog URLs. Static routes at priority 1.0 (home) and 0.8 (inner pages). Blog posts at 0.6.

---

### 4. `app/page.tsx` — Metadata + JSON-LD schemas

Three JSON-LD schemas:

1. **`Person`** — Grace P. Pacheco, Psicóloga Clínica, USFQ, ES+EN
2. **`ProfessionalService`** — Espacio Interior practice, online, Latin America
3. **`FAQPage`** — All 6 FAQ items (enables Google FAQ rich snippets)

---

### 5. `app/(marketing)/about/page.tsx`

- Canonical URL
- Title override: `"Grace P. Pacheco — Psicóloga Clínica | Espacio Interior"`
- `Person` JSON-LD with fuller description

---

### 6. `app/(marketing)/services/page.tsx`

- Canonical URL
- Sharpened meta description with keyword-specific terms (ansiedad, duelos, identidad)
- `Service` JSON-LD with offer catalog for the 4 service areas

---

### 7. `app/(marketing)/contact/page.tsx`

- Canonical URL
- Improved description targeting "sesión gratuita" conversion keyword

---

### 8. `app/(marketing)/blog/page.tsx`

- Canonical URL
- Improved description with therapist name and topics

---

### 9. `app/(marketing)/blog/[slug]/page.tsx`

- Canonical URL per post
- `Article` JSON-LD with author, publisher, datePublished

---

## File Modification Summary

| File | Changes |
|------|---------|
| `app/layout.tsx` | Add `metadataBase` |
| `app/robots.ts` | **New** — Allow all + sitemap pointer |
| `app/sitemap.ts` | **New** — Static + blog dynamic routes |
| `app/page.tsx` | Add `metadata` export + 3 JSON-LD scripts |
| `app/(marketing)/about/page.tsx` | Canonical + enhanced title + Person JSON-LD |
| `app/(marketing)/services/page.tsx` | Canonical + improved description + Service JSON-LD |
| `app/(marketing)/contact/page.tsx` | Canonical + improved description |
| `app/(marketing)/blog/page.tsx` | Canonical + improved description |
| `app/(marketing)/blog/[slug]/page.tsx` | Canonical + Article JSON-LD |

---

## Verification

1. `npm run build` — sitemap and robots routes compile without error
2. Visit `/sitemap.xml` in dev — all routes present
3. Visit `/robots.txt` in dev — allows all, declares sitemap
4. [Google Rich Results Test](https://search.google.com/test/rich-results) — FAQPage schema eligible for rich snippet
5. Facebook/Pinterest URL debugger — OG image resolves as absolute URL
6. View source on each page — `<link rel="canonical">` present
