
# Client web

resource "aws_s3_bucket" "web-client" {
  bucket        = "${var.APP_NAME}-${var.ENV}.${var.DOMAIN}"
  acl           = "public-read"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Name = "${var.APP_NAME}-web-client-${var.ENV}"
  }

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_s3_bucket_policy" "web-client-bucket-policy" {
  bucket = aws_s3_bucket.web-client.id
  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "${var.APP_NAME}-web-client-policy-${var.ENV}"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = ["s3:GetObject"]
        Resource  = ["${aws_s3_bucket.web-client.arn}/*"]
      },
    ]
  })
}

# File bucket

resource "aws_s3_bucket" "file-bucket" {
  bucket = "${var.APP_NAME}-files-${var.ENV}"
  acl    = "private"

  tags = {
    Name = "${var.APP_NAME}-files-${var.ENV}"
  }
}
