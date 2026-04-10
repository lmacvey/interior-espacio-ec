resource "aws_amplify_app" "site" {
  name         = "interior-espacio-ec"
  repository   = var.github_repository
  access_token = var.github_token

  # Let Amplify detect and configure Next.js automatically
  platform = "WEB_COMPUTE"

  build_spec = <<-YAML
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
  YAML

  # Environment variables injected into every build and runtime Lambda
  environment_variables = {
    NEXT_PUBLIC_SITE_URL  = var.next_public_site_url
    CONTACT_EMAIL         = var.contact_email
    SES_FROM_EMAIL        = var.ses_from_email
    FACEBOOK_PAGE_ID      = var.facebook_page_id
    NEXT_PUBLIC_INSTAGRAM_URL = var.instagram_url
    NEXT_PUBLIC_FACEBOOK_URL  = var.facebook_url
    NEXT_PUBLIC_LINKEDIN_URL  = var.linkedin_url
    NEXT_PUBLIC_WHATSAPP_NUMBER = var.whatsapp_number
    SES_REGION            = var.aws_region

    # SES IAM credentials — populated after IAM resource is created
    # These reference the IAM access key outputs defined in iam.tf
    SES_ACCESS_KEY_ID     = aws_iam_access_key.ses_sender.id
    SES_SECRET_ACCESS_KEY = aws_iam_access_key.ses_sender.secret

    # Sensitive — Amplify stores these but does not expose them in the console
    FACEBOOK_ACCESS_TOKEN                  = var.facebook_access_token
    FACEBOOK_PAGE_ACCESS_TOKEN             = var.facebook_access_token
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY     = var.next_server_actions_encryption_key

    # Substack → Facebook automation
    CRON_SECRET                = var.cron_secret
    DYNAMODB_TABLE_NAME        = aws_dynamodb_table.substack_posts.name
    DYNAMODB_ACCESS_KEY_ID     = aws_iam_access_key.app.id
    DYNAMODB_SECRET_ACCESS_KEY = aws_iam_access_key.app.secret
  }

  # Prevent Amplify from overwriting env vars set manually in the console
  enable_branch_auto_deletion = false
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.site.id
  branch_name = var.github_branch

  framework           = "Next.js - SSR"
  stage               = "PRODUCTION"
  enable_auto_build   = true

  # Enable pull-request previews (optional — remove if not wanted)
  enable_pull_request_preview = false
}

resource "aws_amplify_domain_association" "site" {
  app_id                = aws_amplify_app.site.id
  domain_name           = var.domain_name
  certificate_settings {
    type            = "CUSTOM"
    custom_certificate_arn = aws_acm_certificate_validation.site.certificate_arn
  }

  # Root domain → main branch
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # www subdomain → main branch
  dynamic "sub_domain" {
    for_each = var.enable_www_subdomain ? [1] : []
    content {
      branch_name = aws_amplify_branch.main.branch_name
      prefix      = "www"
    }
  }
}
