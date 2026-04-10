# Facebook Integration Setup Guide — Espacio Interior

## Context

This guide covers the **operational setup** required to connect the site to Facebook/Meta: creating the Developer App, obtaining credentials, configuring Facebook Pixel, and populating environment variables. The code integration (Graph API client, admin panel, feed embed) is already implemented — this guide tells you how to generate the credentials that make it run.

---

## Prerequisites

- Facebook personal account with **Admin role** on the Facebook Page (`facebook.com/interiorespacioec`)
- Access to `.env.local` on the deployment server (or AWS Secrets Manager if deployed)
- Chrome with [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) extension installed (for testing)

---

## Step 1 — Meta Business Suite

Meta Business Suite is required to manage the Page, App, and Pixel under one business identity.

1. Go to [business.facebook.com](https://business.facebook.com)
2. Click **Create account** (or sign in if you already have one)
3. Enter:
   - Business name: `Espacio Interior`
   - Your name and work email
4. After creation, go to **Business Settings → Accounts → Pages**
5. Click **Add → Add a Page** and select `interiorespacioec`
   - You must already be an Admin on that Page
6. *(Optional — required for ads)* Go to **Billing & Payments** → add a payment method

---

## Step 2 — Meta Developer Portal: Create the App

1. Go to [developers.facebook.com](https://developers.facebook.com) and log in with the same Facebook account
2. Click **My Apps → Create App**
3. Select use case: **Other** → **Business**
4. Fill in:
   - **App Display Name:** `Espacio Interior Site`
   - **App Contact Email:** `contacto@espaciointeriorec.com`
   - **Business Account:** select the Business Suite account from Step 1
5. Click **Create App** — complete any security checks

---

## Step 3 — App Settings

### Basic Settings

1. In the left sidebar go to **Settings → Basic**
2. Copy and save securely:
   - **App ID** ← you will need this for Pixel setup
   - **App Secret** ← treat like a password; never commit to git
3. Fill in required fields (needed before going Live):
   - **Privacy Policy URL:** `https://espaciointeriorec.com/privacidad`
   - **Terms of Service URL:** `https://espaciointeriorec.com/terminos`
   - **App Icon:** upload a 1024×1024 image
4. Under **App Domains**, add: `espaciointeriorec.com`
5. Click **Add Platform → Website**, set Site URL to `https://espaciointeriorec.com`
6. Save changes

### Add Products

1. In the left sidebar click **Add Product** (the `+` icon)
2. Find and click **Set Up** on:
   - **Facebook Login for Business** — needed to generate tokens via Graph API Explorer
   - **Pages API** — needed to post and read from the Page

---

## Step 4 — Switch App to Live Mode

> **Why:** In Development mode, the App only works for App admins/testers. Live mode is required to get a real Page Access Token that works from the server.

1. Go to **Settings → Basic**
2. At the top of the page, toggle the **App Mode** switch from `Development` to `Live`
3. Confirm when prompted
4. If Meta asks you to complete App Review first, complete the required sections (see Step 7)

---

## Step 5 — Page Access Token (most critical credential)

The Page Access Token lets the server post to and read from the Facebook Page. Follow this exact sequence.

### 5.1 — Grant App Access to the Page

1. In Meta Business Suite → **Business Settings → Accounts → Pages**
2. Select the Page → **Assigned Assets**
3. Click **Add Assets** → select the App → grant these permissions:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `pages_manage_metadata`

### 5.2 — Get a Short-Lived User Token

1. Go to [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)
2. In the top-right dropdown, select your App (`Espacio Interior Site`)
3. Click **Generate Access Token**
4. In the permissions dialog, enable:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `pages_manage_metadata`
5. Authorize — the token shown is a **short-lived User Access Token** (valid ~1 hour)
6. Copy it

### 5.3 — Exchange for a 60-Day User Token

Run this URL in your browser (or Postman), replacing the placeholders:

```
https://graph.facebook.com/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={APP_ID}
  &client_secret={APP_SECRET}
  &fb_exchange_token={SHORT_LIVED_TOKEN}
```

The response JSON contains `access_token` — this is your **60-day User Token**.

### 5.4 — Get the Never-Expiring Page Access Token

Run:

```
https://graph.facebook.com/me/accounts?access_token={60_DAY_USER_TOKEN}
```

The response is a list of Pages the user manages. Find `interiorespacioec` in the `data` array and copy two values:

- `"id"` → your **Page ID** (`FACEBOOK_PAGE_ID`)
- `"access_token"` → your **Page Access Token** (`FACEBOOK_PAGE_ACCESS_TOKEN`)

> **Note:** A Page Access Token obtained this way never expires — as long as the user doesn't change their Facebook password or revoke the App's permissions. If it ever stops working, repeat Steps 5.2–5.4.

### 5.5 — Verify the Token

```
https://graph.facebook.com/{PAGE_ID}/feed?access_token={PAGE_ACCESS_TOKEN}
```

You should see a JSON object with `data: [...]` containing your Page's recent posts.

### 5.6 — Add to Environment Variables

In `.env.local` (and in AWS Parameter Store / Secrets Manager for production):

```bash
FACEBOOK_PAGE_ID=your_page_id_here
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token_here
```

---

## Step 6 — Facebook Pixel

The Pixel tracks site visitors and ties them back to Facebook ad campaigns.

### 6.1 — Create the Pixel

1. In Meta Business Suite → **Events Manager**
2. Click **Connect Data Sources → Web**
3. Select **Facebook Pixel** → **Connect**
4. Name it: `Espacio Interior Web` → **Create Pixel**
5. Skip the auto-setup wizard (the site uses manual implementation)
6. Copy the **Pixel ID** (a 15–16 digit number)

### 6.2 — Add Pixel ID to Environment

```bash
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id_here
```

### 6.3 — Add Pixel Base Code to the Site

In `app/layout.tsx`, add inside the `<head>` section using `next/script`:

```tsx
import Script from 'next/script'

// Inside the <head> or at the bottom of <body>:
<Script
  id="facebook-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
      fbq('track', 'PageView');
    `,
  }}
