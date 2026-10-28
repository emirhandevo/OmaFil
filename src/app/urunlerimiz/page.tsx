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
      {/* via-background yok: yıkama dipte de kalsın. Lekeler % ile uzun gridde de durur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/12 via-brand-blue/[0.08] to-brand-navy/[0.06] dark:from-brand-blue/28 dark:via-brand-navy/22 dark:to-brand-navy/18" />
        <div className="absolute -top-24 -right-20 size-[30rem] rounded-full bg-brand-orange/32 blur-3xl dark:bg-brand-orange/28" />
        <div className="absolute top-[16%] -left-28 size-[26rem] rounded-full bg-brand-blue/24 blur-3xl dark:bg-brand-blue/32" />
        <div className="absolute top-[38%] right-[-5rem] size-[24rem] rounded-full bg-brand-orange/16 blur-3xl dark:bg-brand-orange/12" />
        <div className="absolute top-[62%] -left-20 size-[28rem] rounded-full bg-brand-blue/20 blur-3xl dark:bg-brand-blue/28" />
        <div className="absolute right-1/5 -bottom-10 size-[22rem] rounded-full bg-brand-navy/16 blur-3xl dark:bg-brand-blue/14" />
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
