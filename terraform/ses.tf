# Verify the sending domain in SES
resource "aws_ses_domain_identity" "sending_domain" {
  domain = var.domain_name
}

# Generate DKIM tokens — add the 3 CNAME records output to your DNS registrar
resource "aws_ses_domain_dkim" "sending_domain" {
  domain = aws_ses_domain_identity.sending_domain.domain
}

# Verify the domain identity (waits for DNS propagation)
resource "aws_ses_domain_identity_verification" "sending_domain" {
  domain = aws_ses_domain_identity.sending_domain.id

  depends_on = [aws_ses_domain_dkim.sending_domain]

  timeouts {
    create = "30m"
  }
}

# Also verify the recipient address while in SES sandbox.
# Once production access is granted this is optional but harmless.
resource "aws_ses_email_identity" "contact_email" {
  email = var.contact_email
}

# SES sending configuration set — enables open/click tracking and bounce handling
resource "aws_ses_configuration_set" "default" {
  name = "interior-espacio-default"

  delivery_options {
    tls_policy = "Require"
  }

  reputation_metrics_enabled = true
  sending_enabled            = true
}
