import type { Metadata } from "next";
import { StatusScreen } from "@/components/sections/status-screen";
import { getLocale } from "@/i18n/get-locale";
import { statusCopy } from "@/i18n/status";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: statusCopy[locale].notFoundTitle };
}

/** Olmayan adres. Header ve footer layout’tan gelir. */
export default async function NotFound() {
  const locale = await getLocale();
  const text = statusCopy[locale];

  return (
    <StatusScreen
      code="404"
      title={text.notFoundTitle}
      text={text.notFoundText}
      homeLabel={text.home}
    />
  );
}
