import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { LocaleLink } from "@/components/i18n/locale-link";
import { getBlogPost, getBlogPosts } from "@/content/blog";
import { getCopy } from "@/i18n/get-copy";
import { htmlLang, pageAlternates } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, { locale }] = await Promise.all([getBlogPost(slug), getCopy()]);
  if (!post) return { title: getUi(locale).seo.postMissing };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: pageAlternates(`/blog/${slug}`, locale),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const { copy, locale } = await getCopy();

  const { node } = await post.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Blog içeriği geçersiz (Markdoc)");
  }
  const renderable = Markdoc.transform(node);

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-20 sm:pt-20">
      <LocaleLink
        href="/blog"
        className="text-sm font-medium text-brand-orange hover:underline"
      >
        {copy.chrome.blogBack}
      </LocaleLink>
      <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
        Blog
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{post.title}</h1>
      {post.date ? (
        <time
          dateTime={post.date}
          className="mt-4 block text-sm text-muted-foreground"
        >
          {new Date(post.date).toLocaleDateString(htmlLang(locale), {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      ) : null}
      <div className="prose-omafil mt-8 space-y-5 leading-7 text-muted-foreground [&_a]:text-brand-orange [&_a]:underline [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
        {Markdoc.renderers.react(renderable, React)}
      </div>
    </article>
  );
}
