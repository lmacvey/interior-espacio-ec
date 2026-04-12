import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CRON_SECRET: process.env.CRON_SECRET ?? "",
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
