variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "AWS CLI profile to use (from ~/.aws/credentials)"
  type        = string
  default     = "espaciointerior"
}

# ── GitHub ────────────────────────────────────────────────────────────────────

variable "github_token" {
  description = "GitHub personal access token for Amplify → repo connection (repo scope required)"
  type        = string
  sensitive   = true
}

variable "github_repository" {
  description = "GitHub repo URL, e.g. https://github.com/your-org/interior-espacio-ec"
  type        = string
}

variable "github_branch" {
  description = "Branch to auto-deploy from"
  type        = string
  default     = "main"
}

# ── Domain ────────────────────────────────────────────────────────────────────

variable "domain_name" {
  description = "Root custom domain, e.g. espaciointerior.ec"
  type        = string
}

variable "enable_www_subdomain" {
  description = "Whether to also add www.domain_name as a subdomain in Amplify"
  type        = bool
  default     = true
}

# ── App environment variables ─────────────────────────────────────────────────

variable "next_public_site_url" {
  description = "Full production URL, e.g. https://www.espaciointerior.ec"
  type        = string
}

variable "contact_email" {
  description = "Therapist's email address — receives contact form submissions"
  type        = string
}

variable "ses_from_email" {
  description = "Verified SES sender address, e.g. contacto@espaciointerior.ec"
  type        = string
}

variable "facebook_app_id" {
  description = "Facebook App ID (from Settings → Basic in the Developer Portal)"
  type        = string
  default     = ""
}

variable "facebook_app_secret" {
  description = "Facebook App Secret — used server-side to verify data-deletion callbacks"
  type        = string
  sensitive   = true
  default     = ""
}

variable "facebook_access_token" {
  description = "Facebook long-lived Page Access Token (from Graph API Explorer)"
  type        = string
  sensitive   = true
}

variable "facebook_page_id" {
  description = "Facebook Page ID"
  type        = string
}

variable "instagram_business_account_id" {
  description = "Instagram Business Account ID (linked to the Facebook Page)"
  type        = string
  default     = ""
}


variable "next_server_actions_encryption_key" {
  description = "32-byte base64 secret for Next.js Server Actions encryption across Lambda instances. Generate with: openssl rand -base64 32"
  type        = string
  sensitive   = true
}

# ── Social links (public, non-sensitive) ─────────────────────────────────────

variable "instagram_url" {
  type    = string
  default = ""
}

variable "facebook_url" {
  type    = string
  default = ""
}

variable "linkedin_url" {
  type    = string
  default = ""
}

variable "whatsapp_number" {
  type    = string
  default = ""
}

variable "pinterest_url" {
  type    = string
  default = ""
}

variable "pinterest_domain_verify" {
  description = "Pinterest domain verification token (from Pinterest business settings)"
  type        = string
  default     = ""
}

# ── Substack ─────────────────────────────────────────────────────────────────

variable "substack_publication" {
  description = "Substack publication subdomain (e.g. espaciointeriorec — used server-side for RSS feed)"
  type        = string
  default     = ""
}

variable "next_public_substack_handle" {
  description = "Substack handle without @ (e.g. espaciointeriorec — used client-side for subscribe link)"
  type        = string
  default     = ""
}

# ── Cron ─────────────────────────────────────────────────────────────────────

variable "cron_secret" {
  description = "Secret header value validated by /api/cron/substack-sync. Generate with: openssl rand -base64 32"
  type        = string
  sensitive   = true
}
