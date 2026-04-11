# Facebook Integration Setup Guide — Espacio Interior

## Context

This guide covers the **operational setup** required to connect the site to Facebook/Meta: creating the Developer App, obtaining credentials, configuring Facebook Pixel, and populating environment variables. The code integration (Graph API client, admin panel, feed embed) is already implemented — this guide tells you how to generate the credentials that make it run.

---

## App Products — Decision Matrix

A single Meta Developer App supports multiple API products. Here is the full evaluation for this site:

| Product | Decision | Reason |
|---------|----------|--------|
| **Pages API** | ✅ Add | Core — required to post to and read the Facebook Page |
| **Facebook Login for Business** | ✅ Add | Required to generate Page Access Tokens via Graph API Explorer |
| **Instagram Graph API** | ✅ Add | Grace posts to `@espaciointeriorec`; enables IG feed embed on site and cross-posting from the admin panel using the same App |
| **Facebook Pixel / Conversions API** | ✅ Add | Tracks site visitors and lead events for ad campaign measurement |
| **oEmbed API** | ❌ Skip | Embeds individual posts by URL (WordPress-style). The site already fetches the Page feed natively via Graph API — oEmbed is a step backward in control and styling |
| **Messenger Platform** | ❌ Skip | Adds a Messenger chat widget. WhatsApp is already wired and is the dominant messaging channel in Ecuador |
| **Threads API** | ❌ Skip | API is read-only for most use cases; demographic in Ecuador is not active on Threads. Revisit in 12+ months |
| **WhatsApp Business Platform** | ❌ Skip | Click-to-chat link already works. The full Cloud API requires a Business Service Provider and monthly fees — not justified at current scale |
| **Marketing API** | ❌ Skip (for now) | Required only for programmatic ad management. Add when/if running paid campaigns |

**Active products to add to the App:** Pages API, Facebook Login for Business, Instagram Graph API.

---

## Prerequisites

- Facebook personal account with **Admin role** on the Facebook Page (`facebook.com/espaciointeriorec`)
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
5. Click **Add → Add a Page** and select `espaciointeriorec`
   - You must already be an Admin on that Page
6. *(Optional — required for ads)* Go to **Billing & Payments** → add a payment method

---

## Step 2 — Meta Developer Portal: Create the App

