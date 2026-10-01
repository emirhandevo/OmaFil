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
    // Tema scripti ve Next'in kendi satır içi scripti var. O yüzden 'unsafe-inline'.
    // 'unsafe-eval' yalnız yerelde: Turbopack sıcak yenileme eval kullanır. Canlıda yok.
    const isDev = process.env.NODE_ENV === "development";
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      "https://challenges.cloudflare.com",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ].join(" ");

    const csp = [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "media-src 'self'",
      "connect-src 'self' https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ");

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
            value: "DENY",
          },
          {
            // Tarayıcı dosya türünü tahmin etmesin. sunucunun yazdığı türe uysun.
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Script, resim, video ve Turnstile yalnız bu listedeki adreslerden gelsin.
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
