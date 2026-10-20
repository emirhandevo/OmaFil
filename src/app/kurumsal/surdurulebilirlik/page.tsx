import type { Metadata } from "next";
import Image from "next/image";
import { LocaleLink } from "@/components/i18n/locale-link";
import {
  Droplets,
  Leaf,
  Recycle,
  Sprout,
  Sun,
  TreePine,
} from "lucide-react";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";
import { getCmsPage } from "@/content/pages";
import { getSustainBlocks } from "@/content/sections";
import { site } from "@/config/site";
import { getCopy } from "@/i18n/get-copy";
import { getInner } from "@/i18n/inner";
import { pageAlternates } from "@/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const page = await getCmsPage("surdurulebilirlik", locale);
  const t = getInner(locale);
  return {
    title: t?.sustain.title ?? page?.title ?? "Sürdürülebilirlik",
    description:
      t?.sustain.description ??
      page?.description ??
      "OmaFil sürdürülebilirlik: GES, GRS belgeli recycle iplik, bio-bazlı polyamid ve Dope Dyed.",
    alternates: pageAlternates("/kurumsal/surdurulebilirlik", locale),
  };
}

const principles = [
  {
    title: "Kaynakları akılcı kullanmak",
    text: "Çevre ve doğadaki kaynakların tükenebilir olduğu bilinciyle üretimde verimliliği esas alırız. Ekosistemlerin bütünlüğü ve esnekliği korunur.",
  },
  {
    title: "Ekonomik büyüme + çevre dengesi",
    text: "Çevreye zarar vermeden, toplumları refaha kavuşturacak ekonomik büyümeyi hedefleriz. Mal ve hizmet üretimi artarken insan refahı yükselir.",
  },
  {
    title: "Şirket ve toplumsal çıkar birliği",
    text: "Sadece ekonomik büyüme değil; sosyal ve çevre konuları da yönetim anlayışımızın parçasıdır. Şirket çıkarları toplumsal çıkarlarla çatışmaz.",
  },
] as const;

const yarnSolutions = [
  {
    title: "Recycle İplikler",
    text: "Geri dönüştürülmüş kaynaklardan geliştirilen çevre dostu iplik çözümleri. 2023’te GRS belgesi ile üretim süreçlerimiz belgelendi.",
    icon: Recycle,
    tone: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Bio-bazlı Polyamid İplik",
    text: "Fosil kaynak kullanımını azaltmayı hedefleyen bio-bazlı polyamid iplik. Performanstan ödün vermeden daha düşük çevresel etki.",
    icon: Sprout,
    tone: "bg-lime-500/15 text-lime-700 dark:text-lime-400",
  },
  {
    title: "Dope Dyed",
    text: "Su tüketimini azaltmaya odaklanan yenilikçi susuz boyama teknolojisi. Kaynak tasarrufu üretim hattının içinde başlar.",
    icon: Droplets,
    tone: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  },
] as const;

const gesHighlights = [
  {
    title: "%100 temiz enerji hedefi",
    text: "Üretim hatlarımızda kullanılan elektriğin büyük bir kısmını, doğrudan çatımızdaki yüksek verimli güneş panellerinden elde ediyoruz.",
    icon: Sun,
  },
  {
    title: "Daha az karbon ayak izi",
    text: "Fosil yakıtlara bağımlılığı azaltarak her yıl binlerce ağacın doğaya sağladığı oksijene eşdeğer karbon tasarrufu sağlamayı hedefliyoruz.",
    icon: TreePine,
  },
  {
    title: "Yeşil sanayi öncülüğü",
    text: "Sektörümüzde sürdürülebilir enerji dönüşümüne öncülük ederek gelecek nesillere daha yaşanabilir bir dünya bırakmayı amaçlıyoruz.",
    icon: Leaf,
  },
] as const;

const certificates = ["GRS", "ISO 9001", "OEKO-TEX"] as const;

