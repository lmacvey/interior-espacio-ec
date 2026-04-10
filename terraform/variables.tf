variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
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

variable "facebook_access_token" {
  description = "Facebook Graph API access token"
  type        = string
  sensitive   = true
}

variable "facebook_page_id" {
  description = "Facebook Page ID"
  type        = string
}

variable "admin_passphrase" {
  description = "Passphrase for the /admin panel"
  type        = string
  sensitive   = true
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

# ── Cron ─────────────────────────────────────────────────────────────────────

variable "cron_secret" {
  description = "Secret header value validated by /api/cron/substack-sync. Generate with: openssl rand -base64 32"
  type        = string
  sensitive   = true
}
