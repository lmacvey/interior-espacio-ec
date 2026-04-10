# IAM role that allows EventBridge Scheduler to invoke the API Destination
resource "aws_iam_role" "eventbridge_scheduler" {
  name = "interior-espacio-eventbridge-scheduler"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "scheduler.amazonaws.com" }
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
        Resource = [aws_cloudwatch_event_api_destination.substack_sync.arn]
      }
    ]
  })
}

# Connection — stores the X-Cron-Secret header credential
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

# Schedule group
resource "aws_scheduler_schedule_group" "app" {
  name = "interior-espacio"

  tags = {
    app = "interior-espacio-ec"
  }
}

# Hourly schedule — fires every hour, no flexible window
resource "aws_scheduler_schedule" "substack_sync" {
  name       = "substack-facebook-sync"
  group_name = aws_scheduler_schedule_group.app.name

  flexible_time_window {
    mode = "OFF"
  }

  schedule_expression = "rate(1 hour)"

  target {
    arn      = aws_cloudwatch_event_api_destination.substack_sync.arn
    role_arn = aws_iam_role.eventbridge_scheduler.arn

    input = "{}"

    retry_policy {
      maximum_retry_attempts = 2
    }
  }
}
