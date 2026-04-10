resource "aws_dynamodb_table" "substack_posts" {
  name         = "interior-espacio-substack-posts"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "substackPostId"

  attribute {
    name = "substackPostId"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = {
    app = "interior-espacio-ec"
  }
}
