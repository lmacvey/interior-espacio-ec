resource "aws_route53_zone" "site" {
  name = var.domain_name
  tags = { app = "interior-espacio-ec" }
}

# ── ACM validation CNAMEs (auto-populated from acm.tf locals) ─────────────────

resource "aws_route53_record" "acm_validation" {
  for_each = local.acm_validation_records

  zone_id = aws_route53_zone.site.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 300
  records = [each.value.value]

  allow_overwrite = true
}

# ── SES domain verification TXT ───────────────────────────────────────────────

resource "aws_route53_record" "ses_verification" {
  zone_id = aws_route53_zone.site.zone_id
  name    = "_amazonses.${var.domain_name}"
  type    = "TXT"
  ttl     = 300
  records = [aws_ses_domain_identity.sending_domain.verification_token]
}

# ── SES DKIM CNAMEs (3 tokens) ────────────────────────────────────────────────

resource "aws_route53_record" "ses_dkim" {
  count = 3

  zone_id = aws_route53_zone.site.zone_id
  name    = "${aws_ses_domain_dkim.sending_domain.dkim_tokens[count.index]}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = ["${aws_ses_domain_dkim.sending_domain.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

# ── Amplify — www CNAME ───────────────────────────────────────────────────────
# Root domain ALIAS will be added after aws_amplify_domain_association resolves
# (Amplify provides the correct zone ID + DNS name via the domain association).

resource "aws_route53_record" "amplify_www" {
  zone_id = aws_route53_zone.site.zone_id
  name    = "www.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = ["main.${aws_amplify_app.site.default_domain}"]
}

# ── Microsoft 365 ─────────────────────────────────────────────────────────────

resource "aws_route53_record" "mx" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "MX"
  ttl     = 3600
  records = ["0 espaciointeriorec-com.mail.protection.outlook.com."]
}

resource "aws_route53_record" "autodiscover" {
  zone_id = aws_route53_zone.site.zone_id
  name    = "autodiscover.${var.domain_name}"
  type    = "CNAME"
  ttl     = 1800
  records = ["autodiscover.outlook.com."]
}

# ── TXT records ───────────────────────────────────────────────────────────────

resource "aws_route53_record" "txt" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "TXT"
  ttl     = 1800
  records = [
    "v=spf1 include:spf.protection.outlook.com include:amazonses.com -all",
    "MS=ms70709444",
    "pinterest-site-verification=2d3e1912d1101fb98c96d539829011b9",
  ]
}
