import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/content/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Yazı bulunamadı" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-20 sm:pt-20">
      <Link
        href="/blog"
        className="text-sm font-medium text-brand-orange hover:underline"
      >
        Yazılara dön
      </Link>
      <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
        Blog
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        {post.title}
      </h1>
      <time
        dateTime={post.date}
        className="mt-4 block text-sm text-muted-foreground"
      >
        {new Date(post.date).toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
      <div className="mt-8 space-y-5 leading-7 text-muted-foreground">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
