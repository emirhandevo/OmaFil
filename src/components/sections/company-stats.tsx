import { getHomeStats } from "@/content/sections";
import { getCopy } from "@/i18n/get-copy";

/**
 * OmaFil’in üretim gücünü ve küresel erişimini gösterir.
 * Kartlar Keystatic → Ana sayfa bölümleri. Boş dil sözlüğe düşer.
 */
export async function CompanyStats() {
  const { copy, locale } = await getCopy();
  const fromCms = await getHomeStats(locale);
  const companyStats = fromCms.length
    ? fromCms
    : [
        { value: "13.000", unit: copy.stats.perYear, label: copy.stats.production },
        { value: "40.000+", unit: "m²", label: copy.stats.area },
        { value: "1.000+", unit: copy.stats.happy, label: copy.stats.customers },
        { value: "61+", unit: copy.stats.toCountries, label: copy.stats.exportLabel },
      ];

  return (
    <section
      className="py-20 sm:py-10"
      aria-labelledby="company-stats-title"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
            {copy.stats.kicker}
          </p>

          <h2
            id="company-stats-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {copy.stats.title}
          </h2>

          <p className="text-body mx-auto mt-4 max-w-2xl text-base leading-8">
            {copy.stats.lead}
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {companyStats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card px-4 py-8 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-gradient-to-b dark:from-card dark:to-brand-navy/20 sm:px-6 sm:py-10"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange to-transparent"
              />

              <dd className="text-3xl font-semibold tracking-tight text-brand-orange sm:text-4xl">
                {stat.value}
              </dd>

              {stat.unit && (
                <dd className="mt-1 text-sm font-medium text-brand-blue sm:text-base">
                  {stat.unit}
                </dd>
              )}

              <dt className="mt-3 text-sm font-medium text-foreground/80">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}