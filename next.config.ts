import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
