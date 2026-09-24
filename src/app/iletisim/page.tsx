import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/contact-page";
import { getCopy } from "@/i18n/get-copy";
import { pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const seo = getUi(locale).seo;
  return {
    title: seo.contactTitle,
    description: seo.contact,
    alternates: pageAlternates("/iletisim", locale),
  };
}

export default function IletisimRoute() {
  return <ContactPage />;
}