export default async function SurdurulebilirlikPage() {
  const { locale } = await getCopy();
  const [page, cms] = await Promise.all([
    getCmsPage("surdurulebilirlik", locale),
    getSustainBlocks(locale),
  ]);
  const t = getInner(locale);
  const f = cms.filled;
  const principleItems = principles.map((item, i) => ({
    ...item,
    title: cms.principles[i]?.title || t?.sustain.principles[i]?.title || item.title,
    text: cms.principles[i]?.text || t?.sustain.principles[i]?.text || item.text,
  }));
  const yarnItems = yarnSolutions.map((item, i) => ({
    ...item,
    title: cms.yarns[i]?.title || t?.sustain.yarns[i]?.title || item.title,
    text: cms.yarns[i]?.text || t?.sustain.yarns[i]?.text || item.text,
  }));
  const gesItems = gesHighlights.map((item, i) => ({
    ...item,
    title: cms.gesItems[i]?.title || t?.sustain.gesItems[i]?.title || item.title,
    text: cms.gesItems[i]?.text || t?.sustain.gesItems[i]?.text || item.text,
  }));

  return (
    <CorporateFrame
      path="/kurumsal/surdurulebilirlik"
      title={t?.sustain.title ?? page?.title ?? "Sürdürülebilirlik"}
      description={
        t?.sustain.description ??
        page?.description ??
        "Tüm üretim süreçlerine sosyal ve çevresel sürdürülebilirliği dahil etmeye kararlıyız."
      }
    >
      {/* Giriş */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 lg:grid-cols-2 lg:gap-14">
        {t ? (
          <div className="prose-omafil text-body max-w-xl space-y-5 text-base leading-8 [&_p]:leading-8">
            {t.sustain.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : page?.body ? (
          <div className="prose-omafil text-body max-w-xl space-y-5 text-base leading-8 [&_p]:leading-8">
            {page.body}
          </div>
        ) : (
          <div />
        )}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Image
            src={cms.worldImage}
            alt={f.worldAlt || t?.sustain.worldAlt || "Ormanla kaplı dünya görseli"}
            fill
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-contain"
          />
        </div>
      </section>

      {/* Neden önemli — light’ta net bant */}
      <section
        className="border-y border-border bg-muted py-14 sm:py-16"
        aria-labelledby="why-title"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="why-title"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {f.whyBefore || t?.sustain.whyBefore || "Sürdürülebilirlik"}{" "}
            <span className="text-brand-orange">
              {f.whyAccent || t?.sustain.whyAccent || "neden önemlidir?"}
            </span>
          </h2>
          <div className="text-body mt-6 max-w-3xl space-y-4 text-base leading-8">
            <p>
              {cms.why[0] ||
                t?.sustain.why[0] ||
                "Sanayi devrimiyle artan enerji ihtiyacı, petrol ve kömür gibi yenilenemeyen kaynakların yoğun kullanımına yol açtı. Hızlı sanayileşme ve şehirleşme; hava, su ve toprak kirliliğini büyüttü; biyoçeşitlilikte azalma, toprak kaybı ve çölleşme gibi sorunları derinleştirdi."}
            </p>
            <p>
              {cms.why[1] ||
                t?.sustain.why[1] ||
                "Bütün canlılar birbirleriyle ve cansız varlıklarla etkileşim içinde oldukları bir ekosistemin parçasıdır. Ekosistemin bir parçası zarar görürse diğer bölümlerde de sonuçları görülür. Bu nedenle doğal çevrenin kendini iyileştirme hızını aşmadan, dengeyi bozmadan hareket etmek zorunludur."}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principleItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="font-semibold text-brand-navy dark:text-foreground">
                  {item.title}
                </h3>
                <p className="text-body mt-3 text-sm leading-7">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sürdürülebilir iplikler */}
      <section
        className="mx-auto max-w-6xl px-4 py-14 sm:py-16"
        aria-labelledby="yarns-title"
      >
        <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
          {f.yarnKicker || t?.sustain.yarnKicker || "Çevreci teknolojiler"}
        </p>
        <h2
          id="yarns-title"
          className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {f.yarnTitle || t?.sustain.yarnTitle || "Sürdürülebilir iplikler"}
        </h2>
        <p className="text-body mt-4 max-w-3xl text-base leading-8">
          {site.legalName}{" "}
          {f.yarnLead ||
            t?.sustain.yarnLead ||
            "daha iyi bir dünya için tüm üretim süreçlerine sosyal ve çevresel sürdürülebilirliği dahil eder."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {yarnItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:border-brand-orange hover:shadow-md"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-xl ${item.tone}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-brand-orange">
                  {item.title}
                </h3>
                <p className="text-body mt-3 text-sm leading-7">{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-muted px-5 py-4 shadow-sm">
          <span className="text-sm font-semibold text-foreground">
            {f.certs || t?.sustain.certs || "Sertifikalar"}
          </span>
          {certificates.map((cert) => (
            <span
              key={cert}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold tracking-wide text-foreground"
            >
              {cert}
            </span>
          ))}
        </div>
      </section>

      {/* GES — navy üzerinde light marka turuncusu soluk kalmasın diye #f19000 */}
      <section
        className="border-t border-border bg-brand-navy py-14 text-white sm:py-16"
        aria-labelledby="ges-title"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-[#f19000] uppercase">
              {f.gesKicker || t?.sustain.gesKicker || "Güneş enerji sistemi"}
            </p>
            <h2
              id="ges-title"
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {f.gesTitle ||
                t?.sustain.gesTitle ||
                "Geleceğe değer katıyoruz, üretimi güneşten alıyoruz"}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/90">
              {cms.gesP[0] ||
                t?.sustain.gesP[0] ||
                "Sadece bugünün ihtiyaçlarını karşılayan kaliteli üretim değil; yarınlara daha temiz bir dünya bırakmayı da sorumluluğumuz olarak görüyoruz. Bu vizyonla üretim tesislerimizin çatılarını Güneş Enerji Sistemi (GES) ile donattık."}
            </p>
            <p className="mt-3 text-base leading-8 text-white/90">
              {cms.gesP[1] ||
                t?.sustain.gesP[1] ||
                "Artık fabrikamızda gerçekleştirdiğimiz her üretimin arkasında doğanın saf gücü, güneşin temiz enerjisi var."}
            </p>

            <ul className="mt-8 space-y-4">
              {gesItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#f19000]/20 text-[#f19000]">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-7 text-white/85">
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <LocaleLink
              href="/ges"
              className="mt-8 inline-flex text-sm font-medium text-[#f19000] hover:underline active:underline"
            >
              {f.gesLink || t?.sustain.gesLink || "GES sayfasını incele"} →
            </LocaleLink>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 sm:min-h-[420px]">
            <Image
              src={cms.plantImage}
              alt={
                f.plantAlt ||
                t?.sustain.plantAlt ||
                "Güneş panelleriyle kaplı OmaFil üretim tesisi"
              }
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={82}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
                {f.plantKicker || t?.sustain.plantKicker || "OmaFil üretim tesisi"}
              </p>
              <p className="mt-2 max-w-sm text-lg font-medium text-white">
                {f.plantText ||
                  t?.sustain.plantText ||
                  "Üretimde kaliteyi yenilenebilir enerji yatırımlarıyla destekliyoruz."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </CorporateFrame>
  );
}
