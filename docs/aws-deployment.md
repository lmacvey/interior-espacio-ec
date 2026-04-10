# AWS Deployment Plan — Interior Espacio EC

## Context

The site is a Next.js 16.2.3 (App Router) therapy marketing site deployed to AWS at minimum cost. It cannot use a pure static export because it has:
- API routes: `/api/contact` (Amazon SES email), `/api/admin/login|logout`, `/api/facebook/feed|post`
- ISR: Facebook feed revalidates every 1800s
- Server-side session cookies (admin panel)

**Email: Amazon SES (not Resend)** — Resend does not offer a BAA and is not HIPAA compliant. As a therapy site, contact form messages may contain protected health information (PHI). Amazon SES is covered under the AWS BAA signed when using Amplify, costs nothing at this volume, and keeps everything in one AWS account.

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
| Amazon SES | 62,000 emails/mo free (sent from AWS) | $0.10/1,000 emails |
| **Total (typical small site)** | **$0** | **~$1–4/mo** |

---

## AWS Account & Credential Setup

### Step 1 — Create AWS account (root)

1. Go to [aws.amazon.com](https://aws.amazon.com) → **Create an AWS account**
2. Use a dedicated email (not personal) — root account email cannot be changed
3. Enable **MFA on the root account** immediately after creation (Console → Account → Security credentials → MFA)
4. **Do not use root credentials for anything after setup.** Root is only for billing, account closure, and IAM bootstrap.

### Step 2 — Create a Terraform IAM user

Terraform needs an IAM user with programmatic access (access key) to provision all resources. This is a separate user from the SES sender IAM user created by Terraform itself.

1. AWS Console → **IAM → Users → Create user**
2. Name: `terraform-deployer`
3. Access type: **Programmatic access only** (no console login needed)
4. Attach the policy below (inline or as a managed policy named `TerraformDeployerPolicy`)

**Minimum IAM permissions for `terraform apply`:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Amplify",
      "Effect": "Allow",
      "Action": ["amplify:*"],
      "Resource": "*"
    },
    {
      "Sid": "SES",
      "Effect": "Allow",
      "Action": ["ses:*"],
      "Resource": "*"
    },
    {
      "Sid": "ACM",
      "Effect": "Allow",
      "Action": ["acm:*"],
      "Resource": "*"
    },
    {
      "Sid": "IAMScopedToApp",
      "Effect": "Allow",
      "Action": [
        "iam:CreateUser",
        "iam:DeleteUser",
        "iam:PutUserPolicy",
        "iam:DeleteUserPolicy",
        "iam:GetUser",
        "iam:GetUserPolicy",
        "iam:ListUserPolicies",
        "iam:CreateAccessKey",
        "iam:DeleteAccessKey",
        "iam:ListAccessKeys",
        "iam:TagUser"
      ],
      "Resource": "arn:aws:iam::*:user/apps/*"
    },
    {
      "Sid": "DynamoDB",
      "Effect": "Allow",
      "Action": ["dynamodb:*"],
      "Resource": "*"
    },
    {
      "Sid": "EventBridge",
      "Effect": "Allow",
      "Action": [
        "events:CreateConnection",
        "events:DeleteConnection",
        "events:UpdateConnection",
        "events:DescribeConnection",
        "events:ListConnections",
        "events:CreateApiDestination",
        "events:DeleteApiDestination",
        "events:UpdateApiDestination",
        "events:DescribeApiDestination",
        "events:ListApiDestinations",
        "events:PutRule",
        "events:DeleteRule",
        "events:DescribeRule",
        "events:EnableRule",
        "events:DisableRule",
        "events:PutTargets",
        "events:RemoveTargets",
        "events:ListTargetsByRule"
      ],
      "Resource": "*"
    },
    {
      "Sid": "IAMForScheduler",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:GetRole",
        "iam:GetRolePolicy",
        "iam:ListRolePolicies",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:PassRole",
        "iam:TagRole"
      ],
      "Resource": "arn:aws:iam::*:role/interior-espacio-*"
    }
  ]
}
```

> **Why scoped IAM?** The `iam:*` actions are restricted to `arn:aws:iam::*:user/apps/*` — the path prefix used in `iam.tf`. This prevents the Terraform user from creating admin-level IAM users.

5. After creating the user, go to **Security credentials → Create access key**
6. Choose **"Other"** as use case → download the CSV

### Step 3 — Configure credentials locally

**Option A — AWS CLI (recommended):**
```bash
aws configure --profile interior-espacio
# AWS Access Key ID: <paste key>
# AWS Secret Access Key: <paste secret>
# Default region: us-east-1
# Default output format: json
```

Then export the profile before running Terraform:
```bash
export AWS_PROFILE=interior-espacio
cd terraform && terraform apply
```

**Option B — Environment variables:**
```bash
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
export AWS_DEFAULT_REGION=us-east-1
```

**Option C — `~/.aws/credentials` file (default profile):**
```ini
[default]
aws_access_key_id = AKIA...
aws_secret_access_key = ...
region = us-east-1
```

### Step 4 — Rotate credentials after first deploy

The `terraform-deployer` access key is only needed when running `terraform apply`. Best practice:
- Store it in a password manager (not in the repo or `.env`)
- Rotate it every 90 days: IAM → User → Security credentials → Create new key → delete old

---

## Terraform (Infrastructure as Code)

All AWS resources are codified in `terraform/`. This is the recommended way to provision.

```
terraform/
  main.tf                   # AWS provider, Terraform version constraints
  variables.tf              # All input variables
  amplify.tf                # Amplify app, branch, custom domain
  ses.tf                    # SES domain identity, DKIM, configuration set
  iam.tf                    # IAM users: SES sender + app DynamoDB access
  dynamodb.tf               # DynamoDB table for Substack→Facebook dedup store
  eventbridge.tf            # EventBridge Scheduler + API Destination (hourly cron)
  outputs.tf                # DNS records to add, IAM credentials
  terraform.tfvars.example  # Copy → terraform.tfvars, fill in values
```

### First-time apply

```bash
cd terraform

# 1. Copy and fill in variables
cp terraform.tfvars.example terraform.tfvars
# edit terraform.tfvars with real values

# 2. Init and apply
terraform init
terraform plan    # review what will be created
terraform apply
```

### After apply — DNS records required

`terraform output` will print all records to add at your registrar:

| Output | DNS record type | Purpose |
|---|---|---|
| `acm_validation_dns_records` | CNAME (1–2) | ACM certificate validation |
| `ses_domain_verification_token` | TXT | SES domain ownership |
| `ses_dkim_cname_records` | CNAME (3) | SES DKIM email signing |
| `amplify_custom_domain_status` | CNAME | Activate custom domain |

Add all records, then wait up to 30 minutes for DNS propagation. The ACM cert must validate before the Amplify custom domain goes live.

DNS propagation can take up to 30 minutes. SES domain verification may take up to 30 minutes (`aws_ses_domain_identity_verification` waits automatically).

### Request SES production access (one-time, manual)

Terraform cannot exit the SES sandbox. After apply:
1. AWS Console → SES → Account dashboard → **Request production access**
2. Describe use: "Contact form for therapy practice, < 100 emails/month"

### Sign the AWS BAA (one-time, manual)

Terraform cannot accept legal agreements. Before handling PHI:
1. AWS Console → Account → **AWS Artifact → Agreements**
2. Accept the **AWS Business Associate Addendum**

---

## Manual Setup Steps (alternative to Terraform)

### 1. Sign AWS BAA (manual — Terraform cannot do this)

Before handling any PHI:
1. AWS Console → **My Account → AWS Artifact → Agreements**
2. Accept the **AWS Business Associate Addendum (BAA)**

This covers all AWS services used (Amplify, SES, CloudFront, Lambda).

### 2. Set Up Amazon SES

1. AWS Console → **SES → Verified identities → Create identity**
2. Verify your sending domain (e.g., `espaciointerior.ec`) via DNS TXT/CNAME records
3. Verify the recipient address (`CONTACT_EMAIL`) if still in SES sandbox
4. **Request production access** (exit sandbox): SES Console → Account dashboard → Request production access
   - Reason: transactional contact form for therapy practice
   - Expected volume: < 100 emails/month
5. Create an IAM user with `ses:SendEmail` permission; generate access key for the app

### 3. Replace Resend with Amazon SES in Code

**Install SDK:**
```bash
npm install @aws-sdk/client-ses
```

**Update `/api/contact` route** to use `@aws-sdk/client-ses` instead of `resend`.

Example swap:
```ts
// Before (Resend)
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({ from, to, subject, html })

// After (Amazon SES)
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
const ses = new SESClient({ region: process.env.SES_REGION })
await ses.send(new SendEmailCommand({
  Source: process.env.SES_FROM_EMAIL,
  Destination: { ToAddresses: [process.env.CONTACT_EMAIL!] },
  Message: {
    Subject: { Data: subject },
    Body: { Html: { Data: html } },
  },
}))
```

Remove `resend` from dependencies once migrated.

### 4. Prepare `next.config.ts`

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

### 5. Connect Repository to Amplify

1. AWS Console → **Amplify → New app → Host web app**
2. Connect GitHub → select `interior-espacio-ec` repo → branch: `main`
3. Amplify auto-detects Next.js and configures the build

### 6. Build Spec (`amplify.yml`)

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

### 7. Environment Variables

Set in **Amplify Console → App settings → Environment variables**. Mark sensitive values as **Secret**.

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | e.g., `https://www.espaciointerior.ec` |
| `SES_REGION` | e.g., `us-east-1` — region where SES is configured |
| `AWS_ACCESS_KEY_ID` | Secret — IAM user with `ses:SendEmail` only |
| `AWS_SECRET_ACCESS_KEY` | Secret |
| `SES_FROM_EMAIL` | Verified SES sender, e.g., `contacto@espaciointerior.ec` |
| `CONTACT_EMAIL` | Therapist's receiving address |
| `FACEBOOK_ACCESS_TOKEN` | Secret |
| `FACEBOOK_PAGE_ID` | |
| `NEXT_PUBLIC_INSTAGRAM_URL` | |
| `NEXT_PUBLIC_FACEBOOK_URL` | |
| `NEXT_PUBLIC_LINKEDIN_URL` | |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Secret — generate 32-byte random string for Lambda consistency |
| `CRON_SECRET` | Secret — random string validated on `/api/cron/substack-sync` |
| `DYNAMODB_TABLE_NAME` | `interior-espacio-substack-posts` |
| `DYNAMODB_ACCESS_KEY_ID` | Secret — IAM user with DynamoDB read/write only |
| `DYNAMODB_SECRET_ACCESS_KEY` | Secret |

Generate encryption key:
```bash
openssl rand -base64 32
```

### 8. Custom Domain

1. Amplify Console → **Domain management → Add domain**
2. Enter your domain (e.g., `espaciointerior.ec`)
3. Amplify provisions an ACM SSL certificate automatically
4. Update DNS at registrar with the provided CNAME records

### 9. Continuous Deployment

Every push to `main` triggers an automatic Amplify build and deploy.

---

## Verification Checklist

- [ ] AWS account created; MFA enabled on root
- [ ] `terraform-deployer` IAM user created with scoped policy
- [ ] Local AWS credentials configured (`aws configure --profile interior-espacio`)
- [ ] AWS BAA signed in AWS Artifact
- [ ] SES domain verified; production access granted (out of sandbox)
- [ ] Build succeeds in Amplify console (all 3 phases complete)
- [ ] Static pages load: `/`, `/about`, `/services`, `/blog`
- [ ] Contact form submits and email arrives via Amazon SES
- [ ] Admin panel `/admin/login` authenticates and session persists
- [ ] Facebook feed renders (or degrades gracefully)
- [ ] HTTPS works on custom domain with valid cert
- [ ] DynamoDB table `interior-espacio-substack-posts` exists in AWS Console
- [ ] EventBridge Scheduler rule is ENABLED (hourly rate)
- [ ] `/api/cron/substack-sync` returns 401 without `X-Cron-Secret`
- [ ] New Substack posts appear on Facebook Page within ~60 minutes

---

## Fallback: EC2 t4g.nano + CloudFront (~$3–4/mo)

If Amplify has compatibility issues with Next.js 16.2.3:

1. Add `output: 'standalone'` to `next.config.ts`
2. Build Docker image from `.next/standalone`
3. Deploy to EC2 t4g.nano (ARM, ~$3.07/mo) behind CloudFront
4. nginx reverse proxy + PM2 for process management
5. SSL via ACM on CloudFront distribution

More manual setup but fully controllable. SES setup is identical regardless of this choice.
