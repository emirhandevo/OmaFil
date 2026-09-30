import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image quality={80|82} uyarılarını keser; 75 varsayılan kalsın
  images: {
    qualities: [75, 80, 82, 90, 92, 95],
  },
  // Keystatic reader / route handler Node API
  serverExternalPackages: ["@keystatic/core", "@keystatic/next"],
  // keystatic jsonları vercel fonksiyonuna girsin. yoksa ürün listesi boş kalır
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  // Tarayıcı bu hostu 2 yıl yalnızca HTTPS açar. Alt alan adları da dahil.
  // preload yok: tarayıcı listesine girmek geri alınması zor.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            // başka site bu sayfayı iframe içerisine alamaz. 
            key: "X-Frame-Options",
            value: "DENY"
          }
        ],
      },
    ];
  },
};

export default nextConfig;