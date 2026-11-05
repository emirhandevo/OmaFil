"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/components/i18n/locale-provider";
import { localizePath } from "@/i18n/locales";

type LocaleLinkProps = ComponentProps<typeof Link>;

/**
 * İç linke aktif dili ekler. /urunlerimiz + en → /en/urunlerimiz.
 * mailto, tel ve dış adreslere dokunmaz.
 */
export function LocaleLink({ href, prefetch = true, ...props }: LocaleLinkProps) {
  const locale = useLocale();
  const nextHref =
    typeof href === "string" && href.startsWith("/")
      ? localizePath(href, locale)
      : href;

  // prefetch true: sayfanın tamamı önceden iner ve kısa süre önbellekte kalır.
  return <Link href={nextHref} prefetch={prefetch} {...props} />;
}
