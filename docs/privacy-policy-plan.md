# Plan: Política de Privacidad — Espacio Interior EC

## Context

Espacio Interior EC is an online therapy practice (Grace P. Pacheco, Psicóloga Clínica). The site has no privacy policy page, which is a legal gap for a mental health services provider. This plan creates a comprehensive privacy statement modeled on HIPAA principles (adapted for Ecuador's LOPDP framework and the therapy context), plus adds the link to the footer and the route to the sitemap.

---

## Files to Change

| Action | File |
|---|---|
| **Create** | `app/(marketing)/privacy/page.tsx` |
| **Edit** | `components/layout/Footer.tsx` |
| **Edit** | `app/sitemap.ts` |

---

## 1. Create `app/(marketing)/privacy/page.tsx`

### Structure

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Conoce cómo Espacio Interior EC protege tu información personal...",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const LAST_UPDATED = "abril de 2025";

function PolicySection({ id, title, children }) { /* h2 + prose wrapper, scroll-mt-24 */ }

export default function PrivacyPage() { /* article > max-w-4xl > header + TOC nav + sections */ }
```

### Page Header
- `<h1>` "Política de Privacidad" in `font-display`
- Subtitle: "Última actualización: {LAST_UPDATED}"
- 2-sentence intro paragraph

### Table of Contents (`<nav aria-label="Contenido de esta página">`)
Anchor links to all 11 sections — displayed in a `rounded-2xl bg-muted border` card.

### Sections (all use `<PolicySection>`)

**1. `#informacion-recopilada` — Información que recopilamos**
- Sub-group (a): Contact form — name, email, message → sent via AWS SES, not stored on site
- Sub-group (b): Therapy session notes — held exclusively by the therapist, NOT on this site
- Sub-group (c): Auto-collected technical data — IP, browser, pages visited (operational use only)

**2. `#uso-informacion` — Uso de la información**
- Respond to inquiries, coordinate sessions
- Send confirmations/reminders if authorized
- Improve site operation
- Legal/ethical compliance
- Explicit: not sold, not used for advertising

**3. `#confidencialidad` — Confidencialidad terapéutica** *(visual highlight card — `bg-primary/5 border border-primary/20`)*
- Confidentiality as core ethical principle
- Grace subject to Colegio de Psicólogos del Ecuador code of ethics
- "La confidencialidad es un elemento esencial del espacio terapéutico"

**4. `#divulgaciones` — Cuándo podemos divulgar información**
HIPAA "required disclosures" equivalent — four exceptions:
- Riesgo grave e inminente (serious/imminent harm)
- Orden legal de autoridad competente
- Consentimiento explícito del cliente
- Menores de edad — tutores legales per Ecuadorian law

**5. `#aviso-practicas` — Aviso de Prácticas de Privacidad** *(elevated card)*
HIPAA NPP equivalent — formal notice that Espacio Interior EC will:
1. Maintain privacy of health/personal information
2. Provide this notice of privacy practices
3. Follow terms of this notice while in effect
4. Notify in case of security breach

**6. `#tus-derechos` — Tus derechos**
HIPAA rights adapted — 6 rights as bold-titled items:
- Acceso — request access to held data
- Rectificación — request correction
- Conocer divulgaciones — record of disclosures
- Solicitar restricciones — request limitations
- Presentar queja — file complaint (Superintendencia de Datos or direct)
- Recibir este Aviso — right to receive this notice

**7. `#seguridad` — Medidas de seguridad**
- HTTPS/TLS on contact form; AWS SES enterprise-grade
- Session platforms with end-to-end encryption
- Information access restricted to Grace P. Pacheco
- Honest caveat: no electronic method is 100% secure

**8. `#terceros` — Servicios de terceros**
One paragraph per service with external policy link:
- AWS SES (contact form processing)
- WhatsApp / Meta (click-to-chat)
- Substack (newsletter — unsubscribe anytime)
- Facebook / Meta (page feed display)
- Pinterest (embed)

External links use `target="_blank" rel="noopener noreferrer"`.

**9. `#lopdp` — Marco legal aplicable — LOPDP Ecuador**
- Ley Orgánica de Protección de Datos Personales (R.O. Suplemento 459, 2021-05-26)
- Responsable del tratamiento: Grace P. Pacheco — `contacto@espaciointeriorec.com`
- Legal bases: (a) contractual/therapeutic relationship, (b) legal/ethical obligations, (c) explicit consent
- Brief GDPR mention for EU-resident clients

**10. `#cambios` — Cambios a esta política**
- Policy updated periodically; "Última actualización" date reflects last revision
- Continued site use after changes constitutes acceptance

**11. `#contacto-privacidad` — Contacto para asuntos de privacidad** *(CTA card)*
Name, title, email (`CONTACT_EMAIL` constant), location
+ `<Link href="/contact">` button

---

## 2. Edit `components/layout/Footer.tsx`

Insert after the existing "Contacto" `<li>` in the "Navegar" `<ul>`:

```tsx
<li>
  <Link href="/privacy" className="hover:text-text-primary transition-colors duration-150 py-1 inline-block">
    Política de Privacidad
  </Link>
</li>
```

---

## 3. Edit `app/sitemap.ts`

Add a `legalRoutes` array after `blogRoutes` and include it in the return:

```ts
const legalRoutes: MetadataRoute.Sitemap = ["/privacy"].map((route) => ({
  url: `${SITE_URL}${route}`,
  lastModified: new Date(),
  changeFrequency: "yearly" as const,
  priority: 0.3,
}));

return [...staticRoutes, ...blogRoutes, ...legalRoutes];
```

---

## Key Design Decisions

- **Static `LAST_UPDATED` constant** (not `new Date()`) — prevents the date from changing on every build
- **Single TSX file** (no MDX) — mixed prose + styled cards benefits from full JSX control
- **`scroll-mt-24` on sections** — header is sticky; anchor jumps need to clear it
- **HIPAA framing as "principios equivalentes"** — HIPAA legally applies to US covered entities; this policy adapts equivalent principles without claiming legal HIPAA compliance
- **LOPDP as primary legal reference** — Ecuador's data protection law is the actual governing framework

---

## Verification

1. Run `next dev`, navigate to `/privacy` — page renders with all 11 sections
2. Check footer — "Política de Privacidad" link appears under "Navegar" and routes correctly
3. Navigate to `/sitemap.xml` — verify `/privacy` appears with `priority 0.3` and `changefreq yearly`
4. Test anchor links in TOC — all scroll to correct sections with header clearance
5. Confirm external links (AWS, WhatsApp, Substack, Facebook, Pinterest) open in new tab
