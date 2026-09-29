import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/program/:id",
        destination: "/program-detail/:id",
      },
      {
        source: "/teachers/:id",
        destination: "/teacher-detail/:id",
      },
    ];
  },
};

export default nextConfig;
