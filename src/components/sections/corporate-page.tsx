import Link from "next/link";
import { ArrowRight, Factory, Globe, Ship } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

// Kart metinleri burada. JSX içine gömmüyorum, sonra tek yerden değişir.
const pillars = [
  {
    title: "İthalat",
    description:
      "Avrupa ve Uzak Doğu'dan temin ettiğimiz özel tip hammaddelerle ürün yelpazemizi genişletiyoruz.",
    icon: Ship,
  },
  {
    title: "Üretim",
    description:
      "İleri teknoloji ve teknik uzmanlığımızla ipliği yüksek kalite standartlarında üretiyoruz.",
    icon: Factory,
  },
  {
    title: "İhracat",
    description:
      "İç ticarette olduğu kadar dış ticarette de güçlü olmak için yurtdışı bağlantılarımızı sürdürüyoruz.",
    icon: Globe,
  },
] as const;

export function CorporatePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:pt-20">
        <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
          Kurumsal
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          OmaFil Hakkında
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          İplik ticaretinden üretime uzanan yolculuğumuz, sürekli gelişim ilkesiyle devam ediyor.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="max-w-3xl space-y-5 leading-7 text-muted-foreground">
          <p>
            Yıllarca İstanbul’da tekstil piyasasının kalbi olan Sultanhamam’da iplik satışıyla başlayan iş hayatımız, sürekli gelişim ilkemize dayanarak devam etti. 2000’li yıllarda değişen ticarete uyum sağlamak için OMA POLİMER A.Ş.’yi kurduk.
          </p>
          <p>
            İç ticarette olduğu kadar dış ticarette de güçlü olmak gerekir düşüncesiyle yurtdışı bağlantılarımızı sağlamlaştırdık. Bugün iplik ithalatı, üretimi ve ihracatını birlikte sürdürüyor, Avrupa ve Uzak Doğu’dan ithal ettiğimiz özel tip hammaddelerle müşterilerimize yeni ürünler sunuyoruz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20" aria-labelledby="pillars-title">
        <h2 id="pillars-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ne yapıyoruz
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-card/60 p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <Link
          href="/iletisim"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "mt-10",
          })}
        >
          İletişime Geçin
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}