import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Leaf,
  Recycle,
  Sprout,
  Sun,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const sustainableSolutions = [
  {
    title: "Recycle İplikler",
    subtitle: "UNIFI İş Birliği",
    description:
      "Geri dönüştürülmüş kaynaklardan geliştirilen çevre dostu iplik çözümleri.",
    icon: Recycle,
    iconClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  {
    title: "Eco-Biopa",
    subtitle: "Bio-Bazlı Polyamid İplik",
    description:
      "Fosil kaynak kullanımını azaltmayı hedefleyen bio-bazlı polyamid iplik.",
    icon: Sprout,
    iconClass: "bg-lime-500/15 text-lime-800 dark:text-lime-400",
  },
  {
    title: "Free-Dyed",
    subtitle: "Susuz Boyama Teknolojisi",
    description:
      "Su tüketimini azaltmaya odaklanan yenilikçi susuz boyama teknolojisi.",
    icon: Droplets,
    iconClass: "bg-sky-500/15 text-sky-800 dark:text-sky-400",
  },
] as const;

/**
 * OmaFil’in çevre, enerji ve sürdürülebilir iplik yaklaşımını anlatır.
 */
export function SustainabilitySection() {
  return (
    <section
      className="py-20 sm:py-28"
      aria-labelledby="sustainability-title"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
              Geleceğe Karşı Sorumluluğumuz
            </p>

            <h2
              id="sustainability-title"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Sürdürülebilir Endüstriyel İplik Üretimi
            </h2>

            <p className="text-body mt-6 max-w-2xl text-base leading-8">
              OmaFil olarak, üretim süreçlerimizin merkezine sürdürülebilirliği ve inovasyonu yerleştiriyoruz. Gelecek nesillere daha yaşanabilir bir dünya bırakma sorumluluğumuzun bilinciyle, kaynaklarımızı en verimli şekilde kullanıyor ve çevresel etkimizi minimize edecek yenilikçi çözümler geliştiriyoruz. Modern Ar-Ge merkezimizde yürüttüğümüz çalışmalarla, sadece bugünün tekstil ihtiyaçlarını karşılamakla kalmıyor, aynı zamanda yarının çevre standartlarını belirleyen döngüsel ekonomi modellerini hayata geçiriyoruz. Sürdürülebilirlik bizim için bir tercih değil, kurumsal kimliğimizin ayrılmaz bir parçasıdır.
            </p>

            <p className="text-body mt-4 max-w-2xl leading-8">
              Geniş fabrika çatımızdaki güneş enerjisi sistemiyle yenilenebilir
              enerjiden yararlanıyor; teknoloji, kalite ve çevre bilincini aynı
              üretim anlayışında buluşturuyoruz.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                  <Sun aria-hidden="true" className="size-5" />
                </div>

                <h3 className="mt-4 font-semibold text-foreground">Yenilenebilir Enerji</h3>

                <p className="text-body mt-2 text-sm leading-7">
                  Çatı üstü güneş panellerimizle enerji ihtiyacımızda
                  yenilenebilir kaynaklardan faydalanıyoruz.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue">
                  <Leaf aria-hidden="true" className="size-5" />
                </div>

                <h3 className="mt-4 font-semibold text-foreground">Sorumlu Üretim</h3>

                <p className="text-body mt-2 text-sm leading-7">
                  Kaynak verimliliği için üretim süreçlerimizi sürekli
                  geliştiriyoruz.
                </p>
              </article>
            </div>

            <Link
              href="/kurumsal/surdurulebilirlik"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "mt-8 self-start",
              })}
            >
              Sürdürülebilirlik Yaklaşımımız
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 lg:min-h-[540px]">
            <Image
              src="/images/sustainability/factory-solar.webp"
              alt="Güneş panelleriyle kaplı OmaFil üretim tesisi"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={82}
              className="origin-bottom scale-[1] object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
                OmaFil Üretim Tesisi
              </p>
              <p className="mt-2 max-w-sm text-lg font-medium text-white">
                Üretimde kaliteyi yenilenebilir enerji yatırımlarıyla
                destekliyoruz.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
              Çevreci Teknolojiler
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Sürdürülebilir İplik Çözümlerimiz
            </h3>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {sustainableSolutions.map((solution) => {
              const Icon = solution.icon;

              return (
                <article
                  key={solution.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-orange hover:shadow-md dark:bg-gradient-to-br dark:from-card dark:to-brand-navy/20"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  />

                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${solution.iconClass}`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </div>

                  <p className="mt-5 text-xs font-bold tracking-[0.18em] text-brand-orange uppercase">
                    {solution.subtitle}
                  </p>

                  <h4 className="mt-2 text-xl font-semibold text-foreground">
                    {solution.title}
                  </h4>

                  <p className="text-body mt-3 text-sm leading-7">
                    {solution.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}