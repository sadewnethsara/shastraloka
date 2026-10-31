import type { NextConfig } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  allowedDevOrigins: [
    "ais-dev-hndh2iqljqv4cnk7puwjcr-769444383066.asia-southeast1.run.app",
    "ais-pre-hndh2iqljqv4cnk7puwjcr-769444383066.asia-southeast1.run.app",
    "*.run.app",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(self)",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "assets.shastraloka.lk",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rasakatha.lk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "grantha.lk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sarasavi.lk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.sarasavi.lk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mdgunasena.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: "/api/backend/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