/>
```

### 6.4 — Track the Lead Event

In `app/api/contact/route.ts`, after a successful form submission, add:

**Option A — Client-side (simpler, blocked by ad blockers):**
Fire `fbq('track', 'Lead')` from the contact form's success handler in `components/forms/ContactForm.tsx`.

**Option B — Server-side via Conversion API (recommended):**
After Resend sends the email, call the Meta Conversions API:

```
POST https://graph.facebook.com/v21.0/{PIXEL_ID}/events
  ?access_token={PAGE_ACCESS_TOKEN}

Body: {
  "data": [{
    "event_name": "Lead",
    "event_time": unix_timestamp,
    "action_source": "website",
    "user_data": {
      "em": [sha256_hashed_email]  // hashed, never raw
    }
  }]
}
```

### 6.5 — Verify

1. Open the site in Chrome with Meta Pixel Helper active
2. The extension should show a green checkmark with `PageView` firing
3. Submit the contact form — confirm `Lead` event appears
4. In Events Manager → **Test Events** tab, you can send real-time test events

---

## Step 7 — App Permissions & Review

| Scenario | Review Required? |
|----------|-----------------|
| Only you (the App admin) use the token | **No** — Development or Live, works as-is |
| Other Facebook users will authorize the App | **Yes** — submit for Standard Access review |
| Posting to the Page from the server | **No** — Page tokens are not user-facing |
| Running ads programmatically | **Yes** — requires Marketing API access |

For this site, App Review is **not required** because only the site owner uses the token. The Page Access Token from Step 5 works without review.

---

## Step 8 — Environment Variables Reference

All Facebook-related variables for `.env.local` and production secrets:

```bash
# Facebook Page (server-side only — never expose to browser)
FACEBOOK_PAGE_ID=               # Numeric Page ID (e.g. 123456789012345)
FACEBOOK_PAGE_ACCESS_TOKEN=     # Never-expiring Page token from Step 5.4

# Facebook public (exposed to browser via NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/interiorespacioec
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=  # Pixel ID from Step 6.1

# Admin panel (unrelated to FB, but required for /admin/facebook)
ADMIN_SECRET=                   # Passphrase to access /admin/*
```

> **Security:** `FACEBOOK_PAGE_ACCESS_TOKEN` and `FACEBOOK_PAGE_ID` must never be prefixed with `NEXT_PUBLIC_` — they would be exposed in the browser bundle. Only the Pixel ID is safe to make public.

---

## Step 9 — Token Maintenance

Page Access Tokens obtained via the exchange process are **permanent** but can be invalidated if:

- The Facebook account owner changes their password
- The user revokes App permissions in Facebook Settings
- Meta detects suspicious activity and resets sessions

**To check token validity:**

```
GET https://graph.facebook.com/me?access_token={PAGE_ACCESS_TOKEN}
```

Returns user info if valid. Returns an error object if expired or revoked.

**To regenerate:** repeat Steps 5.2 → 5.3 → 5.4 and update the environment variable.

**Recommended:** Set a calendar reminder every 6 months to verify the token is still working.

---

## Step 10 — Testing Checklist

- [ ] `GET https://graph.facebook.com/{PAGE_ID}/feed?access_token=...` returns posts
- [ ] `GET /api/facebook/feed` on the live site returns a JSON array
- [ ] Admin panel at `/admin/facebook` loads without errors
- [ ] Posting from the admin panel creates a real post on the Facebook Page
- [ ] Scheduling a post shows it as scheduled in Facebook Creator Studio
- [ ] Meta Pixel Helper shows `PageView` on every page load
- [ ] Submitting the contact form fires the `Lead` event
- [ ] Events Manager → Test Events confirms events are received
- [ ] Token validity check (`/me?access_token=...`) returns account info

---

## Related Documentation

- [facebook-integration.md](facebook-integration.md) — Code architecture (Graph API client, admin panel, feed embed, share buttons)
- [social-media-integration.md](social-media-integration.md) — Open Graph meta tags and social links
- [aws-deployment.md](aws-deployment.md) — Where to store secrets in production (AWS Parameter Store)
