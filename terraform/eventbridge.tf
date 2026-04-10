# IAM role that allows EventBridge to invoke the API Destination
resource "aws_iam_role" "eventbridge_scheduler" {
  name = "interior-espacio-eventbridge-scheduler"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "events.amazonaws.com" }
        Action    = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    app = "interior-espacio-ec"
  }
}

resource "aws_iam_role_policy" "eventbridge_scheduler_invoke" {
  name = "InvokeApiDestination"
  role = aws_iam_role.eventbridge_scheduler.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["events:InvokeApiDestination"]
        Resource = ["arn:aws:events:${var.aws_region}:*:api-destination/*"]
      }
    ]
  })
}

# Connection — stores the X-Cron-Secret header credential in Secrets Manager
resource "aws_cloudwatch_event_connection" "substack_sync" {
  name               = "interior-espacio-cron-secret"
  authorization_type = "API_KEY"

  auth_parameters {
    api_key {
      key   = "X-Cron-Secret"
      value = var.cron_secret
    }
  }
}

# API Destination — points to the Next.js cron endpoint
resource "aws_cloudwatch_event_api_destination" "substack_sync" {
  name                             = "interior-espacio-substack-sync"
  connection_arn                   = aws_cloudwatch_event_connection.substack_sync.arn
  invocation_endpoint              = "https://${var.domain_name}/api/cron/substack-sync"
  http_method                      = "POST"
  invocation_rate_limit_per_second = 1
}

# Hourly EventBridge rule (classic rules work natively with API Destinations)
resource "aws_cloudwatch_event_rule" "substack_sync_hourly" {
  name                = "interior-espacio-substack-sync-hourly"
  description         = "Trigger Substack → Facebook sync every hour"
  schedule_expression = "rate(1 hour)"
  state               = "ENABLED"

  tags = {
    app = "interior-espacio-ec"
  }
}

resource "aws_cloudwatch_event_target" "substack_sync" {
  rule      = aws_cloudwatch_event_rule.substack_sync_hourly.name
  target_id = "SubstackSyncApiDestination"
  arn       = aws_cloudwatch_event_api_destination.substack_sync.arn
  role_arn  = aws_iam_role.eventbridge_scheduler.arn
}
