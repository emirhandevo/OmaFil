import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/ui/layout/site-shell";
import { getBlogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "OmaFil iplik üretimi, tesis ve sürdürülebilirlik yazıları.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20">
        <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
          Blog
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Yazılar
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
          Tesis, ürün ve üretim üzerine kısa notlar.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-border bg-card px-6 py-10 text-muted-foreground">
            Henüz yayınlanmış yazı yok.
          </p>
        ) : (
          <ul className="mt-12 grid gap-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand-orange"
                >
                  <time dateTime={post.date} className="text-sm text-brand-orange">
                    {new Date(post.date).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
                  <p className="mt-2 leading-7 text-muted-foreground">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SiteShell>
  );
}
