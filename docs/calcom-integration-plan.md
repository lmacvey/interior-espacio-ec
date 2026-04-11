# Scheduling Integration Plan — Cal.com Cloud

## Context

Grace P. Pacheco's therapy site needs real appointment scheduling. The site currently has a placeholder `BookingWidget.tsx` iframe pointing to a fake Calendly URL. The site is hosted on **AWS Amplify** (managed) — so Cal.com Cloud (managed SaaS) is the right fit. No new server to manage.

**Key requirements:**
- Single-use / per-client private booking links
- Client data stays reasonably private (no health questions in the scheduler)
- Automated WhatsApp confirmations + reminders (native, no Zapier)
- Inline embed on the `/contact` page

**Why Cal.com over Calendly:**
- Native WhatsApp Business integration (no Zapier/Make.com middleware)
- HIPAA BAA available (Business plan)
- Open-source core — can self-host later on AWS EC2/RDS if data sovereignty becomes a hard requirement (same AWS account, same region)
- Calendly has no native WhatsApp and is not HIPAA-compliant

---

## Architecture

```
Client visits /contact
  → Cal.com inline embed (via @calcom/embed-react)
  → Client books session

Cal.com Cloud (Free tier)
  → Sends email confirmation (built-in)
  → Fires webhook → POST /api/webhooks/cal → sends WhatsApp via Meta Cloud API

Therapist
  → Receives booking notification (email + WhatsApp)
  → Uses Cal.com dashboard for schedule management
```

**WhatsApp strategy:** Cal.com Free's native WhatsApp integration requires plan verification after account creation. Either way, we build a webhook handler — if native WhatsApp is available on Free, configure it in the Cal.com dashboard (no code). If not, the webhook → Meta Cloud API path handles it at $0/mo extra cost.

---

## Pre-Implementation Steps (manual, outside code)

These must be done in dashboards before any code changes:

1. **Create Cal.com account** at cal.com (or log in if existing)
   - Start with Free; upgrade to Teams ($12/mo) only if WhatsApp workflows require it
2. **Set up Event Type** — "Sesión de Exploración Gratuita (15 min)" and standard sessions
3. **Configure WhatsApp Business integration** in Cal.com → Apps → WhatsApp
   - Requires linking Meta Business account + WhatsApp Business number
   - Set up message templates: confirmation + 24h reminder
4. **Enable single-use links** in Cal.com → Event Type → Advanced → "One-time use links"
5. **Get your Cal.com username/slug** (e.g., `cal.com/grace-pacheco`)

---

## Code Changes

### 1. Install embed package

```bash
npm install @calcom/embed-react
```

### 2. Update `components/forms/BookingWidget.tsx`

Replace the placeholder iframe with the official Cal.com embed.

```tsx
"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface BookingWidgetProps {
  calLink: string; // e.g. "grace-pacheco/consulta"
}

export function BookingWidget({ calLink }: BookingWidgetProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "consulta" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#6b7f6b",      // sage green primary
            "cal-brand-emphasis": "#4a5f4a",
          }
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <Cal
      namespace="consulta"
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
    />
  );
}
```

### 3. Update `app/(marketing)/contact/page.tsx`

Import `BookingWidget` with `dynamic()` (Cal.com embed requires browser DOM — cannot SSR).

```tsx
import dynamic from "next/dynamic";

const BookingWidget = dynamic(
  () => import("@/components/forms/BookingWidget").then(m => m.BookingWidget),
  { ssr: false, loading: () => <div className="h-[650px] animate-pulse bg-sage-light rounded-lg" /> }
);

// In the JSX:
<BookingWidget calLink={process.env.NEXT_PUBLIC_CAL_LINK!} />
```

### 4. Add env vars

**`.env.local`** (and Amplify environment config):
```
NEXT_PUBLIC_CAL_LINK=grace-pacheco/consulta
```

**`.env.example`** — document the new var.

