terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Optional: enable S3 backend for team/CI use
  # backend "s3" {
  #   bucket = "your-terraform-state-bucket"
  #   key    = "interior-espacio/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region
}

# ACM certs must live in us-east-1 to work with Amplify and CloudFront
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