1. Go to [developers.facebook.com](https://developers.facebook.com) and log in with the same Facebook account
2. Click **My Apps → Create App**
3. Select use case: **Other** → **Business**
4. Fill in:
   - **App Display Name:** `Espacio Interior Site`
   - **App Contact Email:** `dev@espaciointeriorec.com`
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
   - **Privacy Policy URL:** `https://espaciointeriorec.com/privacy`
   - **Terms of Service URL:** `https://espaciointeriorec.com/terminos`
   - **Data Deletion Request URL:** `https://espaciointeriorec.com/api/facebook/data-deletion`
     *(This is an API callback — Facebook POSTs a signed request here when a user removes the app.
     The endpoint verifies the signature and returns a confirmation code.
     The status-check page lives at `https://espaciointeriorec.com/facebook/data-deletion`.)*
   - **App Icon:** upload a 1024×1024 image
4. Under **App Domains**, add: `espaciointeriorec.com`
5. Click **Add Platform → Website**, set Site URL to `https://espaciointeriorec.com`
6. Save changes

### Add Products

1. In the left sidebar click **Add Product** (the `+` icon)
2. Find and click **Set Up** on:
   - **Facebook Login for Business** — needed to generate tokens via Graph API Explorer
   - **Pages API** — needed to post and read from the Facebook Page
   - **Instagram Graph API** — needed to read the Instagram feed and cross-post from the admin panel

### Step 3b — Facebook Login for Business: Customize Configuration

After clicking **Set Up**, Meta opens the Facebook Login for Business settings panel with several tabs. Configure each as follows.

#### Permissions Tab

These are the permissions your App will request when generating tokens. Enable exactly these — no more, no less:

| Permission | Purpose |
|-----------|---------|
| `pages_show_list` | List the Pages the user manages — required to retrieve the Page ID and Page Access Token |
| `pages_read_engagement` | Read Page posts, likes, and comments — required for the feed embed |
| `pages_manage_posts` | Publish and delete posts on the Page — required for the admin composer |
| `pages_manage_metadata` | Read Page metadata and settings |
| `instagram_basic` | Read the linked Instagram account's profile and media |
| `instagram_content_publish` | Publish photos, videos, and Reels to the Instagram account |
| `instagram_manage_comments` | Read and reply to Instagram comments |

> Request all seven here even though some are technically for Instagram — they are all granted via the same Facebook Login for Business token flow.

#### Settings Tab — Client OAuth Settings

| Setting | Value | Reason |
|---------|-------|--------|
| Client OAuth Login | **ON** | Enables the OAuth authorization dialog |
| Web OAuth Login | **ON** | Graph API Explorer uses redirect-based OAuth — must be on |
| Force Web OAuth Reauthentication | **OFF** | Forced reauth breaks the Explorer token flow |
| Login with the JavaScript SDK | **OFF** | Site does not expose user-facing Facebook login |
| Enforce HTTPS | **ON** | Always on |
| Embedded Browser OAuth Login | **OFF** | For mobile WebView apps — not applicable |
| Login from Devices | **OFF** | For TV/game console OAuth — not applicable |

#### Settings Tab — Valid OAuth Redirect URIs

Add:

```
https://espaciointeriorec.com/
```

> **Why:** Connecting an Instagram Business account in Step 3d triggers Instagram Business Login, which requires at least one registered redirect URI — even though this site doesn't have a user-facing login flow. Your own site URL satisfies the requirement.
>
> Graph API Explorer token generation (Step 5) is unaffected — it handles its own OAuth internally and ignores this list.

#### Settings Tab — Allowed Domains for the JavaScript SDK

Leave blank — the JS SDK is not used.

#### Settings Tab — Data Deletion Callback

Confirm this matches Basic Settings:

```
https://espaciointeriorec.com/api/facebook/data-deletion
```

#### Token Settings Tab

| Setting | Value |
|---------|-------|
| Token Type | **User** |
| Token Expiration | **60 days** |

The 60-day User Token is then exchanged for a never-expiring Page Access Token in Step 5 — this is expected.

Click **Save Changes** before moving to Step 3c.

---

### Step 3c — Pages API: Customize Configuration

After clicking **Set Up** on Pages API, configure each tab as follows.

#### Permissions Tab

Enable the same four Page permissions already selected in Step 3b:

| Permission | Purpose |
|-----------|---------|
| `pages_show_list` | Enumerate Pages the user administers |
| `pages_read_engagement` | Read posts, likes, comments |
| `pages_manage_posts` | Publish and delete Page posts |
| `pages_manage_metadata` | Read Page settings and metadata |

These will already be checked if you set them in Step 3b — confirm they are enabled here too.

#### Webhooks Tab

Leave unconfigured for now.

> Webhooks let Meta push real-time events (new comment, new message, post status change) to a server endpoint. The current integration polls the feed on demand — no webhooks are needed. If real-time comment moderation is added later, the endpoint would be `https://espaciointeriorec.com/api/facebook/webhook` with a verification token stored in env.

#### Settings Tab

No additional required fields for the Pages API use case. Confirm the App is listed under the Business Account from Step 1.

Click **Save Changes**.

---

### Step 3d — Instagram Graph API: Customize Configuration

After clicking **Set Up** on Instagram Graph API, configure each tab as follows.

#### Prerequisites (before configuring)

The Instagram account must be set up correctly first:
1. Open the Instagram app → **Settings → Account → Switch to Professional Account** → select **Business**
2. During setup, link to the Facebook Page: **Connect to Facebook → select `espaciointeriorec`**
3. Confirm in Facebook Business Suite → **Business Settings → Instagram Accounts** that `@espaciointeriorec` appears

#### Permissions Tab

| Permission | Purpose |
|-----------|---------|
| `instagram_basic` | Read profile info (username, bio, follower count) and media |
| `instagram_content_publish` | Publish photo posts, video posts, and Reels |
| `instagram_manage_comments` | Read, reply to, and delete comments on posts |

Leave these disabled (not needed at current scope):
- `instagram_manage_insights` — analytics/impressions data
- `instagram_manage_messages` — DM inbox access (requires Advanced Access review)

#### Webhooks Tab

Leave unconfigured — same rationale as Pages API.

#### Settings Tab — Connected Instagram Account

> **Before connecting:** The Facebook account you are logged in as must have a **Developer** or **Administrator** role on the App. If you see `Insufficient Developer Role`, complete the fix below first.

**Fix: Insufficient Developer Role**

1. In the Developer Portal left sidebar, go to **App Roles → Roles**
2. Under **Developers**, click **Add Developers**
3. Search for your Facebook account by name or email and add it
4. Click **Submit** — you should see your account listed under Developers
5. Refresh the Instagram Graph API Settings tab and retry

> This error occurs because Meta requires you to be an explicitly registered Developer (not just the App creator) before connecting a Business Instagram account in Development mode. Adding yourself as a Developer resolves it.

**Connect the account**

1. Click **Add Instagram Account**
2. Log in with the `@espaciointeriorec` Instagram credentials
3. Authorize the App to access the account
4. Confirm `@espaciointeriorec` appears as a connected account

> **Why this matters:** This is what allows the App to generate an Instagram Business Account ID (retrieved in Step 7.1) and call the Instagram Graph API endpoints.

Click **Save Changes**.

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

> **Prerequisite:** Step 3b (Facebook Login for Business settings) must be saved before proceeding.

1. Go to [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)
2. In the top-right dropdown, select your App (`Espacio Interior Site`)
3. Click **Generate Access Token**
4. In the permissions dialog, enable all of the following (Facebook + Instagram together):
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `pages_manage_metadata`
   - `instagram_basic`
   - `instagram_content_publish`
   - `instagram_manage_comments`
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

The response is a list of Pages the user manages. Find `espaciointeriorec` in the `data` array and copy two values:

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

## Step 7 — Instagram Graph API

The Instagram Graph API uses the **same App** and **same Page Access Token** from Step 5 — no separate credentials are needed. The only additional value required is the **Instagram Business Account ID**.

> **Prerequisite:** The Instagram account (`@espaciointeriorec`) must be a **Professional account** (Business or Creator) and must be **linked to the Facebook Page** (`espaciointeriorec`). Do this in Instagram Settings → Account → Switch to Professional Account → Link to Facebook Page.

### 7.1 — Get the Instagram Business Account ID

Run using the Page Access Token from Step 5.4:

```
GET https://graph.facebook.com/{PAGE_ID}?fields=instagram_business_account&access_token={PAGE_ACCESS_TOKEN}
```

Response:
```json
{
  "instagram_business_account": {
    "id": "17841400000000000"
  },
  "id": "123456789"
}
```

Copy the `instagram_business_account.id` — this is your **Instagram Business Account ID**.

### 7.2 — Add to Environment Variables

```bash
INSTAGRAM_BUSINESS_ACCOUNT_ID=   # From Step 7.1
```

### 7.3 — What the Instagram API Enables

| Feature | Graph API Endpoint | Use in site |
|---------|-------------------|-------------|
| Read recent IG posts | `GET /{ig-user-id}/media` | Embed IG feed on site (similar to FB feed) |
| Publish a photo post | `POST /{ig-user-id}/media` + `/{ig-user-id}/media_publish` | Cross-post from admin panel |
| Publish a Reel | Two-step: upload container, then publish | Optional — same flow as photo |
| Read comments | `GET /{ig-media-id}/comments` | Future: moderation dashboard |

### 7.4 — Cross-Posting from the Admin Panel (future code work)

The admin panel's `PostComposer` currently posts only to Facebook. To also post to Instagram:
1. Upload the image to IG as a media container: `POST /{ig-user-id}/media`
2. Publish the container: `POST /{ig-user-id}/media_publish`
3. Optionally link both posts so they appear as a single campaign

> **Note:** Instagram Graph API requires an image URL (not a file upload) — host the image in S3 or similar and pass the public URL.

### 7.5 — Verify

```
GET https://graph.facebook.com/{INSTAGRAM_BUSINESS_ACCOUNT_ID}/media
  ?fields=id,caption,media_type,media_url,timestamp,permalink
  &access_token={PAGE_ACCESS_TOKEN}
```

Should return a list of recent Instagram posts.

---

## Step 8 — App Permissions & Review

| Scenario | Review Required? |
|----------|-----------------|
| Only you (the App admin) use the token | **No** — Development or Live, works as-is |
| Other Facebook users will authorize the App | **Yes** — submit for Standard Access review |
| Posting to the Facebook Page from the server | **No** — Page tokens are not user-facing |
| Reading/posting to Instagram (your own account) | **No** — as long as the IG account is linked to the Page and you are the App admin |
| Running ads programmatically | **Yes** — requires Marketing API access |
| Messenger Platform (third-party users messaging) | **Yes** — requires Messenger review |
| Threads API | **Yes** — requires Threads review; API is limited regardless |

For this site, App Review is **not required** for any of the active products (Facebook Page + Instagram), because all tokens are used by the site owner only.

---

## Step 8 — Environment Variables Reference

All Facebook-related variables for `.env.local` and production secrets:

```bash
# Facebook App credentials (Settings → Basic)
FACEBOOK_APP_ID=                    # App ID — safe server-side; not a secret
FACEBOOK_APP_SECRET=                # App Secret — server-side only; verifies data-deletion callbacks

# Facebook Page (server-side only — never expose to browser)
FACEBOOK_PAGE_ID=                   # Numeric Page ID (e.g. 123456789012345)
FACEBOOK_PAGE_ACCESS_TOKEN=         # Never-expiring Page token from Step 5.4

# Instagram (server-side only — no separate token; reuses FACEBOOK_PAGE_ACCESS_TOKEN)
INSTAGRAM_BUSINESS_ACCOUNT_ID=      # IG Business Account ID from Step 7.1
# Instagram API calls authenticate with FACEBOOK_PAGE_ACCESS_TOKEN above

# Public (exposed to browser via NEXT_PUBLIC_ prefix — safe to expose)
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/espaciointeriorec
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=      # Pixel ID from Step 6.1
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/espaciointeriorec

# Admin panel (unrelated to FB, but required for /admin/facebook)
ADMIN_SECRET=                       # Passphrase to access /admin/*
```

### Products NOT configured (and why)

| Product | Env Var | Status |
|---------|---------|--------|
| oEmbed API | none | Skipped — native Graph API fetch used instead |
| Messenger Platform | none | Skipped — WhatsApp already handles direct messaging |
| Threads API | none | Skipped — limited API; demographic not active there |
| WhatsApp Business Platform | `NEXT_PUBLIC_WHATSAPP_NUMBER` already set | Click-to-chat only; full Cloud API not needed at current scale |
| Marketing API | none | Add when running paid campaigns |

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

## Step 11 — Testing Checklist

### Facebook Page
- [ ] `GET https://graph.facebook.com/{PAGE_ID}/feed?access_token=...` returns posts
- [ ] `GET /api/facebook/feed` on the live site returns a JSON array
- [ ] Admin panel at `/admin/facebook` loads without errors
- [ ] Posting from the admin panel creates a real post on the Facebook Page
- [ ] Scheduling a post shows it as scheduled in Facebook Creator Studio

### Instagram
- [ ] `GET https://graph.facebook.com/{PAGE_ID}?fields=instagram_business_account&access_token=...` returns an IG account ID
- [ ] `GET https://graph.facebook.com/{INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_url,timestamp&access_token=...` returns recent posts
- [ ] IG feed embed (when implemented) displays posts on the site

### Facebook Pixel
- [ ] Meta Pixel Helper shows `PageView` on every page load
- [ ] Submitting the contact form fires the `Lead` event
- [ ] Events Manager → Test Events confirms events are received server-side

### Token & Auth
- [ ] Token validity check (`/me?access_token=...`) returns account info
- [ ] Visiting `/admin/facebook` without a session cookie redirects to `/admin/login`
- [ ] Logging out clears the cookie and redirects correctly

### Skipped Products (no test needed)
- oEmbed — not used
- Messenger — not configured
- Threads — not configured
- WhatsApp Cloud API — click-to-chat link tested separately

---

## Related Documentation

- [facebook-integration.md](facebook-integration.md) — Code architecture (Graph API client, admin panel, feed embed, share buttons)
- [social-media-integration.md](social-media-integration.md) — Open Graph meta tags and social links
- [aws-deployment.md](aws-deployment.md) — Where to store secrets in production (AWS Parameter Store)
