import type { Metadata } from "next";
import { CareersApplicationForm } from "@/components/sections/careers-application-form";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";

export const metadata: Metadata = {
  title: "İnsan Kaynakları",
  description:
    "OmaFil insan kaynakları. İş başvurusu formundan CV’nizi PDF olarak gönderin.",
  alternates: { canonical: "/kurumsal/insan-kaynaklari" },
};

const principles = [
  "Adil ve şeffaf işe alım",
  "İş sağlığı ve güvenliği",
  "Eğitim ve kariyer gelişimi",
  "Eşitlik ve etik çalışma",
] as const;

export default function InsanKaynaklariPage() {
  return (
    <CorporateFrame
      path="/kurumsal/insan-kaynaklari"
      title="İnsan Kaynakları"
      description="Üretimin merkezi tesis. İnsan kaynağı da aynı ciddiyetle yönetilir."
    >
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="text-body max-w-3xl space-y-5 text-base leading-8">
          <p>
            İşe alımdan günlük çalışmaya kadar fırsat eşitliği, güvenli ortam
            ve gelişim esas. Departmanlar arası iş birliği ve tesis içi güvenli
            çalışma, politikanın uygulanan tarafı.
          </p>
          <p>
            Açık pozisyon listesi henüz bu sayfada yok. Aşağıdaki formdan CV’nizi
            PDF olarak iletebilirsiniz.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {principles.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight">Başvuru</h2>
        <p className="text-body mt-3 max-w-2xl text-base leading-8">
          Formu doldurun, CV’nizi PDF yükleyin. Başvurunuz doğrudan İK ekibine
          iletilir; size kısa bir onay e-postası gider.
        </p>
        <div className="mt-8 max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <CareersApplicationForm />
        </div>
      </section>
    </CorporateFrame>
  );
}
