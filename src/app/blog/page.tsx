import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "OmaFil iplik üretimi, tesis ve sürdürülebilirlik yazıları.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20">
      <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
        Blog
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Yazılar
      </h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        Tesis, ürün ve üretim üzerine yazılar.
      </p>

      <p className="mt-12 rounded-2xl border border-border bg-card px-6 py-10 text-muted-foreground">
        Yazılar yakında burada yayınlanacak.
      </p>
    </section>
  );
}
