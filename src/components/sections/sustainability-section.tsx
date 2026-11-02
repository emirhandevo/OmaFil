import Image from "next/image";
import {
  ArrowRight,
  Droplets,
  Leaf,
  Recycle,
  Sprout,
  Sun,
} from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { buttonVariants } from "@/components/ui/button";
import { getHomeMedia } from "@/content/sections";
import { getCopy } from "@/i18n/get-copy";

const solutionIcons = [
  {
    icon: Recycle,
    iconClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  {
    icon: Sprout,
    iconClass: "bg-lime-500/15 text-lime-800 dark:text-lime-400",
  },
  {
    icon: Droplets,
    iconClass: "bg-sky-500/15 text-sky-800 dark:text-sky-400",
  },
] as const;

/**
 * OmaFil’in çevre, enerji ve sürdürülebilir iplik yaklaşımını anlatır.
 * Kart başlıkları turuncu; alt kicker yok (UNIFI / susuz boyama satırı silindi).
 */
export async function SustainabilitySection() {
  const { copy } = await getCopy();
  const media = await getHomeMedia();
  const cards = [
    {
      ...solutionIcons[0],
      title: copy.sustain.recycleTitle,
      description: copy.sustain.recycleText,
    },
    {
      ...solutionIcons[1],
      title: copy.sustain.biobased,
      description: copy.sustain.biobasedText,
    },
    {
      ...solutionIcons[2],
      title: copy.sustain.dopeDyed,
      description: copy.sustain.waterlessText,
    },
  ];

  return (
    <section
      className="py-20 sm:py-28"
      aria-labelledby="sustainability-title"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
              {copy.sustain.kicker}
            </p>

            <h2
              id="sustainability-title"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {copy.sustain.title}
            </h2>

            <p className="text-body mt-6 max-w-2xl text-base leading-8">
              {copy.sustain.lead}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                  <Sun aria-hidden="true" className="size-5" />
                </div>

                <h3 className="mt-4 font-semibold text-foreground">
                  {copy.sustain.energyTitle}
                </h3>

                <p className="text-body mt-2 text-sm leading-7">
                  {copy.sustain.energyText}
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue">
                  <Leaf aria-hidden="true" className="size-5" />
                </div>

                <h3 className="mt-4 font-semibold text-foreground">
                  {copy.sustain.productionTitle}
                </h3>

                <p className="text-body mt-2 text-sm leading-7">
                  {copy.sustain.productionText}
                </p>
              </article>
            </div>

            <LocaleLink
              href="/kurumsal/surdurulebilirlik"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "mt-8 self-start",
              })}
            >
              {copy.sustain.cta}
              <ArrowRight aria-hidden="true" />
            </LocaleLink>
          </div>

          {/* Fotoğraf 1024×682. Kart aynı oranda; stretch boyu uzatıp kırpmasın. */}
          <div className="relative aspect-[1024/682] self-center overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={media.sustainImage}
              alt={copy.chrome.sustainAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={82}
              className="object-contain object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
                {copy.sustain.plant}
              </p>
              <p className="mt-2 max-w-sm text-lg font-medium text-white">
                {copy.sustain.plantText}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-brand-orange uppercase">
              {copy.sustain.techKicker}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {copy.sustain.techTitle}
            </h3>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cards.map((solution) => {
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

                  {/* Turuncu başlık: eski kicker rengi, kicker satırı yok */}
                  <h4 className="mt-5 text-xl font-semibold text-brand-orange">
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