import { LocaleLink } from "@/components/i18n/locale-link";
import { getCopy } from "@/i18n/get-copy";
import { HeroMarquee } from "@/components/sections/hero-marquee";
import {HeroVideo} from "@/components/sections/hero-video"
import { buttonVariants } from "@/components/ui/button";

/**
 * Anasayfanın ilk ekranı.
 * Ana mesaj, aksiyon butonları ve ürün/tesis görsellerini içerir.
 */
export async function Hero() {
  const { copy } = await getCopy();

  return (
    <section className="w-full max-w-full overflow-hidden">
      {/*
        Yükseklik yazıya göre büyür. Video absolute cover ile doldurur.
        aspect-video mobilde 219px kalıyordu; butonlar taşıyordu.
      */}
      <div className="relative w-full overflow-hidden bg-black">
        {/*
          Tabela karesinde sol çit (~122px) sağ çitten (~65px) geniş.
          lg: sağ kenara sabit scale, soldan ~57px kırpar; iki şerit eşitlenir.
          Küçük ekran: duvardaki OmaFil kelimesi karenin sağına yakın (merkez ~%56).
          object-position 65% o noktayı 393px kutunun ortasına çeker.
          Başlık ayrı katmanda, ortası bozulmaz.
        */}
        <HeroVideo/>
        {/* Yazı okunsun diye videoyu karartıyorum */}
        <div className="absolute inset-0 bg-black/50" />

        {/* relative: kutu yüksekliğini metin belirler, taşma olmaz */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-10 text-center text-white sm:py-16 lg:min-h-[560px]">
          <p className="max-w-full text-[10px] font-semibold tracking-[0.14em] break-words text-brand-orange uppercase sm:text-xs sm:tracking-[0.22em]">
            {copy.hero.eyebrow}
          </p>

          <h1 className="mt-3 max-w-full text-2xl font-semibold tracking-tight text-balance sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
           {copy.hero.title}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            {copy.hero.body}
          </p>

          {/* Ziyaretçiyi ürünlere ve kurumsal hikâyeye yönlendiren CTA alanı */}
          <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-2 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <LocaleLink
              href="/urunlerimiz"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                // whitespace-nowrap butonu yatayda taşıyordu
                className:
                  "h-auto min-h-10 w-full whitespace-normal px-4 py-2.5 text-sm sm:w-auto sm:whitespace-nowrap sm:px-6 sm:text-base",
              })}
            >
              {copy.hero.productsCta}
            </LocaleLink>

            <LocaleLink
              href="/kurumsal"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                // video üstünde. light modda beyaz zemin + beyaz yazı olmasın
                className:
                  "h-auto min-h-10 w-full whitespace-normal border-white/80 bg-black/30 px-4 py-2.5 text-sm text-white hover:bg-white/20 hover:text-white sm:w-auto sm:whitespace-nowrap sm:px-6 sm:text-base",
              })}
            >
              {copy.hero.aboutCta}
            </LocaleLink>
          </div>
        </div>
      </div>

      <HeroMarquee />
    </section>
  );
}
