import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/ui/layout/site-shell";
import { contact } from "@/config/site";
import { yarnImages } from "@/config/hero-marquee";

export const metadata: Metadata = {
  title: "Ürünlerimiz",
  description:
    "OmaFil iplik ürünleri: Naylon 6, Naylon 66 ve polyester gipe, POY, FDY, DTY, ACY, SCY.",
  alternates: { canonical: "/urunlerimiz" },
};

export default function UrunlerimizPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20">
        <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
          Ürünlerimiz
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          İplik portföyümüz
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
          Naylon 6, Naylon 66 ve polyester gipe hatlarımız. Detaylı teknik
          sayfalar sonra eklenecek; şimdilik ürün özeti burada.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {yarnImages.map((item) => (
            <li key={item.src}>
              <article className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold">{item.label}</h2>
                  {item.summary && (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.summary}
                    </p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted-foreground">
          Teklif veya numune için{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-medium text-brand-orange hover:underline"
          >
            {contact.email}
          </a>
          .
        </p>
      </section>
    </SiteShell>
  );
}
