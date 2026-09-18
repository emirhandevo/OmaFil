import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image quality={80|82} uyarılarını keser; 75 varsayılan kalsın
  images: {
    qualities: [75, 80, 82],
  },
};

export default nextConfig;
