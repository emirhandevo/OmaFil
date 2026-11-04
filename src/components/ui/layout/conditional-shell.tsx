"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteShell } from "@/components/ui/layout/site-shell";
import type { ContactData } from "@/content/cms";

type ConditionalShellProps = {
  children: ReactNode;
  contact: ContactData;
  footerTagline: string;
  logo: string;
  logoDark: string;
  places: readonly [string, string, string];
};

/**
 * /keystatic Admin UI’da Header/Footer olmasın.
 * İletişim verisi layout’tan (sunucu) gelir — client shell async fetch yapamaz.
 */
export function ConditionalShell({
  children,
  contact,
  footerTagline,
  logo,
  logoDark,
  places,
}: ConditionalShellProps) {
  const pathname = usePathname();
  // Panel ve sohbet kayıtları site kabuğunun dışında. Dil öneki de aynı.
  const path = pathname ?? "";
  if (
    path.startsWith("/keystatic") ||
    path === "/sohbet-kayitlari" ||
    path.endsWith("/sohbet-kayitlari")
  ) {
    return <>{children}</>;
  }
  return (
    <SiteShell
      contact={contact}
      footerTagline={footerTagline}
      logo={logo}
      logoDark={logoDark}
      places={places}
    >
      {children}
    </SiteShell>
  );
}
