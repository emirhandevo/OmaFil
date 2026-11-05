import type { Metadata } from "next";
import { ColorProGrid } from "@/components/sections/color-pro-grid";
import { SidePaintSpots } from "@/components/sections/side-paint-spots";
import { ProductFilterBar } from "@/components/sections/product-filter-bar";
import { getCopy } from "@/i18n/get-copy";
import { pageAlternates } from "@/i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const { copy, locale } = await getCopy();
  return {
    title: copy.colorPro.seoTitle,
    description: copy.colorPro.seoDescription,
    alternates: pageAlternates("/omafil-color-pro", locale),
  };
}

export default async function ColorProPage() {
  const { copy } = await getCopy();

  return (
    <section className="relative isolate overflow-x-hidden bg-white text-foreground dark:bg-black">
      {/* Açıkta turuncu, koyuda gece mavisi. Yerler aynı. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <SidePaintSpots />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
        {/* Ürün listesinin başlığı burada durmaz. Kartela kendi metnini basar. */}
        <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
          {copy.colorPro.kicker}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {copy.colorPro.title}
        </h1>
        <p className="text-body mt-5 max-w-2xl text-base leading-8">
          {copy.colorPro.lead}
        </p>

        <div className="mt-12">
          <ProductFilterBar activeFamily={null} colorProActive />
          <div className="mt-10">
            <ColorProGrid copy={copy.colorPro} />
          </div>
          <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-[#596678] dark:text-[#b2becd]">
            {copy.colorPro.note}
          </p>
        </div>
      </div>
    </section>
  );
}
