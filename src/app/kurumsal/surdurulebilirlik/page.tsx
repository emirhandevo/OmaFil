import type { Metadata } from "next";
import Image from "next/image";
import { Droplets, Recycle, Sprout, Sun } from "lucide-react";
import { site } from "@/config/site";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";

export const metadata: Metadata = {
  title: "Sürdürülebilirlik",
  description:
    "OmaFil sürdürülebilir iplik üretimi: güneş enerjisi, GRS belgeli geri dönüştürülmüş iplik ve su tüketimini azaltan boyama.",
  alternates: { canonical: "/kurumsal/surdurulebilirlik" },
};

const items = [
  {
    title: "Güneş enerjisi",
    text: "Tesis çatısındaki panellerle yenilenebilir enerjiden yararlanıyoruz.",
    icon: Sun,
  },
  {
    title: "Recycle iplikler",
    text: "UNIFI iş birliğiyle geri dönüştürülmüş kaynaklardan iplik geliştiriyoruz. 2023’te GRS belgesi alındı.",
    icon: Recycle,
  },
  {
    title: "Eco-Biopa",
    text: "Fosil kaynak kullanımını azaltmayı hedefleyen bio-bazlı polyamid iplik.",
    icon: Sprout,
  },
  {
    title: "Free-Dyed",
    text: "Su tüketimini azaltmaya odaklanan susuz boyama teknolojisi.",
    icon: Droplets,
  },
] as const;

export default function SurdurulebilirlikPage() {
  return (
    <CorporateFrame
      path="/kurumsal/surdurulebilirlik"
      title="Sürdürülebilirlik"
      description={`${site.legalName} üretimde çevre etkisini azaltmayı işin içine alır. Bu bir slogan değil, tesis ve ürün kararıdır.`}
    >
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 lg:grid-cols-2">
        <div className="space-y-5 leading-7 text-muted-foreground">
          <p>
           Bizim için sürdürülebilirlik, kaynağı verimli kullanmak ve ürünü buna göre geliştirmek demek.
          </p>
          <p>
            Güneş panelleriyle elde edilen enerji, geri dönüştürülmüş iplik
            ve su tüketimini azaltan boyama.
          </p>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/sustainability/dunya.webp"
            alt="Ormanla kaplı dünya görseli"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <Icon aria-hidden="true" className="size-5 text-brand-orange" />
              <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </article>
          );
        })}
      </section>
    </CorporateFrame>
  );
}
