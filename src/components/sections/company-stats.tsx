const companyStats = [
  {
    value: "152.000+",
    unit: "Ton/Yıl",
    label: "Üretim Kapasitesi",
  },
  {
    value: "40.000+",
    unit: "m²",
    label: "Kapalı Üretim Alanı",
  },
  {
    value: "18.000+",
    unit: "Mutlu",
    label: "Müşteri",
  },
  {
    value: "61+",
    unit: "Ülkeye",
    label: "İhracat",
  },
] as const;

/**
 * OmaFil’in üretim gücünü ve küresel erişimini gösterir.
 * Veriler tek diziden yönetildiği için güncelleme yalnızca yukarıdan yapılır.
 */
export function CompanyStats() {
  return (
    <section
      className="py-20 sm:py-10"
      aria-labelledby="company-stats-title"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
            Üretim Gücümüz
          </p>

          <h2
            id="company-stats-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Rakamlarla OmaFil
          </h2>

          <p className="text-body mx-auto mt-4 max-w-2xl text-base leading-8">
            Üretim kapasitemiz, modern tesislerimiz ve küresel ticaret
            ağımızla tekstil sektörüne değer katıyoruz.
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