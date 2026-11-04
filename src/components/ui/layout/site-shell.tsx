import type { ReactNode } from "react";
import { Header } from "@/components/ui/layout/header";
import { Footer } from "@/components/ui/layout/footer";
import { SmoothNav } from "@/components/ui/layout/smooth-nav";
import { YarnChat } from "@/components/sections/yarn-chat";
import { BackToTop } from "@/components/ui/layout/back-to-top";
import type { ContactData } from "@/content/cms";

type SiteShellProps = {
  children: ReactNode;
  contact: ContactData;
  footerTagline: string;
  logo: string;
  logoDark: string;
  places: readonly [string, string, string];
};

/**
 * Tüm sitede tek Header/Footer.
 * Sayfa geçişlerinde remount olmaz → VT ile sabit kalırlar.
 * Sohbet de burada: sayfa değişince kapanmaz, panel sayfasında yok.
 */
export function SiteShell({
  children,
  contact,
  footerTagline,
  logo,
  logoDark,
  places,
}: SiteShellProps) {
  return (
    <>
      <SmoothNav />
      <Header logo={logo} logoDark={logoDark} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer
        contact={contact}
        footerTagline={footerTagline}
        logo={logo}
        logoDark={logoDark}
        places={places}
      />
      <BackToTop />
      <YarnChat />
    </>
  );
}