import type { Metadata } from "next";
import { LocaleLink } from "@/components/i18n/locale-link";
import { getBlogPosts } from "@/content/blog";
import { getCopy } from "@/i18n/get-copy";
import { htmlLang, pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

// Yazı yoksa boş durum. Liste Keystatic posts koleksiyonundan gelir.

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getCopy();
  const seo = getUi(locale).seo;
  return {
    title: seo.blogTitle,
    description: seo.blog,
    alternates: pageAlternates("/blog", locale),
  };
}

export default async function BlogPage() {
  const { copy, locale } = await getCopy();
  const posts = await getBlogPosts(locale);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20">
      <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
        Blog
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {copy.blog.title}
      </h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        {copy.blog.lead}
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-border bg-card px-6 py-10 text-muted-foreground">
          {copy.blog.empty}
        </p>
      ) : (
        <ul className="mt-12 grid gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <LocaleLink
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand-orange active:border-brand-orange"
              >
                {post.date ? (
                  <time
                    dateTime={post.date}
                    className="text-sm text-brand-orange"
                  >
                    {new Date(post.date).toLocaleDateString(htmlLang(locale), {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                ) : null}
                <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {post.excerpt}
                </p>
              </LocaleLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
