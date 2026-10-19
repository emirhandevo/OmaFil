import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { ConditionalShell } from "@/components/ui/layout/conditional-shell";
import { getContact, getSiteSettings } from "@/content/cms";
import { site } from "@/config/site";
import { getLocale } from "@/i18n/get-locale";
import { htmlLang, ogLocale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { buildThemeBootScript } from "@/lib/theme-calculator";
import "./globals.css";

// Türkçe karakterler için latin-ext
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
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

export async function generateMetadata(): Promise<Metadata> {
  const [settings, locale] = await Promise.all([
    getSiteSettings(),
    getLocale(),
  ]);
  const ui = getUi(locale);
  const description =
    locale === "tr" ? settings.description : ui.homeDescription;

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      siteName: site.name,
      title: site.name,
      description,
      images: [
        {
          url: "/images/og.webp",
          width: 1200,
          height: 630,
          alt: ui.ogAlt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description,
      images: ["/images/og.webp"],
    },
  };
}

// React hydrate olmadan önce. Gündoğumu/günbatımı veya 3 saatlik önbellek.
const themeScript = buildThemeBootScript();

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [contact, settings, locale] = await Promise.all([
    getContact(),
    getSiteSettings(),
    getLocale(),
  ]);

  return (
    <html
      lang={htmlLang(locale)}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col overflow-x-hidden bg-background text-foreground"
      >
        {/* Dil, proxy’nin x-locale başlığından gelir. tr kök URL’de kalır. */}
        <LocaleProvider locale={locale}>
          <ConditionalShell
            contact={contact}
            footerTagline={settings.footerTagline}
          >
            {children}
          </ConditionalShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
