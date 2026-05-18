import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Autorisez les domaines externes pour les images AliExpress/CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ae01.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "**.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "ae-pic-a1.aliexpress-media.com",
      },
      {
        protocol: "https",
        hostname: "**.aliexpress-media.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Ajoutez ici d'autres domaines si nécessaire
    ],
  },
};

export default nextConfig;
