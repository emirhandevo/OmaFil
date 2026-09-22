import type { ReactNode } from "react";
import { Header } from "@/components/ui/layout/header";
import { Footer } from "@/components/ui/layout/footer";
import { SmoothNav } from "@/components/ui/layout/smooth-nav";
import type { ContactData } from "@/content/cms";

type SiteShellProps = {
  children: ReactNode;
  contact: ContactData;
  footerTagline: string;
};

/**
 * Tüm sitede tek Header/Footer.
 * Sayfa geçişlerinde remount olmaz → VT ile sabit kalırlar.
 */
export function SiteShell({ children, contact, footerTagline }: SiteShellProps) {
  return (
    <>
      <SmoothNav />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer contact={contact} footerTagline={footerTagline} />
    </>
  );
}
