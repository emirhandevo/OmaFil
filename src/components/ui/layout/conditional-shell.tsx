"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteShell } from "@/components/ui/layout/site-shell";

/**
 * /keystatic Admin UI’da Header/Footer olmasın.
 */
export function ConditionalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/keystatic")) {
    return <>{children}</>;
  }
  return <SiteShell>{children}</SiteShell>;
}