### 5. Remove old Calendly references

- Remove `CALENDLY_API_TOKEN` from `.env.example` (or mark as deprecated)
- `BookingWidget.tsx` no longer needs any Calendly iframe

---

## Files to Modify

| File | Change |
|---|---|
| `components/forms/BookingWidget.tsx` | Replace iframe with `@calcom/embed-react` `Cal` component |
| `app/(marketing)/contact/page.tsx` | Dynamic import `BookingWidget`; pass `calLink` prop |
| `.env.example` | Add `NEXT_PUBLIC_CAL_LINK`; remove/deprecate Calendly vars |
| `package.json` | Add `@calcom/embed-react` dependency |

---

## WhatsApp Setup

### Option A — Cal.com native (verify after account creation, no code)

1. Cal.com → Apps → search "WhatsApp" (available if plan allows)
2. Connect Meta Business / WhatsApp Business number
3. Cal.com → Workflows → New Workflow:
   - Trigger: Booking confirmed → Send WhatsApp to invitee
   - Trigger: 24h before event → Send WhatsApp reminder
4. Message templates (Meta-approved):
   - Confirmation: `Hola {NAME}, tu sesión con Grace está confirmada para el {EVENT_DATE} a las {EVENT_TIME}.`
   - Reminder: `Hola {NAME}, te recordamos tu sesión mañana {EVENT_DATE} a las {EVENT_TIME} con Grace Pacheco.`

### Option B — Webhook fallback (if WhatsApp not on Free plan)

New file `app/api/webhooks/cal/route.ts`:
```ts
// POST — receives Cal.com booking events
// Verifies HMAC signature (Cal-Signature header)
// Calls lib/whatsapp.ts → sendWhatsApp(phone, template, params)
```

New file `lib/whatsapp.ts`:
```ts
// Thin wrapper around Meta Cloud API
// POST https://graph.facebook.com/v17.0/{PHONE_ID}/messages
// Uses WHATSAPP_ACCESS_TOKEN env var
```

New env vars (Option B only):
- `WHATSAPP_BUSINESS_PHONE_ID` — Meta Business dashboard
- `WHATSAPP_ACCESS_TOKEN` — Meta System User token
- `CAL_WEBHOOK_SECRET` — Cal.com → Developer → Webhooks

---

## Single-Use Links (for private/referred clients)

Cal.com generates single-use links via its dashboard or API:
- Cal.com dashboard → Event Type → "Generate single-use link"
- Share the link with the client via WhatsApp
- Link expires after one booking

No code needed for basic single-use links. If you want to generate them programmatically (e.g., from a future client intake admin page), use the Cal.com REST API with your API key.

---

## Pricing Summary

| Plan | Cost | When to upgrade |
|---|---|---|
| Free | $0/mo | Start here — unlimited bookings, email notifications |
| Teams | $12/mo (1 user) | If native WhatsApp workflows require it |
| Organizations | $28/mo (1 user) | If HIPAA BAA is required |

---

## Privacy Constraints

- Event type collects: **name, email, phone** only
- No health-related custom questions in the Cal.com form
- Clinical notes stay in a separate system (entirely outside Cal.com)
- Cal.com data residency: EU region available; HIPAA BAA on Organizations plan

---

## Migration Path to Self-Hosted (future)

If Ecuador LOPDP compliance requires local data:
1. Provision EC2 + RDS (PostgreSQL) + ElastiCache on same AWS account
2. Deploy Cal.com Docker image
3. Point `NEXT_PUBLIC_CAL_LINK` to self-hosted domain
4. Zero changes to the Next.js embed code

---

## Verification

1. `npm run build` — no type errors
2. Load `/contact` page → Cal.com embed renders, branded sage green
3. Book a test appointment → confirm WhatsApp message received on test number
4. Verify 24h reminder arrives on schedule
5. Generate a single-use link → book → confirm link expires
