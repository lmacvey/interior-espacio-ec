# ACM certificate — must be in us-east-1 for CloudFront/Amplify compatibility
# Provider alias "us_east_1" is declared in main.tf
resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = var.enable_www_subdomain ? ["www.${var.domain_name}"] : []
  validation_method         = "DNS"

  lifecycle {
    # Create new cert before destroying the old one to avoid downtime
    create_before_destroy = true
  }
}

# Deduplicated DNS validation records (root + www share records when same domain)
locals {
  acm_validation_records = {
    for dvo in aws_acm_certificate.site.domain_validation_options :
    dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}

# NOTE: Validation is not automated here because DNS is managed at an external
# registrar. Add the records from output.acm_validation_dns_records to your
# registrar, then run: terraform apply (the certificate will validate automatically
# once DNS propagates — up to 30 minutes).
resource "aws_acm_certificate_validation" "site" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.site.arn

  # No validation_record_fqdns — we rely on DNS propagation after manual record entry
  timeouts {
    create = "45m"
  }
}
