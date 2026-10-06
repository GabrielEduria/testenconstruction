import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/en-construction", permanent: false },
      { source: "/solar", destination: "/en-construction/solar", permanent: true },
      { source: "/quote", destination: "/en-construction/contact", permanent: true },
    ];
  },
};

export default nextConfig;
