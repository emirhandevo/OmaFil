import type { Metadata } from "next";
import { CareersApplicationForm } from "@/components/sections/careers-application-form";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";
import { getCmsPage } from "@/content/pages";
import { getCopy } from "@/i18n/get-copy";
import { getInner } from "@/i18n/inner";
import { pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { pickFormMessages } from "@/lib/schemas/contact";

// Başlık sırası: inner çevirisi, panel, en sonda Türkçe yedek.

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const page = await getCmsPage("insan-kaynaklari", locale);
  const t = getInner(locale);
  return {
    title: t?.careers.title ?? page?.title ?? "İnsan Kaynakları",
    description:
      t?.careers.description ??
      page?.description ??
      "OmaFil insan kaynakları. İş başvurusu formundan CV’nizi PDF olarak gönderin.",
    alternates: pageAlternates("/kurumsal/insan-kaynaklari", locale),
  };
}

export default async function InsanKaynaklariPage() {
  const { copy, locale } = await getCopy();
  const ui = getUi(locale);
  const page = await getCmsPage("insan-kaynaklari", locale);
  const t = getInner(locale);

  return (
    <CorporateFrame
      path="/kurumsal/insan-kaynaklari"
      title={t?.careers.title ?? page?.title ?? "İnsan Kaynakları"}
      description={
        t?.careers.description ??
        page?.description ??
        "Üretimin merkezi tesis. İnsan kaynağı da aynı ciddiyetle yönetilir."
      }
    >
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {t ? (
          <div className="prose-omafil text-body max-w-3xl space-y-5 text-base leading-8 [&_p]:leading-8">
            {t.careers.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : page?.body ? (
          <div className="prose-omafil text-body max-w-3xl space-y-5 text-base leading-8 [&_p]:leading-8">
            {page.body}
          </div>
        ) : null}

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {copy.chrome.principles.map((item) => (
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
        <h2 className="text-2xl font-semibold tracking-tight">{copy.chrome.applyTitle}</h2>
        <p className="text-body mt-3 max-w-2xl text-base leading-8">
          {copy.chrome.applyLead}
        </p>
        <div className="mt-8 max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <CareersApplicationForm
            form={pickFormMessages(ui.form)}
            notice={ui.kvkkCareers}
          />
        </div>
      </section>
    </CorporateFrame>
  );
}
