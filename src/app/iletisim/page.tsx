import type { Metadata } from "next";
import { SiteShell } from "@/components/ui/layout/site-shell";
import { ContactPage } from "@/components/sections/contact-page";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "OmaFil iletişim: telefon, e-posta, genel merkez, fabrika ve satış noktası adresleri.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimRoute() {
  return (
    <SiteShell>
      <ContactPage />
    </SiteShell>
  );
}
