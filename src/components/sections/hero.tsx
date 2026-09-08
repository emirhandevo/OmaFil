/**
 * anasayfa ilk ekran (LCP bölgesi)
 * metin değişince sadece burası. Header/Footer dokunulmaz. 
*/

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <p className="text-sm text-muted-foreground">Endüstriyel iplik</p>
      <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
        Omafil — kurumsal katalog
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Naylon 6 / 66 POY, FDY, DTY ve özel tip iplik. İçerik omafil.com’dan
        buraya taşınacak.
      </p>
    </section>
  );
}