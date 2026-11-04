import type { Metadata } from "next";
import { SidePaintSpots } from "@/components/sections/side-paint-spots";
import { ProductsGrid } from "@/components/sections/products-grid";
import { getContact } from "@/content/cms";
import { getProductLines } from "@/content/catalog";
import { getCopy } from "@/i18n/get-copy";
import { pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const seo = getUi(locale).seo;
  return {
    title: seo.productsTitle,
    description: seo.products,
    alternates: pageAlternates("/urunlerimiz", locale),
  };
}

export default async function UrunlerimizPage() {
  const { copy, locale } = await getCopy();
  const [lines, contact] = await Promise.all([
    getProductLines(locale),
    getContact(locale),
  ]);

  return (
    <section className="relative isolate overflow-x-hidden bg-white dark:bg-black">
      {/* Açıkta turuncu, koyuda gece mavisi. Yerler aynı. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <SidePaintSpots />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
          {copy.products.kicker}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {copy.products.title}
        </h1>
        <p className="text-body mt-5 max-w-2xl text-base leading-8">
          {copy.products.lead}
        </p>

        <div className="mt-12">
          <ProductsGrid lines={lines} contactEmail={contact.email} />
        </div>
      </div>
    </section>
  );
}
