import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  Leaf,
  Recycle,
  Sprout,
  Sun,
  TreePine,
} from "lucide-react";
import { site } from "@/config/site";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";

export const metadata: Metadata = {
  title: "Sürdürülebilirlik",
  description:
    "OmaFil sürdürülebilirlik: GES, GRS belgeli recycle iplik, Eco-Biopa ve Free-Dyed susuz boyama.",
  alternates: { canonical: "/kurumsal/surdurulebilirlik" },
};

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
    subtitle: "UNIFI iş birliği",
    text: "Geri dönüştürülmüş kaynaklardan geliştirilen çevre dostu iplik çözümleri. 2023’te GRS belgesi ile üretim süreçlerimiz belgelendi.",
    icon: Recycle,
    tone: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Eco-Biopa",
    subtitle: "Bio-bazlı polyamid iplik",
    text: "Fosil kaynak kullanımını azaltmayı hedefleyen bio-bazlı polyamid iplik. Performanstan ödün vermeden daha düşük çevresel etki.",
    icon: Sprout,
    tone: "bg-lime-500/15 text-lime-700 dark:text-lime-400",
  },
  {
    title: "Free-Dyed",
    subtitle: "Susuz boyama teknolojisi",
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

export default function SurdurulebilirlikPage() {
  return (
    <CorporateFrame
      path="/kurumsal/surdurulebilirlik"
      title="Sürdürülebilirlik"
      description={`${site.legalName}; tüm üretim süreçlerine sosyal ve çevresel sürdürülebilirliği dahil etmeye kararlıdır.`}
    >
      {/* Giriş */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 lg:grid-cols-2 lg:gap-14">
        <div className="text-body max-w-xl space-y-5 text-base leading-8">
          <p>
            Daha iyi bir dünya için {site.legalName}, tüm üretim süreçlerine
            sosyal ve çevresel sürdürülebilirliği dahil etmeye kararlıdır.
          </p>
          <p>
            Sürdürülebilirlik; üretim ve çeşitliliğin devamlılığı sağlanırken
            insanlığın yaşamının daimi kılınabilmesidir. Kendi ihtiyaçlarımızı,
            gelecek nesillerin ihtiyaçlarından ödün vermeden karşılayabilmektir.
          </p>
          <p>
            Bizim için sürdürülebilirlik slogan değil; kaynağı verimli kullanmak
            ve ürünü buna göre geliştirmek demektir. Güneş enerjisi, geri
            dönüştürülmüş iplik ve su tüketimini azaltan boyama bu yaklaşımın
            somut parçalarıdır.
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-border bg-muted p-6 shadow-sm">
          <Image
            src="/images/sustainability/dunya.webp"
            alt="Ormanla kaplı dünya görseli"
            fill
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-contain p-4"
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
            Sürdürülebilirlik{" "}
            <span className="text-brand-orange">neden önemlidir?</span>
          </h2>
          <div className="text-body mt-6 max-w-3xl space-y-4 text-base leading-8">
            <p>
              Sanayi devrimiyle artan enerji ihtiyacı, petrol ve kömür gibi
              yenilenemeyen kaynakların yoğun kullanımına yol açtı. Hızlı
              sanayileşme ve şehirleşme; hava, su ve toprak kirliliğini
              büyüttü; biyoçeşitlilikte azalma, toprak kaybı ve çölleşme gibi
              sorunları derinleştirdi.
            </p>
            <p>
              Bütün canlılar birbirleriyle ve cansız varlıklarla etkileşim
              içinde oldukları bir ekosistemin parçasıdır. Ekosistemin bir
              parçası zarar görürse diğer bölümlerde de sonuçları görülür. Bu
              nedenle doğal çevrenin kendini iyileştirme hızını aşmadan,
              dengeyi bozmadan hareket etmek zorunludur.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map((item) => (
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
          Çevreci teknolojiler
        </p>
        <h2
          id="yarns-title"
          className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Sürdürülebilir iplikler
        </h2>
        <p className="text-body mt-4 max-w-3xl text-base leading-8">
          {site.legalName} daha iyi bir dünya için tüm üretim süreçlerine
          sosyal ve çevresel sürdürülebilirliği dahil eder.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {yarnSolutions.map((item) => {
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
                <p className="mt-5 text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">
                  {item.subtitle}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-body mt-3 text-sm leading-7">{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-muted px-5 py-4 shadow-sm">
          <span className="text-sm font-semibold text-foreground">
            Sertifikalar
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
              Güneş enerji sistemi
            </p>
            <h2
              id="ges-title"
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Geleceğe değer katıyoruz, üretimi güneşten alıyoruz
            </h2>
            <p className="mt-5 text-base leading-8 text-white/90">
              Sadece bugünün ihtiyaçlarını karşılayan kaliteli üretim değil;
              yarınlara daha temiz bir dünya bırakmayı da sorumluluğumuz olarak
              görüyoruz. Bu vizyonla üretim tesislerimizin çatılarını Güneş
              Enerji Sistemi (GES) ile donattık.
            </p>
            <p className="mt-3 text-base leading-8 text-white/90">
              Artık fabrikamızda gerçekleştirdiğimiz her üretimin arkasında
              doğanın saf gücü, güneşin temiz enerjisi var.
            </p>

            <ul className="mt-8 space-y-4">
              {gesHighlights.map((item) => {
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

            <Link
              href="/ges"
              className="mt-8 inline-flex text-sm font-medium text-[#f19000] hover:underline"
            >
              GES sayfasını incele →
            </Link>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 sm:min-h-[420px]">
            <Image
              src="/images/sustainability/factory-solar.webp"
              alt="Güneş panelleriyle kaplı OmaFil üretim tesisi"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={82}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
                OmaFil üretim tesisi
              </p>
              <p className="mt-2 max-w-sm text-lg font-medium text-white">
                Üretimde kaliteyi yenilenebilir enerji yatırımlarıyla
                destekliyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </CorporateFrame>
  );
}
