/**
 * Her geçişte yeniden bağlanır. Telefonda kısa fade buradan gelir.
 * Header ve footer SiteShell’de kalır, bu kutu yalnız içeriği solar.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="omafil-page-enter">{children}</div>;
}
