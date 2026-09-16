import type { Metadata } from "next";
import { Header } from "@/components/ui/layout/header";
import { Footer } from "@/components/ui/layout/footer";
import { CorporatePage } from "@/components/sections/corporate-page";

// title template layout'ta: "Kurumsal | OmaFil İplik..."
export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "OmaFil'in kuruluş hikâyesi, iplik ithalatı, üretimi ve ihracatındaki kurumsal yapısı.",
};

export default function KurumsalPage() {
  return (
    <>
      <Header />
      <main>
        <CorporatePage />
      </main>
      <Footer />
    </>
  );
}