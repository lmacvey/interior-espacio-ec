# ── Route 53 ──────────────────────────────────────────────────────────────────

output "route53_nameservers" {
  description = "Set these 4 NS records at Spaceship to delegate DNS to Route 53"
  value       = aws_route53_zone.site.name_servers
}

# ── ACM certificate ───────────────────────────────────────────────────────────

output "acm_certificate_arn" {
  description = "ACM certificate ARN (us-east-1) — used by Amplify and available for CloudFront"
  value       = aws_acm_certificate.site.arn
}

output "acm_validation_dns_records" {
  description = "Add these DNS CNAME records at your registrar to validate the ACM certificate"
  value       = local.acm_validation_records
}

output "acm_certificate_status" {
  description = "Certificate validation status — should become ISSUED after DNS records propagate"
  value       = aws_acm_certificate.site.status
}

# ── Amplify ───────────────────────────────────────────────────────────────────

output "amplify_app_id" {
  description = "Amplify App ID"
  value       = aws_amplify_app.site.id
}

output "amplify_default_domain" {
  description = "Amplify-assigned domain (before custom domain is active)"
  value       = aws_amplify_app.site.default_domain
}

output "amplify_custom_domain_status" {
  description = "Custom domain verification status"
  value       = aws_amplify_domain_association.site.certificate_verification_dns_record
}

# ── SES DNS records — add these to your registrar ────────────────────────────

output "ses_domain_verification_token" {
  description = "Add this as a TXT record on your domain to verify SES ownership: _amazonses.<domain>"
  value       = aws_ses_domain_identity.sending_domain.verification_token
}

output "ses_dkim_cname_records" {
  description = "Add these 3 CNAME records to your DNS for DKIM signing"
  value = [
    for token in aws_ses_domain_dkim.sending_domain.dkim_tokens :
    {
      name  = "${token}._domainkey.${var.domain_name}"
      value = "${token}.dkim.amazonses.com"
    }
  ]
}

# ── App IAM credentials (DynamoDB) ───────────────────────────────────────────

output "app_iam_access_key_id" {
  description = "DYNAMODB_ACCESS_KEY_ID for the app IAM user"
  value       = aws_iam_access_key.app.id
}

output "app_iam_secret_access_key" {
  description = "DYNAMODB_SECRET_ACCESS_KEY for the app IAM user"
  value       = aws_iam_access_key.app.secret
  sensitive   = true
}

# ── IAM / SES credentials — inject into Amplify env vars ─────────────────────

output "ses_iam_access_key_id" {
  description = "AWS_ACCESS_KEY_ID for the SES-only IAM user (already injected into Amplify env vars)"
  value       = aws_iam_access_key.ses_sender.id
}

output "ses_iam_secret_access_key" {
  description = "AWS_SECRET_ACCESS_KEY for the SES-only IAM user (already injected into Amplify env vars)"
  value       = aws_iam_access_key.ses_sender.secret
  sensitive   = true
}
