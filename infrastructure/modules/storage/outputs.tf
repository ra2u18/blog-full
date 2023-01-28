output "web-client-domain-name" {
  value = aws_s3_bucket.web-client.bucket_domain_name
}

output "web-client-bucket-name" {
  value = aws_s3_bucket.web-client.id
}

output "web-client-website-domain" {
  value = aws_s3_bucket.web-client.website_domain
}

output "web-client-hosted-zone" {
  value = aws_s3_bucket.web-client.hosted_zone_id
}

