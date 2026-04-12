# Google Search Ad — Espacio Interior

**Format:** Responsive Search Ad (RSA) + Image Assets  
**Campaign type:** Search  
**Goal:** WhatsApp click or "Agenda una sesión" form submit

---

## Headlines (≤ 30 characters)

| # | Text | Chars |
|---|------|-------|
| H1 | `¿Ansiedad o estrés constante?` | 29 |
| H2 | `Psicóloga clínica con máster` | 28 |
| H3 | `Consulta inicial gratuita` | 25 |

**Rotation:** Google mixes these dynamically. H1 hooks with the problem, H2 establishes credential depth (clinical degree + US master's), H3 removes the cost/commitment barrier.

---

## Descriptions (≤ 60 characters)

| # | Text | Chars |
|---|------|-------|
| D1 | `Psicóloga clínica bilingüe. Sesiones online, confidenciales.` | 60 |
| D2 | `Acompaño transiciones y cambios. Agenda tu sesión gratuita.` | 59 |

---

## Image Assets

**Primary image — Photo of Grace (recommended)**  
A professional photo of Grace builds immediate personal trust before a click. Authenticity outperforms polished stock imagery for mental health services.

| Asset type | Recommended size | Minimum size | Notes |
|------------|-----------------|--------------|-------|
| Landscape (1.91:1) | 1200 × 628 px | 600 × 314 px | Main hero slot — most common placement |
| Square (1:1) | 1200 × 1200 px | 300 × 300 px | Mobile and sidebar placements |
| Portrait (4:5) | 960 × 1200 px | 480 × 600 px | Optional; expands reach on mobile |

**Logo asset**

| Asset type | Recommended size | Notes |
|------------|-----------------|-------|
| Square logo (1:1) | 1200 × 1200 px | SVG logo exported at high res; safe-zone the ellipse mark |
| Landscape logo (4:1) | 1200 × 300 px | Optional; used in some Display placements |

**Hierarchy:** Photo of Grace as the primary image, logo as the logo asset. Do not use the hero/site background image as a standalone ad asset — it's too abstract for direct response.

---

## Extensions

- **Sitelinks:** Servicios · Sobre mí · Preguntas frecuentes · Contacto
- **Call asset:** Direct phone number only — Google requires a real dialable number, not a WhatsApp link. Use Grace's mobile or a dedicated business number.
- **Sitelink → WhatsApp:** Add a sitelink labeled `Escríbeme por WhatsApp` pointing to `https://wa.me/<number>` so WhatsApp remains reachable as a tap target without being the call asset.
- **Structured snippet:** `Tipos de terapia: Ansiedad, Duelo, Parejas, Identidad, Trauma`

---

## Keywords

### Exact match — highest intent
```
[psicóloga online Ecuador]
[terapia psicológica online]
[consulta psicológica online]
[psicólogo online Quito]
[terapia para ansiedad online]
```

### Phrase match — medium intent
```
"terapia online"
"terapia de pareja online"
"ayuda psicológica online"
"terapia para depresión"
"psicóloga en línea"
"duelo y pérdida terapia"
"terapia de trauma online"
"terapia cognitivo conductual online"
"psicoterapeuta online hispanohablante"
```

### Broad match — reach expansion
```
psicóloga online bilingüe
bienestar mental online
apoyo psicológico online
```

### Negative keywords (block wasted spend)
```
gratis
gratuito
trabajo de psicólogo
carrera psicología
estudio
universidad
curso
certificado
```

---

## Campaign Settings

| Setting | Value |
|---------|-------|
| Campaign type | Search |
| Goal | Conversions (WhatsApp click, form submit) |
| Geo — primary | Ecuador |
| Geo — expansion | Colombia, México, Perú |
| Language | Spanish |
| Budget (start) | $150–$200 / month |
| Bidding | Maximize Clicks to start → Target CPA once conversion data builds |

---

## Pre-launch checklist

- [ ] Photo of Grace exported in all three image sizes above
- [ ] Logo exported at 1200×1200 px (SVG → PNG)
- [ ] Direct phone number confirmed and added as call asset in Google Ads
- [ ] WhatsApp sitelink URL set (`https://wa.me/<number>`)
- [ ] GA4 WhatsApp click event firing
- [ ] GA4 contact form submit event firing
- [ ] Conversion events imported into Google Ads
- [ ] WhatsApp Business auto-reply configured for off-hours
- [ ] Final URL tested (landing page loads, CTA visible above fold)
