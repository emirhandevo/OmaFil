"use client";

import { useEffect } from "react";
import { StatusScreen } from "@/components/sections/status-screen";
import { useLocale } from "@/components/i18n/locale-provider";
import { statusCopy } from "@/i18n/status";

/** Sayfa çökünce. Geliştirmede Next kendi örtüsünü basar; canlıda bu ekran görünür. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const text = statusCopy[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      code="500"
      title={text.errorTitle}
      text={text.errorText}
      homeLabel={text.home}
      retryLabel={text.retry}
      onRetry={reset}
    />
  );
}
