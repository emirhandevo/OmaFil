import type { Metadata } from "next";
import { contact } from "@/config/site";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";

export const metadata: Metadata = {
  title: "İnsan Kaynakları",
  description:
    "OmaFil insan kaynakları politikası. İş başvurusu için info@omafil.com adresine CV gönderin.",
  alternates: { canonical: "/kurumsal/insan-kaynaklari" },
};

const principles = [
  "Adil ve şeffaf işe alım",
  "İş sağlığı ve güvenliği",
  "Eğitim ve kariyer gelişimi",
  "Eşitlik ve etik çalışma",
] as const;

export default function InsanKaynaklariPage() {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent("İş başvurusu")}`;

  return (
    <CorporateFrame
      path="/kurumsal/insan-kaynaklari"
      title="İnsan Kaynakları"
      description="Üretimin merkezi tesis. İnsan kaynağı da aynı ciddiyetle yönetilir."
    >
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="max-w-3xl space-y-5 leading-7 text-muted-foreground">
          <p>
            İşe alımdan günlük çalışmaya kadar fırsat eşitliği, güvenli ortam
            ve gelişim esas. Departmanlar arası iş birliği ve tesis içi güvenli
            çalışma, politikanın uygulanan tarafı.
          </p>
          <p>
            Açık pozisyon listesi henüz bu sayfada yok. Başvuru dosyası doğrudan
            e-posta ile alınır.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {principles.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight">Başvuru</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          CV’nizi PDF olarak {contact.email} adresine gönderin. Konu satırına
          başvurmak istediğiniz pozisyonu yazın.
        </p>
        <a
          href={mailto}
          className="mt-6 inline-flex rounded-full bg-brand-orange px-5 py-3 text-sm font-medium text-white"
        >
          Başvuru maili aç
        </a>
      </section>
    </CorporateFrame>
  );
}
