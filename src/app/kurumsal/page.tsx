import type { Metadata } from "next";
import Link from "next/link";
import { corporateLinks } from "@/config/site";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "OmaFil kurumsal sayfaları: hakkımızda, fabrikamız, sürdürülebilirlik ve insan kaynakları.",
  alternates: { canonical: "/kurumsal" },
};

export default function KurumsalPage() {
  return (
    <CorporateFrame
      path="/kurumsal"
      title="Kurumsal"
      description="Şirket yapımız dört başlıkta durur. Detay her sayfanın kendi adresindedir."
    >
      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 sm:grid-cols-2">
        {corporateLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand-orange"
          >
            <h2 className="text-xl font-semibold">{item.label}</h2>
            <p className="mt-2 leading-7 text-muted-foreground">{item.summary}</p>
          </Link>
        ))}
      </section>
    </CorporateFrame>
  );
}
