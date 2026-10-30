import { reader } from "@/content/keystatic";
import { pickLocale } from "@/content/localized";
import { defaultLocale, type Locale } from "@/i18n/locales";

// Dil alanı boşsa pickLocale Türkçe başlığa düşer. Gövde Markdoc.

export type BlogPostListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

function postText(
  copy: Parameters<typeof pickLocale>[0],
  locale: Locale,
) {
  const text = pickLocale(copy, locale);
  return {
    title: text?.title?.trim() || "",
    excerpt: text?.excerpt?.trim() || "",
    body: text?.body?.trim() || "",
  };
}

export async function getBlogPosts(
  locale: Locale = defaultLocale,
): Promise<BlogPostListItem[]> {
  const posts = await reader.collections.posts.all();

  return posts
    .map((post) => {
      const text = postText(post.entry.copy, locale);
      return {
        slug: post.slug,
        title: text.title || post.entry.title,
        excerpt: text.excerpt,
        date: post.entry.date ?? "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string, locale: Locale = defaultLocale) {
  const post = await reader.collections.posts.read(slug);
  if (!post) return null;
  const text = postText(post.copy, locale);

  return {
    slug,
    title: text.title || post.title,
    excerpt: text.excerpt,
    date: post.date ?? "",
    body: text.body,
  };
}
