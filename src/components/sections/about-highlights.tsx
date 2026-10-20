import { LocaleLink } from "@/components/i18n/locale-link";
import { getAboutBlocks } from "@/content/sections";
import { getCopy } from "@/i18n/get-copy";
import { getInner } from "@/i18n/inner";
import {
  Award,
  Factory,
  Leaf,
  Recycle,
  Sun,
  Trash2,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const highlightStats: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}[] = [
  {
    title: "40.000 m² Üretim Alanı",
    subtitle: "Tokat–Erbaa üretim tesisi",
    icon: Factory,
  },
  {
    title: "13.000 Ton",
    subtitle: "Yıllık üretim",
    icon: Award,
  },
  {
    title: "#1 Avrupa’da En Büyük",
    subtitle: "Gipe iplik üretim tesisi",
    icon: Trophy,
  },
  {
    title: "%100 Yenilenebilir Enerji",
    subtitle: "Sürdürülebilir üretim hedefi",
    icon: Sun,
  },
];

const focusItems = [
  { label: "GRS Sertifikalı", icon: Recycle },
  { label: "Yenilenebilir Enerji", icon: Sun },
  { label: "Sıfır Atık Hedefi", icon: Trash2 },
] as const;

const certificates = ["GRS", "ISO 9001", "OEKO-TEX"] as const;

/**
 * Hakkımızda — canlı sitedeki rakam şeridi + sürdürülebilirlik bloğu.
 * İthalat/Üretim/İhracat kartlarının yerine geçer.
 */
export async function AboutHighlights() {
  const { locale } = await getCopy();
  const t = getInner(locale);
  const cms = await getAboutBlocks(locale);
  const stats = highlightStats.map((stat, i) => ({
    ...stat,
    title: cms.stats[i]?.title || t?.about.stats[i]?.title || stat.title,
    subtitle:
      cms.stats[i]?.subtitle || t?.about.stats[i]?.subtitle || stat.subtitle,
  }));
  const focus = focusItems.map((item, i) => ({
    ...item,
    label: cms.focus[i] || t?.about.focus[i] || item.label,
  }));
  const f = cms.filled;

  return (
    <>
      {/* Navy istatistik şeridi */}
      <section
        className="bg-brand-navy py-12 sm:py-16"
        aria-label={f.statsAria || t?.about.statsAria || "OmaFil rakamları"}
      >
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article
                key={stat.title}
                className="flex flex-col items-center rounded-2xl bg-white px-5 py-7 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex size-14 items-center justify-center text-brand-navy">
                  <Icon aria-hidden="true" className="size-10" strokeWidth={1.4} />
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug text-zinc-900 sm:text-lg">
                  {stat.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-600">{stat.subtitle}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sürdürülebilirlik — iki kolon */}
      <section
        className="bg-background py-16 sm:py-20"
        aria-labelledby="about-sustainability-title"
      >
        <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
              <span aria-hidden="true" className="h-px max-w-10 flex-1 bg-border" />
              {f.sustainKicker || t?.about.sustainKicker || "Sürdürülebilirlik"}
              <span aria-hidden="true" className="h-px max-w-10 flex-1 bg-border" />
            </p>

            <h2
              id="about-sustainability-title"
              className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              {f.sustainBefore || t?.about.sustainBefore ? (
                <>
                  {f.sustainBefore || t?.about.sustainBefore}{" "}
                  <span className="text-brand-orange">
                    {f.sustainAccent || t?.about.sustainAccent}
                  </span>{" "}
                  {f.sustainAfter || t?.about.sustainAfter}
                </>
              ) : (
                <>
                  Geleceğe <span className="text-brand-orange">Sorumlu</span>{" "}
                  Yaklaşım
                </>
              )}
            </h2>

            <p className="text-body mt-5 max-w-xl text-base leading-8">
              {f.sustainP1 ||
                t?.about.sustainP1 ||
                "Üretim süreçlerimizin merkezine sürdürülebilirliği koyuyoruz. Çatı üstü güneş enerjisi yatırımlarımız ve GRS sertifikalı geri dönüştürülmüş iplik çözümlerimizle çevresel etkimizi azaltmayı hedefliyoruz."}
            </p>
            <p className="text-body mt-3 max-w-xl text-base leading-8">
              {f.sustainP2 ||
                t?.about.sustainP2 ||
                "Kaynak verimliliği, sorumlu üretim ve döngüsel ekonomi ilkeleri; OmaFil’in kurumsal kimliğinin ayrılmaz parçasıdır."}
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {focus.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <span className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium shadow-sm transition-colors hover:border-brand-orange">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-brand-orange/12 text-brand-orange">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <LocaleLink
              href="/kurumsal/surdurulebilirlik"
              className="mt-6 inline-flex text-sm font-medium text-brand-orange hover:underline active:underline"
            >
              {f.sustainLink || t?.about.sustainLink || "Sürdürülebilirlik sayfasına git"} →
            </LocaleLink>
            <LocaleLink
              href="/ges"
              className="mt-3 inline-flex text-sm font-medium text-brand-orange hover:underline active:underline"
            >
              {f.gesLink || t?.about.gesLink || "GES — güneş enerji sistemi"} →
            </LocaleLink>
          </div>

          <article className="flex flex-col overflow-hidden rounded-3xl bg-emerald-50 text-zinc-900 shadow-sm dark:bg-emerald-950/40 dark:text-foreground">
            <div className="flex flex-1 flex-col px-7 py-8 sm:px-8 sm:py-10">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Recycle aria-hidden="true" className="size-8" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                {f.recycledTitle || t?.about.recycledTitle || "Recycled İplik"}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-muted-foreground">
                {f.recycledText ||
                  t?.about.recycledText ||
                  "Geri dönüştürülmüş kaynaklardan geliştirilen iplik çözümlerimizle döngüsel ekonomiyi üretimimize taşıyoruz. Kalite standartlarımızdan ödün vermeden çevre dostu alternatifler sunuyoruz."}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <Leaf aria-hidden="true" className="size-4" />
                {f.grs || t?.about.grs || "GRS uyumlu üretim"}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-700 px-6 py-4 text-white dark:bg-zinc-800">
              <span className="text-sm font-medium">
                {f.certs || t?.about.certs || "Sertifikalar"}
              </span>
              <div className="flex flex-wrap gap-2">
                {certificates.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full border border-white/35 px-3 py-1 text-xs font-semibold tracking-wide"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
