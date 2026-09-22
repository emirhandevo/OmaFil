import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

/**
 * Blog — Keystatic reader.
 * Yazılar: content/blog/*.mdoc (panel: /keystatic)
 */

const reader = createReader(process.cwd(), keystaticConfig);

export type BlogPostListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export async function getBlogPosts(): Promise<BlogPostListItem[]> {
  const posts = await reader.collections.posts.all();

  return posts
    .map((post) => ({
      slug: post.slug,
      title: post.entry.title,
      excerpt: post.entry.excerpt,
      // Keystatic date → ISO string
      date: post.entry.date ?? "",
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string) {
  const post = await reader.collections.posts.read(slug);
  if (!post) return null;

  return {
    slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date ?? "",
    content: post.content,
  };
}
