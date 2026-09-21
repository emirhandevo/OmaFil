/**
 * Blog tek kaynak.
 * Yeni yazı: bu diziye bir nesne ekle. slug URL olur: /blog/slug
 * Onaylı metin gelince buraya girilir — AI ile doldurulmaz.
 */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  // ISO tarih. Liste bunu sıralar.
  date: string;
  // Her eleman bir paragraf. Markdown kütüphanesi yok.
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [];

export function getBlogPosts() {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
