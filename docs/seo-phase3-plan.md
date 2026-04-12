# SEO — Phase 3: Keyword CSV Integration & Copy Optimization

## Context

`docs/keyword-analysis.csv` was analyzed against the current site metadata. 73 keywords were evaluated across intent, volume, and competition. Key gaps identified:

- 8 high-priority CSV keywords absent from all page metadata
- 4 secondary pages (About, Services, Contact, Blog) have zero `keywords` arrays
- Root layout metadata has only 6 thin keywords
- Brand copy in footer and hero could integrate primary search terms without sacrificing voice

Phase 3 is a targeted metadata + copy pass — no new components or infrastructure needed.

---

## Keyword CSV Summary

**Source:** `docs/keyword-analysis.csv` — 73 keywords, 4 categories

| Category | Count | Action |
|---|---|---|
| Effective — High Priority | 10 | Add to homepage + relevant pages |
| Effective — Medium Priority | ~15 | Add to services/about pages |
| Too Broad (informational) | ~20 | Use for blog content only — not paid ads |
| Negative (DO NOT BID) | 10 | Exclude from ad campaigns |

**Top missing high-priority keywords:**
- `quiero terapia` — direct booking intent, 50/mo, medium competition
- `necesito terapia` — problem-aware, 50/mo, low competition
- `empezar terapia` — decision-stage, 50/mo
- `terapia de acompañamiento emocional` — exact Grace positioning, critical miss
- `terapia emocional` — 50/mo, medium competition
- `terapia de estrés` — 50/mo, low competition (index 20)

---

## A. Homepage — `app/page.tsx`

**Add to metadata.keywords array:**
```
quiero terapia, necesito terapia, empezar terapia,
terapia de acompañamiento emocional, terapia emocional, terapia de estrés
```

**Add 2 new FAQ entries to FAQPage JSON-LD:**

Q: `¿Ofreces terapia de pareja?`
A: `En este momento me especializo en terapia individual. Si estás viviendo dificultades en una relación, podemos trabajar desde tu propia experiencia y perspectiva en el proceso individual.`

Q: `¿Cómo sé si estoy lista para empezar terapia?`
A: `No necesitas estar en crisis para comenzar. Si sientes que algo quiere ser comprendido, o que estás atravesando una transición difícil, eso es suficiente. La sesión de exploración gratuita es justamente para que puedas evaluar si este espacio es para ti.`

---

## B. Root Layout — `app/layout.tsx`

**Current keywords (6):** terapia en línea, psicología, transiciones de vida, salud mental, acompañamiento emocional, Ecuador

**Expand to add:** `terapia online`, `psicóloga clínica`, `psicología online`, `bienestar emocional`, `terapia individual`

Root layout keywords are the fallback for any page without its own `keywords` export.

---

## C. Services Page — `app/(marketing)/services/page.tsx`

**Add keywords array:**
```
terapia en línea, terapia emocional, terapia de estrés, terapia de pareja,
terapia de acompañamiento emocional, ansiedad terapia, terapia individual online,
transiciones de vida, acompañamiento emocional, psicóloga clínica
```

**Update description** to surface `terapia de pareja` (high-priority CSV):
> "Terapia en línea individual para transiciones de vida, ansiedad, estrés y relaciones. Grace P. Pacheco, Psicóloga Clínica. Primera sesión de exploración gratuita."

---

## D. About Page — `app/(marketing)/about/page.tsx`

**Add keywords array (credential + expertise terms):**
```
psicóloga clínica, psicóloga online Ecuador, Grace P. Pacheco,
terapia en línea, psicología USFQ, acompañamiento emocional, terapia individual
```

No description change needed — current copy is strong.

---

## E. Contact Page — `app/(marketing)/contact/page.tsx`

**Add keywords array (conversion-stage intent):**
```
sesión de exploración gratuita, contacto psicóloga online, agendar terapia,
consulta psicológica online, empezar terapia, terapia en línea Ecuador
```

**Add ContactPage JSON-LD schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto — Espacio Interior",
  "description": "Agenda tu sesión de exploración gratuita de 15 minutos.",
  "url": "<SITE_URL>/contact"
}
```

---

## F. Blog Page — `app/(marketing)/blog/page.tsx`

**Add static keywords array to `generateMetadata` fallback:**
```
salud mental, bienestar emocional, reflexiones psicológicas,
transiciones de vida, autoconocimiento, emociones, terapia en línea
```

---

## G. Brand Copy Updates

### Footer tagline — `components/layout/Footer.tsx`

| | Text |
|---|---|
| **Current** | `Acompañamiento psicológico en línea para transiciones y procesos de cambio.` |
| **Recommended** | `Terapia en línea · Acompañamiento psicológico para transiciones y procesos de cambio.` |

Leads with the #1 priority keyword. Footer text is crawlable.

### Hero pill tag — `components/sections/Hero.tsx`

| | Text |
|---|---|
| **Current pill 1** | `Acompañamiento psicológico online` |
| **Recommended** | `Terapia en línea individual` |

H1-adjacent visible text carries SEO weight. Uses highest-priority CSV keyword while preserving meaning.

### Copyright line — `components/layout/Footer.tsx`

**No change.** `© {year} Espacio Interior EC. Todos los derechos reservados.` — legal entity name should remain stable. The `Espacio Interior` / `Espacio Interior EC` distinction is intentional and consistent.

---

## File Modification Summary

| File | Change |
|---|---|
| `app/page.tsx` | +6 keywords; +2 FAQ entries in FAQPage schema |
| `app/layout.tsx` | Expand root keywords 6 → 11 |
| `app/(marketing)/services/page.tsx` | Add keywords array; update description |
| `app/(marketing)/about/page.tsx` | Add keywords array |
| `app/(marketing)/contact/page.tsx` | Add keywords array; add ContactPage JSON-LD |
| `app/(marketing)/blog/page.tsx` | Add static keywords to generateMetadata fallback |
| `components/layout/Footer.tsx` | Update tagline |
| `components/sections/Hero.tsx` | Update first pill tag |

---

## Verification

1. `npm run build` — no TypeScript errors
2. [Google Rich Results Test](https://search.google.com/test/rich-results) — FAQPage shows 8 entries
3. View page source on updated pages — `<meta name="keywords">` present
4. Footer and hero render correctly at `/`
