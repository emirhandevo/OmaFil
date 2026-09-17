import Link from "next/link";
import { HeroMarquee } from "@/components/sections/hero-marquee";
import { buttonVariants } from "@/components/ui/button";

/**
 * Anasayfanın ilk ekranı.
 * Ana mesaj, aksiyon butonları ve ürün/tesis görsellerini içerir.
 */
export function Hero() {
  return (
    <section className="overflow-hidden">
      {/* Video bu kutunun içinde kalır. Marquee bu kutunun dışında, altta. */}
<div className="relative min-h-[520px] overflow-hidden">
  <video
    className="absolute inset-0 h-full w-full object-cover"
    src="/videos/hero-web.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
  {/* Yazı okunsun diye videoyu karartıyorum */}
  <div className="absolute inset-0 bg-black/50" />

  <div className="relative mx-auto max-w-4xl px-4 pt-16 pb-16 text-center text-white sm:pt-20">
    <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
      Türkiye’den Dünyaya Endüstriyel İplik
    </p>

    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
      Endüstriyel İplik Üretiminde Güvenilir Çözüm Ortağınız
    </h1>

    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
      Naylon 6 ve Naylon 66 POY, FDY, DTY, ATY ile özel tip iplik
      çözümlerini yüksek kalite standartlarında üretiyor ve dünya
      pazarlarına sunuyoruz.
    </p>
       {/* Ziyaretçiyi ürünlere ve kurumsal hikâyeye yönlendiren CTA alanı */}
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link
        href="/urunlerimiz"
        className={buttonVariants({ variant: "default", size: "lg" })}
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
                "border-white/80 bg-black/30 text-white hover:bg-white/20 hover:text-white",
            })}
      >
        OmaFil’i Tanıyın
      </Link>
    </div>
  </div>
</div>

      <HeroMarquee />
    </section>
  );
}