import type { Metadata } from "next";
import { CareersApplicationForm } from "@/components/sections/careers-application-form";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";
import { getCmsPage } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("insan-kaynaklari");
  return {
    title: page?.title ?? "İnsan Kaynakları",
    description:
      page?.description ??
      "OmaFil insan kaynakları. İş başvurusu formundan CV’nizi PDF olarak gönderin.",
    alternates: { canonical: "/kurumsal/insan-kaynaklari" },
  };
}

const principles = [
  "Adil ve şeffaf işe alım",
  "İş sağlığı ve güvenliği",
  "Eğitim ve kariyer gelişimi",
  "Eşitlik ve etik çalışma",
] as const;

export default async function InsanKaynaklariPage() {
  const page = await getCmsPage("insan-kaynaklari");

  return (
    <CorporateFrame
      path="/kurumsal/insan-kaynaklari"
      title={page?.title ?? "İnsan Kaynakları"}
      description={
        page?.description ??
        "Üretimin merkezi tesis. İnsan kaynağı da aynı ciddiyetle yönetilir."
      }
    >
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {page?.body ? (
          <div className="prose-omafil text-body max-w-3xl space-y-5 text-base leading-8 [&_p]:leading-8">
            {page.body}
          </div>
        ) : null}

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
