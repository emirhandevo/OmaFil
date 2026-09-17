import type { Metadata } from "next";
import Image from "next/image";
import { contact } from "@/config/site";
import { CorporateFrame } from "@/components/sections/corporate/corporate-frame";

export const metadata: Metadata = {
  title: "Fabrikamız",
  description:
    "OmaFil gipe iplik üretim tesisi Tokat Erbaa’da. Naylon 6, Naylon 66 ve polyester gipe üretimi.",
  alternates: { canonical: "/kurumsal/fabrikamiz" },
};

// Geçici görseller. Kendi tesis fotolarını aynı yollara koyunca değişir.
// Giriş fotosu yok. Yeni fabrika görselleri gelince sadece bu dizi değişir.
const photos = [
  { src: "/images/hero/tesis/01.webp", alt: "OmaFil iplik üretim hattı" },
  { src: "/images/hero/tesis/03.webp", alt: "OmaFil tesis içi üretim alanı" },
  { src: "/images/hero/tesis/05.webp", alt: "OmaFil makine parkı" },
  { src: "/images/hero/tesis/07.webp", alt: "OmaFil üretim alanı" },
] as const;

const lines = ["Naylon 6", "Naylon 66", "Polyester gipe"] as const;

export default function FabrikamizPage() {
  const plant = contact.locations.find((place) => place.label.startsWith("Fabrika /"));

  return (
    <CorporateFrame
      path="/kurumsal/fabrikamiz"
      title="Fabrikamız"
      description="Tokat–Erbaa’daki tesisimiz, Avrupa’nın en büyük gipe iplik üretim tesisidir."
    >
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="max-w-3xl space-y-5 leading-7 text-muted-foreground">
          <p>
            Üretim Tokat Erbaa Organize Sanayi Bölgesi’nde. Tesiste Naylon 6,
            Naylon 66 ve polyester gipe iplik hatları var. Çatıdaki güneş
            enerjisi sistemi, üretimin enerji tarafına da dahil.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {lines.map((line) => (
            <li
              key={line}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {plant && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="text-2xl font-semibold tracking-tight">{plant.label}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{plant.address}</p>
          <a
            href={plant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-medium text-brand-orange hover:underline"
          >
            Tesisi haritada aç
          </a>
        </section>
      )}
    </CorporateFrame>
  );
}
