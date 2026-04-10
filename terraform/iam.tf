# Least-privilege IAM user — can only send email via SES, nothing else
resource "aws_iam_user" "ses_sender" {
  name = "interior-espacio-ses-sender"
  path = "/apps/"

  tags = {
    app = "interior-espacio-ec"
  }
}

resource "aws_iam_user_policy" "ses_send_only" {
  name = "SESendEmailOnly"
  user = aws_iam_user.ses_sender.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowSESSendEmail"
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = [
          aws_ses_domain_identity.sending_domain.arn
        ]
      }
    ]
  })
}

resource "aws_iam_access_key" "ses_sender" {
  user = aws_iam_user.ses_sender.name
}

# App IAM user — DynamoDB access for Substack→Facebook dedup store
resource "aws_iam_user" "app" {
  name = "interior-espacio-app"
  path = "/apps/"

  tags = {
    app = "interior-espacio-ec"
  }
}

resource "aws_iam_user_policy" "app_dynamodb" {
  name = "DynamoDBSubstackPosts"
  user = aws_iam_user.app.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowSubstackPostsReadWrite"
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
        ]
        Resource = [aws_dynamodb_table.substack_posts.arn]
      }
    ]
  })
}

resource "aws_iam_access_key" "app" {
  user = aws_iam_user.app.name
}
