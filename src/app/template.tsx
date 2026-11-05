import { PageEnter } from "@/components/ui/layout/page-enter";

/**
 * Her geçişte yeniden bağlanır. İlk açılışta fade yok; LCP hero kalsın.
 * Sonraki geçişte içerik solar. Header ve footer SiteShell'de durur.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageEnter>{children}</PageEnter>;
}
