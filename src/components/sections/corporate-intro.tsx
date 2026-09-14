import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

/**
 * Anasayfadaki kısa kurumsal tanıtım bölümü.
 * Ziyaretçiyi detaylı Kurumsal sayfasına yönlendirir.
 */
export function CorporateIntro() {
  return (
    <section className="py-20 sm:py-18">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
       <div
  className="relative aspect-[4/3] w-full"
  style={{
    maskImage: 'url("/masks/brush-mask.png")',
    WebkitMaskImage: 'url("/masks/brush-mask.png")',
    maskSize: "120% 150%",
    WebkitMaskSize: "100% 100%",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  }}
>
  <Image
    src="/images/corporate/factory.webp"
    alt="OmaFil üretim tesisi"
    fill
    sizes="(min-width: 1024px) 50vw, 100vw"
    quality={80}
    className="object-cover"
  />
</div>

        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
            Kurumsal
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Türkiye’den Dünyaya, İpliğin Geleceği
            </h2>

          <p className="mt-6 leading-7 text-muted-foreground">
            Tekstilde 1999’dan bu yana biriken deneyimimizi, ileri teknoloji ve güçlü üretim altyapımızla geleceğin iplik çözümlerine dönüştürüyoruz. Avrupa’nın en büyük gipe iplik üretim tesisimizle, global tekstil endüstrisinin ihtiyaçlarına yüksek kalite ve güvenilirlikle cevap veriyoruz.
          </p>

          <p className="mt-4 leading-7 text-muted-foreground">
            OmaFil olarak, üretimde sürekliliği, teknik uzmanlığı ve sürdürülebilirliği bir araya getirerek Türkiye’den dünyaya uzanan bir üretim gücü oluşturuyoruz.
          </p>

          <Link
            href="/kurumsal"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "mt-8",
            })}
          >
            Kurumsal Yapımız
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}