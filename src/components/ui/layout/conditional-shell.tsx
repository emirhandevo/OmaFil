"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteShell } from "@/components/ui/layout/site-shell";
import type { ContactData } from "@/content/cms";

type ConditionalShellProps = {
  children: ReactNode;
  contact: ContactData;
  footerTagline: string;
};

/**
 * /keystatic Admin UI’da Header/Footer olmasın.
 * İletişim verisi layout’tan (sunucu) gelir — client shell async fetch yapamaz.
 */
export function ConditionalShell({
  children,
  contact,
  footerTagline,
}: ConditionalShellProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/keystatic")) {
    return <>{children}</>;
  }
  return (
    <SiteShell contact={contact} footerTagline={footerTagline}>
      {children}
    </SiteShell>
  );
}
