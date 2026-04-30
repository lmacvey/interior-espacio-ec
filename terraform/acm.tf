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

resource "aws_acm_certificate_validation" "site" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.site.arn

  validation_record_fqdns = [for record in aws_route53_record.acm_validation : record.fqdn]

  timeouts {
    create = "45m"
  }
}
