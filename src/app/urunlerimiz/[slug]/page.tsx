import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getCoveredSkus,
  getFilamentSkus,
  getProductLine,
  getProductLines,
} from "@/content/catalog";

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
  const line = await getProductLine(slug);
  if (!line) return { title: "Ürün bulunamadı" };
  return {
    title: line.label,
    description: line.summary,
  };
}

export default async function ProductLinePage({ params }: PageProps) {
  const { slug } = await params;
  const line = await getProductLine(slug);
  if (!line) notFound();

  const [filament, covered] = await Promise.all([
    getFilamentSkus(slug),
    getCoveredSkus(slug),
  ]);
  const hasSkus = filament.length > 0 || covered.length > 0;

  return (
    <article className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
      <Link
        href="/urunlerimiz"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-orange hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Ürünlere dön
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card">
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
                Görsel yakında
              </p>
              <p className="text-sm font-semibold text-foreground/80">
                {line.label}
              </p>
              <p className="text-xs text-muted-foreground">
                Üretim görseli eklenecek — placeholder değil, henüz fotoğraf
                yok.
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
            {line.summary}
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
                Recycled seçenek
              </li>
            ) : null}
            {line.featured ? (
              <li className="rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-xs font-medium text-brand-orange">
                Portföy öne çıkan
              </li>
            ) : null}
          </ul>

          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-amber"
          >
            Teklif / numune al
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">
          Teknik spesifikasyonlar
        </h2>
        <p className="text-body mt-2 text-sm leading-7">
          Katalog satırları. Detay veya özel denier için iletişime geçin.
        </p>

        {!hasSkus ? (
          <p className="mt-6 rounded-2xl border border-border bg-card px-5 py-8 text-muted-foreground">
            Bu hat için satır listesi yakında eklenecek. Custom üretim için
            teklif alın.
          </p>
        ) : null}

        {filament.length > 0 ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs tracking-wide uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Spec</th>
                  <th className="px-4 py-3 font-semibold">Lustre</th>
                  <th className="px-4 py-3 font-semibold">Renk</th>
                  <th className="px-4 py-3 font-semibold">Final DTY</th>
                  <th className="px-4 py-3 font-semibold">Final ATY</th>
                  <th className="px-4 py-3 font-semibold">Özellik</th>
                </tr>
              </thead>
              <tbody>
                {filament.map((sku) => (
                  <tr
                    key={`${sku.line}-${sku.spec}`}
                    className="border-t border-border"
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {sku.spec}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.lustre?.join(", ") ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.colors?.join(" · ") ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.finalDty ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.finalAty ?? "—"}
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
                  <th className="px-4 py-3 font-semibold">İplik dtex</th>
                  <th className="px-4 py-3 font-semibold">Filament</th>
                  <th className="px-4 py-3 font-semibold">Floor</th>
                  <th className="px-4 py-3 font-semibold">Yarn type</th>
                </tr>
              </thead>
              <tbody>
                {covered.map((sku) => (
                  <tr
                    key={`${sku.line}-${sku.spandexDtex}-${sku.yarnDtex}-${sku.filament ?? 0}-${sku.floor}-${sku.yarnType}`}
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
                      {sku.floor}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {sku.yarnType}
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
            Bu grupta custom üretim seçenekleri mevcuttur.
          </p>
        ) : null}
      </section>
    </article>
  );
}
