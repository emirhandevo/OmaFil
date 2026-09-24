import { getCopy } from "@/i18n/get-copy";

/**
 * Hero ile kurumsal alan arasındaki marka mesajı.
 * Görsel tasarım tek component üzerinden yönetilir.
 */
export async function BrandStatement() {
  const { copy } = await getCopy();

  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-18"
      aria-labelledby="brand-statement-title"
    >
      <div className="relative overflow-hidden rounded-3xl border border-brand-blue/40 bg-brand-navy px-6 py-14 text-center shadow-2xl shadow-black/20 sm:px-12 sm:py-15">
        {/* Marka renkleriyle oluşturulan dekoratif arka plan ışıkları */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-16 size-64 rounded-full bg-brand-blue/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-28 size-64 rounded-full bg-brand-orange/25 blur-3xl"
        />

        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-orange uppercase">
            OmaFil
          </p>

          <h2
            id="brand-statement-title"
            className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {copy.brand.titleBefore}{" "}
            <span className="text-brand-orange">{copy.brand.titleAccent}</span>
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-16 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-orange to-transparent"
        />
      </div>
    </section>
  );
}