# AWS Deployment Plan — Interior Espacio EC

## Context

The site is a Next.js 16.2.3 (App Router) therapy marketing site deployed to AWS at minimum cost. It cannot use a pure static export because it has:
- API routes: `/api/contact` (Resend email), `/api/admin/login|logout`, `/api/facebook/feed|post`
- ISR: Facebook feed revalidates every 1800s
- Server-side session cookies (admin panel)

---

## Recommended Approach: AWS Amplify Hosting

AWS Amplify Hosting natively supports Next.js App Router, SSR, ISR, and API routes. It auto-provisions CloudFront + Lambda under the hood.

**Estimated monthly cost:**
| Resource | Free tier | After free tier |
|---|---|---|
| Build minutes | 1,000 min/mo free | $0.01/min |
| Data served | 15 GB/mo free | $0.15/GB |
| Storage | 5 GB free | $0.023/GB |
| SSR requests | 500K/mo free | $0.30/1M requests |
| **Total (typical small site)** | **$0** | **~$1–4/mo** |

**Email (Resend):** Free tier — 3,000 emails/mo, 100/day. More than sufficient for contact form volume.

---

## Setup Steps

### 1. Prepare `next.config.ts`

No output mode change needed — Amplify detects Next.js automatically.

Add `images.remotePatterns` if Facebook/Instagram CDN images are used:

```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
    ],
  },
}
```

### 2. Connect Repository to Amplify

1. AWS Console → **Amplify → New app → Host web app**
2. Connect GitHub → select `interior-espacio-ec` repo → branch: `main`
3. Amplify auto-detects Next.js and configures the build

### 3. Build Spec (`amplify.yml`)

Amplify may auto-generate this. If not, commit to repo root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 4. Environment Variables

Set in **Amplify Console → App settings → Environment variables**. Mark sensitive values as **Secret**.

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | e.g., `https://www.espaciointerior.ec` |
| `RESEND_API_KEY` | Secret |
| `CONTACT_EMAIL` | |
| `FACEBOOK_ACCESS_TOKEN` | Secret |
| `FACEBOOK_PAGE_ID` | |
| `ADMIN_PASSPHRASE` | Secret |
| `NEXT_PUBLIC_INSTAGRAM_URL` | |
| `NEXT_PUBLIC_FACEBOOK_URL` | |
| `NEXT_PUBLIC_LINKEDIN_URL` | |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Secret — generate 32-byte random string for Lambda consistency |

Generate encryption key:
```bash
openssl rand -base64 32
```

### 5. Custom Domain

1. Amplify Console → **Domain management → Add domain**
2. Enter your domain (e.g., `espaciointerior.ec`)
3. Amplify provisions ACM SSL certificate automatically
4. Update DNS at registrar with provided CNAME records

### 6. Continuous Deployment

Every push to `main` triggers an automatic Amplify build and deploy.

---

## Verification Checklist

- [ ] Build succeeds in Amplify console (all 3 phases complete)
- [ ] Static pages load: `/`, `/about`, `/services`, `/blog`
- [ ] Contact form submits and email arrives via Resend
- [ ] Admin panel `/admin/login` authenticates and session persists
- [ ] Facebook feed renders (or degrades gracefully)
- [ ] HTTPS works on custom domain with valid cert

---

## Fallback: EC2 t4g.nano + CloudFront (~$3–4/mo)

If Amplify has compatibility issues with Next.js 16.2.3:

1. Add `output: 'standalone'` to `next.config.ts`
2. Build Docker image from `.next/standalone`
3. Deploy to EC2 t4g.nano (ARM, ~$3.07/mo) behind CloudFront
4. nginx reverse proxy + PM2 for process management
5. SSL via ACM on CloudFront distribution

More manual setup but fully controllable.
