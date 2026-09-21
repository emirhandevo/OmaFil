import type { ReactNode } from "react";
import { Header } from "@/components/ui/layout/header";
import { Footer } from "@/components/ui/layout/footer";
import { SmoothNav } from "@/components/ui/layout/smooth-nav";

/**
 * Tüm sitede tek Header/Footer.
 * Sayfa geçişlerinde remount olmaz → VT ile sabit kalırlar.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothNav />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
