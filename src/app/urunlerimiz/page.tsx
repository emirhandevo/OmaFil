import type { Metadata } from "next";
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
    <section className="relative isolate overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/[0.04] via-background to-background dark:from-brand-blue/20 dark:via-background dark:to-background" />
        <div className="absolute -top-24 -right-20 size-[28rem] rounded-full bg-brand-orange/15 blur-3xl dark:bg-brand-orange/20" />
        <div className="absolute top-1/3 -left-24 size-[22rem] rounded-full bg-brand-blue/12 blur-3xl dark:bg-brand-blue/25" />
        <div className="absolute right-1/4 bottom-0 size-[18rem] rounded-full bg-brand-navy/8 blur-3xl dark:bg-white/5" />
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
