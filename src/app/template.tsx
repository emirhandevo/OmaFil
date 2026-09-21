/**
 * VT desteklemeyen tarayıcılarda en azından giriş animasyonu.
 * Root SiteShell header/footer’ı tutar; burada sadece içerik animasyonu.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="omafil-page-enter">{children}</div>;
}
