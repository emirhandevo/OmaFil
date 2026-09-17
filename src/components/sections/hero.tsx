import Link from "next/link";
import { HeroMarquee } from "@/components/sections/hero-marquee";
import { buttonVariants } from "@/components/ui/button";

/**
 * Anasayfanın ilk ekranı.
 * Ana mesaj, aksiyon butonları ve ürün/tesis görsellerini içerir.
 */
export function Hero() {
  return (
    <section className="w-full max-w-full overflow-hidden">
      {/*
        Mobil: aspect-video (16:9) = video boyutu. Siyah bar yok, yan kesim yok.
        Masaüstü: sabit min yükseklik + cover.
      */}
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:min-h-[560px]">
        <video
          className="pointer-events-none absolute inset-0 size-full object-cover object-center"
          src="/videos/hero-web.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Yazı okunsun diye videoyu karartıyorum */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Yazılar video kutusunun tam ortasında */}
        <div className="absolute inset-0 flex items-center justify-center px-4 py-4 sm:py-8">
          <div className="mx-auto max-w-4xl text-center text-white">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-orange uppercase sm:text-xs sm:tracking-[0.22em]">
              Türkiye’den Dünyaya Endüstriyel İplik
            </p>

            <h1 className="mt-2 text-xl font-semibold tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
              Endüstriyel İplik Üretiminde Güvenilir Çözüm Ortağınız
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-white/80 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
              Naylon 6 ve Naylon 66 POY, FDY, DTY, ATY ile özel tip iplik
              çözümlerini yüksek kalite standartlarında üretiyor ve dünya
              pazarlarına sunuyoruz.
            </p>

            {/* Ziyaretçiyi ürünlere ve kurumsal hikâyeye yönlendiren CTA alanı */}
            <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-8 sm:flex-row sm:gap-3">
              <Link
                href="/urunlerimiz"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "h-9 px-4 text-sm sm:h-10 sm:px-6 sm:text-base",
                })}
              >
                İplik Ürünlerimizi İnceleyin
              </Link>

              <Link
                href="/kurumsal"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  // video üstünde. light modda beyaz zemin + beyaz yazı olmasın
                  className:
                    "h-9 border-white/80 bg-black/30 px-4 text-sm text-white hover:bg-white/20 hover:text-white sm:h-10 sm:px-6 sm:text-base",
                })}
              >
                OmaFil’i Tanıyın
              </Link>
            </div>
          </div>
        </div>
      </div>

      <HeroMarquee />
    </section>
  );
}
