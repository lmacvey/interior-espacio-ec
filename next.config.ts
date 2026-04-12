import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Cron
    CRON_SECRET: process.env.CRON_SECRET ?? "",
    // Facebook
    FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID ?? "",
    FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN ?? "",
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID ?? "",
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET ?? "",
    INSTAGRAM_BUSINESS_ACCOUNT_ID: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID ?? "",
    // DynamoDB
    DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME ?? "",
    DYNAMODB_ACCESS_KEY_ID: process.env.DYNAMODB_ACCESS_KEY_ID ?? "",
    DYNAMODB_SECRET_ACCESS_KEY: process.env.DYNAMODB_SECRET_ACCESS_KEY ?? "",
    // SES
    SES_REGION: process.env.SES_REGION ?? "",
    SES_FROM_EMAIL: process.env.SES_FROM_EMAIL ?? "",
    SES_ACCESS_KEY_ID: process.env.SES_ACCESS_KEY_ID ?? "",
    SES_SECRET_ACCESS_KEY: process.env.SES_SECRET_ACCESS_KEY ?? "",
    // Email
    CONTACT_EMAIL: process.env.CONTACT_EMAIL ?? "",
    PRIVACY_EMAIL: process.env.PRIVACY_EMAIL ?? "",
    LEGAL_EMAIL: process.env.LEGAL_EMAIL ?? "",
    // Substack
    SUBSTACK_PUBLICATION: process.env.SUBSTACK_PUBLICATION ?? "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "substackcdn.com",
      },
      {
        protocol: "https",
        hostname: "substack-post-media.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
