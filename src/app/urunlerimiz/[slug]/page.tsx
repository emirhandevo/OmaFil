import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import {
  getCoveredSkus,
  getFilamentSkus,
  getProductLine,
  getProductLines,
} from "@/content/catalog";
import { getCopy } from "@/i18n/get-copy";
import { pageAlternates } from "@/i18n/locales";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const lines = await getProductLines();
  return lines.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getCopy();
  const line = await getProductLine(slug, locale);
  if (!line) return { title: "Ürün bulunamadı" };
  return {
    title: line.label,
    description: line.summary,
    alternates: pageAlternates(`/urunlerimiz/${slug}`, locale),
  };
}

export default async function ProductLinePage({ params }: PageProps) {
  const { slug } = await params;
  const { copy, locale } = await getCopy();
  const line = await getProductLine(slug, locale);
  if (!line) notFound();

  const [filament, covered] = await Promise.all([
    getFilamentSkus(slug),
    getCoveredSkus(slug),
  ]);
  const summary = line.summary;
  const hasSkus = filament.length > 0 || covered.length > 0;
  // İplik dtex sütunu: SCY naylon PA6/PA66, tüm PES ürünleri PES DTEX.
  const yarnDtexHeader =
    line.polymer === "pes"
      ? "PES DTEX"
      : line.code === "SCY" && line.polymer === "pa6"
        ? "PA6 DTEX"
        : line.code === "SCY" && line.polymer === "pa66"
          ? "PA66 DTEX"
          : "İplik dtex";

  return (
    <article className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
      <LocaleLink
        href="/urunlerimiz"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-orange hover:underline active:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        {copy.chrome.backProducts}
      </LocaleLink>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-card">
          {line.src ? (
            <Image
              src={line.src}
              alt={line.label}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted px-6 text-center">
              <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                {copy.products.soon}
              </p>
              <p className="text-sm font-semibold text-foreground/80">
                {line.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {copy.chrome.noPhoto}
              </p>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
            {line.code} · {line.kind === "filament" ? "Filament" : "Covered"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {line.label}
          </h1>
          <p className="text-body mt-4 max-w-xl text-base leading-8">
            {summary}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {line.colors?.map((color) => (
              <li
                key={color}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium"
              >
                {color}
              </li>
            ))}
            {line.recycled ? (
              <li className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                {copy.chrome.recycled}
              </li>
            ) : null}
            {line.featured ? (
              <li className="rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-xs font-medium text-brand-orange">
                {copy.chrome.featured}
              </li>
            ) : null}
          </ul>

          <LocaleLink
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-amber active:bg-brand-amber"
          >
            {copy.chrome.quoteSample}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </LocaleLink>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">
          {copy.chrome.specsTitle}
        </h2>
        <p className="text-body mt-2 text-sm leading-7">
          {copy.chrome.specsLead}
        </p>

        {!hasSkus ? (
          <p className="mt-6 rounded-2xl border border-border bg-card px-5 py-8 text-muted-foreground">
            {copy.chrome.specsEmpty}
          </p>
        ) : null}

        {filament.length > 0 ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs tracking-wide uppercase">
                {/* Başlıklar sözlükte yok. Spec ve Luster İngilizce, Renk / Kesit / Özellik Türkçe. */}
                <tr>
                  <th className="px-4 py-3 font-semibold">Spec</th>
                  <th className="px-4 py-3 font-semibold">Luster</th>
                  <th className="px-4 py-3 font-semibold">Renk</th>
                  <th className="px-4 py-3 font-semibold">Kesit</th>
                  <th className="px-4 py-3 font-semibold">Özellik</th>
                </tr>
              </thead>
              <tbody>
                {filament.map((sku, i) => (
                  <tr
                    key={`${sku.line}-${sku.spec}-${i}`}
                    className="border-t border-border"
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {sku.spec}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.luster?.join(", ") ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.colors?.join(" · ") ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.kesit || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.features
                        ?.filter((f) => f !== "featured")
                        .join(", ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {covered.length > 0 ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs tracking-wide uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tip</th>
                  <th className="px-4 py-3 font-semibold">Spandex dtex</th>
                  <th className="px-4 py-3 font-semibold">{yarnDtexHeader}</th>
                  <th className="px-4 py-3 font-semibold">Filament</th>
                  <th className="px-4 py-3 font-semibold">Yarn type</th>
                  <th className="px-4 py-3 font-semibold">Kesit</th>
                </tr>
              </thead>
              <tbody>
                {covered.map((sku, index) => (
                  <tr
                    key={`${sku.line}-${index}`}
                    className="border-t border-border"
                  >
                    <td className="px-4 py-3 font-medium">
                      {sku.productionType}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.spandexDtex}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.yarnDtex}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.filament ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.yarnType}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.kesit || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {line.kind === "covered" &&
        covered.length === 0 &&
        (line.family === "nylon66" || line.code === "DCY") ? (
          <p className="text-body mt-4 text-sm">
            {copy.chrome.customNote}
          </p>
        ) : null}
      </section>
    </article>
  );
}
