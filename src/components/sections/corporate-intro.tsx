import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { buttonVariants } from "@/components/ui/button";
import { getCopy } from "@/i18n/get-copy";

/**
 * Anasayfadaki kısa kurumsal tanıtım bölümü.
 * Ziyaretçiyi detaylı Kurumsal sayfasına yönlendirir.
 */
export async function CorporateIntro() {
  const { copy } = await getCopy();

  return (
    <section className="py-20 sm:py-18">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
       <div
  className="relative aspect-4/3 w-full"
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
    alt={copy.chrome.introAlt}
    fill
    sizes="(min-width: 1024px) 50vw, 100vw"
    quality={80}
    className="object-cover"
  />
</div>

        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
            {copy.intro.kicker}
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {copy.intro.title}
          </h2>

          <p className="mt-6 leading-7 text-muted-foreground">
            {copy.intro.p1}
          </p>

          <p className="mt-4 leading-7 text-muted-foreground">
            {copy.intro.p2}
          </p>

          <LocaleLink
            href="/kurumsal"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "mt-8",
            })}
          >
            {copy.intro.cta}
            <ArrowRight aria-hidden="true" />
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}