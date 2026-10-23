import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["127.0.0.1"],
  // Server action varsayılanı 1 MB. CV 4 MB; form alanları da eklenince gövde 1 MB'ı aşar.
  // 4.5 MB: 4 MB'lık PDF içeri girer, daha büyüğü careers.ts içindeki kontrolde kalır.
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
  },
  // Image quality={80|82} uyarılarını keser; 75 varsayılan kalsın
  images: {
    qualities: [75, 80, 82, 90, 92, 95],
  },
  // Keystatic reader / route handler Node API
  serverExternalPackages: ["@keystatic/core", "@keystatic/next"],
  // Turbopack bu glob’u yutuyor; webpack build + geniş rota. Vercel’de YAML yoksa 500.
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
    "/*": ["./content/**/*"],
    "/**": ["./content/**/*"],
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
   "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
"img-src 'self' data: blob: https://avatars.githubusercontent.com",
"font-src 'self' https://fonts.gstatic.com",
"media-src 'self'",
// Panel, GitHub uygulamasını bu forma POST ederek kurar.
"connect-src 'self' https://challenges.cloudflare.com https://api.github.com",
"frame-src https://challenges.cloudflare.com",
"worker-src 'self' blob:",
"object-src 'none'",
"base-uri 'self'",
"form-action 'self' https://github.com",
      "frame-ancestors 'none'",
    ].join("; ");

    return [
      {
        // VTT, nosniff açıkken text/vtt olmazsa tarayıcı altyazıyı yüklemez.
        source: "/videos/:file.vtt",
        headers: [
          {
            key: "Content-Type",
            value: "text/vtt; charset=utf-8",
          },
        ],
      },
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
