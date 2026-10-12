import KeystaticApp from "./keystatic";

/** Keystatic Admin — site header/footer yok (root ConditionalShell) */
export default function KeystaticLayout() {
  return (
    <>
      {/* Keystatic koleksiyon değil. Neon kayıtları ayrı sayfada. */}
      <a
        href="/sohbet-kayitlari"
        className="fixed right-4 bottom-4 z-[80] rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-brand-orange/90"
      >
        Sohbet kayıtları
      </a>
      <KeystaticApp />
    </>
  );
}
