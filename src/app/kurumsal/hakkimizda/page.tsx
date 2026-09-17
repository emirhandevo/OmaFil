import type { Metadata } from "next";
import { Factory, Globe, MapPin, Ship } from "lucide-react";
import { contact, site } from "@/config/site";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "OMA POLİMER A.Ş. kuruluş hikâyesi. Sultanhamam’dan iplik ithalatı, üretimi ve ihracatına.",
  alternates: { canonical: "/kurumsal/hakkimizda" },
};

const pillars = [
  {
    title: "İthalat",
    description: "Avrupa ve Uzak Doğu’dan özel tip hammadde temin ediyoruz.",
    icon: Ship,
  },
  {
    title: "Üretim",
    description: "Naylon 6, Naylon 66 ve polyester gipe ipliği üretiyoruz.",
    icon: Factory,
  },
  {
    title: "İhracat",
    description: "Doğu–Orta Avrupa, Orta Doğu ve Kuzey Afrika pazarlarına ulaşıyoruz.",
    icon: Globe,
  },
] as const;

// Metrekare ve ton yazılmıyor. Bu rakamlar sayfalar arasında çelişiyordu.
const milestones = [
  { year: "1999", title: "Kuruluş", text: "İstanbul Sultanhamam’da iplik ticaretiyle başladık." },
  { year: "2000", title: "İhracat", text: "Yurtdışı bağlantılarımızı kurduk." },
  { year: "2013", title: "İlk tesis", text: "İlk üretim tesisimizi kurduk." },
  { year: "2018", title: "Kapasite", text: "Makine parkımızı genişlettik." },
  { year: "2021", title: "Gipe tesisi", text: "Tokat–Erbaa’da gipe iplik tesisini hayata geçirdik." },
  { year: "2023", title: "GRS", text: "Geri dönüştürülmüş iplik üretimini GRS ile belgeledik." },
] as const;

export default function HakkimizdaPage() {
  return (
    <CorporateFrame
      path="/kurumsal/hakkimizda"
      title="Hakkımızda"
      description="İplik ticaretinden üretime uzanan yolculuk, sürekli gelişim ilkesiyle devam ediyor."
    >
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="max-w-3xl space-y-5 leading-7 text-muted-foreground">
          <p>
            Yıllarca İstanbul’da tekstil piyasasının kalbi olan Sultanhamam’da
            iplik satışıyla başlayan iş hayatımız, sürekli gelişim ilkemizle
            devam etti. 2000’li yıllarda değişen ticarete uyum sağlamak için{" "}
            {site.legalName}’yi kurduk.
          </p>
          <p>
            İç ticarette olduğu kadar dış ticarette de güçlü olmak gerekir
            düşüncesiyle yurtdışı bağlantılarımızı sağlamlaştırdık. Bugün iplik
            ithalatı, üretimi ve ihracatını birlikte sürdürüyoruz.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((item) => (
            <li key={item.year} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-brand-orange">{item.year}</p>
              <h2 className="mt-2 font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <Icon aria-hidden="true" className="size-5 text-brand-orange" />
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20" aria-labelledby="offices-title">
        <h2 id="offices-title" className="text-2xl font-semibold tracking-tight">
          İletişim noktalarımız
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contact.locations.map((place) => (
            <article key={place.label} className="rounded-2xl border border-border bg-card p-6">
              <MapPin aria-hidden="true" className="size-5 text-brand-orange" />
              <h3 className="mt-4 font-semibold">{place.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{place.address}</p>
              <a
                href={place.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-brand-orange hover:underline"
              >
                Haritada aç
              </a>
            </article>
          ))}
        </div>
      </section>
    </CorporateFrame>
  );
}
