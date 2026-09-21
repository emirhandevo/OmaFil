import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/ui/layout/site-shell";
import { site } from "@/config/site";
import "./globals.css";

// Türkçe karakterler için latin-ext
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// WhatsApp/Telegram: VERCEL_URL geçici deploy adresi; crawler açamayınca favicon’a düşer.
// Production alias (omafil.vercel.app) kullan.
function getMetadataBase() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  // Yerel geliştirme veya bilinmeyen ortam
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  // Canlı Next henüz omafil.com’da değil; paylaşım için Vercel alias
  return new URL("https://omafil.vercel.app");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // opengraph-image.jpg / twitter-image.jpg app/ altında otomatik bağlanır
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.name,
    description: site.description,
    // Sabit public yol — WhatsApp bazen app/ özel OG query’sini sevmiyor
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "OmaFil üretim tesisi",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/og.jpg"],
  },
};

// theme: light | dark | auto. Kayıt yoksa / auto → 07–19 light, gece dark.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var dark;if(t==="light"){dark=false}else if(t==="dark"){dark=true}else{var h=new Date().getHours();dark=!(h>=7&&h<19)}document.documentElement.classList.toggle("dark",dark)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
