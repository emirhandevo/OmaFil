import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image quality={80|82} uyarılarını keser; 75 varsayılan kalsın
  images: {
    qualities: [75, 80, 82, 90, 92, 95],
  },
  // Keystatic reader / route handler Node API
  serverExternalPackages: ["@keystatic/core", "@keystatic/next"],
};

export default nextConfig;
