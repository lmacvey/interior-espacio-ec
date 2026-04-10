# Automated Substack → Facebook Sync

## Overview

New posts published to the Substack publication are automatically detected and posted to the Facebook Page — no manual action required.

**Flow:**
```
EventBridge Scheduler (every hour)
  → POST /api/cron/substack-sync  (X-Cron-Secret header)
    → Fetch RSS feed (espaciointeriorec.substack.com/feed)
    → For each new post: check DynamoDB → post to Facebook → mark as posted
```

---

## De-duplication Store: DynamoDB

**Why DynamoDB and not a file or in-memory store:**
- DynamoDB is a fully managed AWS database service, completely independent of Lambda, Amplify, or any compute layer
- Data persists across Lambda cold starts, Amplify redeploys, and server restarts
- Data is replicated across multiple AWS Availability Zones
- Cost: negligible (< 100 writes/month = fraction of a cent)

**Table: `interior-espacio-substack-posts`**

| Attribute | Type | Description |
|---|---|---|
| `substackPostId` | String (PK) | RSS `<guid>` — stable unique identifier per post |
| `facebookPostId` | String | Facebook Graph API post ID returned after publishing |
| `title` | String | Post title (for human reference) |
| `url` | String | Canonical Substack URL |
| `postedAt` | String | ISO 8601 timestamp |
| `ttl` | Number | Unix timestamp — auto-expiry after 180 days |

---

## Cron Trigger: EventBridge Scheduler

An EventBridge Scheduler rule fires every hour and calls the sync API route via an **API Destination** (EventBridge's native HTTP target mechanism).

**Auth:** The API Destination uses an EventBridge Connection with an API Key header (`X-Cron-Secret`). The route validates this header server-side against `process.env.CRON_SECRET`.

**Terraform resources provisioned (`terraform/eventbridge.tf`):**
- `aws_scheduler_schedule_group` — logical grouping
- `aws_cloudwatch_event_connection` — stores the secret header credential
- `aws_cloudwatch_event_api_destination` — points to the Amplify URL
- `aws_scheduler_schedule` — rate `1 hour`, targets the API Destination
- `aws_iam_role` — allows `scheduler.amazonaws.com` to invoke the API Destination

---

## New Files

| File | Purpose |
|---|---|
| `terraform/dynamodb.tf` | DynamoDB table + TTL config |
| `terraform/eventbridge.tf` | Scheduler + API Destination |
| `src/lib/substack.ts` | Fetch and parse Substack RSS feed |
| `src/lib/facebook.ts` | Facebook Graph API client (post to Page) |
| `src/lib/dynamodb.ts` | DynamoDB client — `isAlreadyPosted`, `markAsPosted` |
| `src/app/api/cron/substack-sync/route.ts` | Sync handler (secured endpoint) |

---

## Modified Files

| File | Change |
|---|---|
| `terraform/iam.tf` | Add `interior-espacio-app` IAM user with DynamoDB access |
| `terraform/variables.tf` | Add `cron_secret` variable |
| `terraform/amplify.tf` | Add 5 new env vars (see below) |
| `.env.example` | Document new env vars |

---

## New Environment Variables

| Variable | Scope | Description |
|---|---|---|
| `CRON_SECRET` | Server-only | Random secret validated on the sync endpoint |
| `DYNAMODB_TABLE_NAME` | Server-only | `interior-espacio-substack-posts` |
| `AWS_REGION` | Server-only | Region where DynamoDB table is provisioned |
| `DYNAMODB_ACCESS_KEY_ID` | Server-only (Secret) | IAM user key with DynamoDB read/write |
| `DYNAMODB_SECRET_ACCESS_KEY` | Server-only (Secret) | IAM user secret |

Generate `CRON_SECRET`:
```bash
openssl rand -base64 32
```

---

## Facebook Post Format

When a new Substack post is detected, the Facebook post is formatted as:

```
{title}

{excerpt — first ~200 characters of description}

Leer más → {url}
```

---

## New Dependencies

```bash
npm install fast-xml-parser @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

---

## Verification Checklist

- [ ] `terraform apply` completes — DynamoDB table and EventBridge Scheduler appear in AWS Console
- [ ] `POST /api/cron/substack-sync` with correct `X-Cron-Secret` → 200, returns `{ checked, posted, skipped }`
- [ ] `POST /api/cron/substack-sync` with wrong/missing secret → 401
- [ ] Second call with same feed → `posted: 0, skipped: N` (de-duplication working)
- [ ] New Substack post appears on Facebook Page within ~60 minutes of publication
- [ ] DynamoDB item exists for each auto-posted article (AWS Console → DynamoDB → Explore items)
- [ ] EventBridge Scheduler rule shows as **ENABLED** with correct rate expression