import type { ReactNode } from "react";
import { Header } from "@/components/ui/layout/header";
import { Footer } from "@/components/ui/layout/footer";

/**
 * İç sayfaların ortak iskeleti.
 * Header ve Footer'ı her page.tsx'te tekrar yazmamak için.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
