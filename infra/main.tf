provider "aws" {
  version = "~> 2.23"
  region  = "us-east-1"
}

resource "aws_key_pair" "deployer" {
  key_name   = "developer-key"
  public_key = var.public_key
}
