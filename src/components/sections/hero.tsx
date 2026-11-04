import Image from "next/image";
import { LocaleLink } from "@/components/i18n/locale-link";
import { getHero } from "@/content/cms";
import { getLocale } from "@/i18n/get-locale";
import { HeroVideo } from "@/components/sections/hero-video";

/**
 * Anasayfanın ilk ekranı.
 * Medya ortak; yazı Keystatic’te dil dil.
 * İplik şeridi burada değil: marka başlığının altında, page.tsx.
 */
export async function Hero() {
  const locale = await getLocale();
  const hero = await getHero(locale);
  const text = hero;
  const poster =
    hero.media.kind === "video" ? hero.media.posterSrc : hero.media.imageSrc;

  return (
    <section className="w-full max-w-full overflow-hidden">
      {/*
        Yükseklik yazıya göre büyür. Video/görsel absolute cover ile doldurur.
        aspect-video mobilde 219px kalıyordu; butonlar taşıyordu.
      */}
      <div className="relative w-full overflow-hidden bg-black">
        {/*
          LCP bu poster kare. HTML'de hemen durur.
          Video 400ms sonra üstüne biner; görsel modda video yok.
        */}
        <Image
          src={poster}
          alt=""
          fill
          preload
          unoptimized
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        {hero.media.kind === "video" ? (
          <HeroVideo src={hero.media.videoSrc} poster={hero.media.posterSrc} />
        ) : null}
        {/* Yazı okunsun diye videoyu karartıyorum */}
        <div className="absolute inset-0 bg-black/50" />

        {/* relative: kutu yüksekliğini metin belirler, taşma olmaz */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-10 text-center text-white sm:py-16 lg:min-h-[560px]">
          <p className="max-w-full text-[10px] font-semibold tracking-[0.14em] break-words text-brand-orange uppercase sm:text-xs sm:tracking-[0.22em]">
            {text.eyebrow}
          </p>

          <h1 className="mt-3 max-w-full text-2xl font-semibold tracking-tight text-balance sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            {text.title}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            {text.body}
          </p>

          {/* Ziyaretçiyi ürünlere ve kurumsal hikâyeye yönlendiren CTA alanı */}
          <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-2 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <LocaleLink
              href="/urunlerimiz"
              className="inline-flex items-center justify-center rounded-lg border border-white bg-[#f19000]/80 px-4 py-2.5 text-sm text-white transition-all duration-300 hover:-translate-y-[0.2rem] hover:border-[#f19000] hover:bg-neutral-500/60 sm:px-6 sm:text-base active:translate-y-0 active:border-[#f19000] active:bg-neutral-500/60"
            >
              {text.productsCta}
            </LocaleLink>

            <LocaleLink
              href="/kurumsal"
              className="inline-flex items-center justify-center rounded-lg border border-white bg-[#265291]/80 px-4 py-2.5 text-sm text-white transition-all duration-300 hover:-translate-y-[0.2rem] hover:border-[#265291] hover:bg-neutral-500/60 sm:px-6 sm:text-base active:translate-y-0 active:border-[#265291] active:bg-neutral-500/60"
            >
              {text.aboutCta}
            </LocaleLink>
          </div>
        </div>
      </div>
    </section>
  );
}
