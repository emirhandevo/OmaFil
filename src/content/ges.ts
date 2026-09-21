/**
 * GES sayfası içeriği.
 * Metin: canlı omafil.com/ges-gunes-enerji-sistemi
 * Yeşil metrik bandı: patron örnek yapısı (rakamlar doğrulanmalı).
 */

export const gesIntro = {
  title: "Güneş Enerji Sistemimiz",
  subtitle: "Geleceğe değer katıyoruz, OmaFil üretimini güneşten alıyoruz",
  paragraphs: [
    "OmaFil olarak, sadece bugünün ihtiyaçlarını karşılayan kaliteli üretim yapmayı değil, yarınlara daha temiz bir dünya bırakmayı da sorumluluğumuz olarak görüyoruz. Bu vizyonla, üretim tesislerimizin çatılarını Güneş Enerji Sistemi (GES) ile donattık.",
    "Artık fabrikamızda gerçekleştirdiğimiz her üretimin arkasında doğanın saf gücü, güneşin temiz enerjisi var.",
  ],
} as const;

export const gesPillars = [
  {
    title: "%100 temiz enerji",
    text: "Üretim hatlarımızda kullanılan elektriğin büyük bir kısmını, doğrudan kendi çatımızdaki yüksek verimli güneş panellerinden elde ediyoruz.",
  },
  {
    title: "Daha az karbon ayak izi",
    text: "Fosil yakıtlara olan bağımlılığımızı azaltarak, her yıl binlerce ağacın doğaya sağladığı oksijene eşdeğer bir karbon tasarrufu sağlıyoruz.",
  },
  {
    title: "Yeşil sanayi öncülüğü",
    text: "Sektörümüzde sürdürülebilir enerji dönüşümüne öncülük ederek, gelecek nesillere daha yaşanabilir bir dünya bırakmayı hedefliyoruz.",
  },
] as const;

export const gesRespectBlock = {
  title: "Doğaya saygılı, sürdürülebilir üretim",
  text: "Teknolojiyi ve yenilikçi yatırımları işimizin merkezine koyarken, çevreye olan sorumluluğumuzu asla unutmuyoruz. Kendi enerjimizi kendimiz üreterek, karbon salınımımızı minimuma indiriyor ve ekolojik dengenin korunmasına aktif olarak katkı sağlıyoruz.",
} as const;

/** Patron örnek bandı — kapasite özeti */
export const gesCapacity = {
  title: "Yeşil enerjimizle üretiyoruz",
  text: "120.000 m² alan üzerine kurulu güneş enerji santralimiz ile yıllık 8 mW enerji üretiyoruz. Üretimimizde kullandığımız yenilenebilir enerji kaynaklarıyla gelecek nesillere yaşanabilir bir gelecek bırakmak için çalışıyoruz.",
} as const;

/**
 * Canlı kümülatif sayaç.
 *
 * Gerçek SCADA/API yokken: ölçüm anındaki kWh + ortalama üretim hızı ile
 * zamanla artar (patron örneğindeki “sürekli değişen” rakamlar).
 *
 * Fabrikadan gerçek kümülatif gelince sadece measuredAt + energyKwhAtMeasure güncelle.
 * kwhPerSecond ≈ kurulu güç (kW) × kapasite faktörü / 3600
 *   örn. 8000 kW × 0.16 / 3600 ≈ 0.356 kWh/sn
 */
export const gesLiveCounter = {
  /** Bu anda aşağıdaki kWh değeri geçerliydi (Türkiye saati) */
  measuredAt: "2026-09-21T12:00:00+03:00",
  /** O andaki kümülatif üretim (kWh) — patron örnek başlangıç */
  energyKwhAtMeasure: 19_729_964,
  /** Ortalama üretim hızı (kWh / saniye) */
  kwhPerSecond: 0.356,
  /**
   * Dönüşüm katsayıları (patron örnek oranları korunur).
   * ton CO₂ / kWh  ve  ağaç / ton CO₂
   */
  tonsCo2PerKwh: 9_864.9824 / 19_729_964,
  treesPerTonCo2: 24_070.55583 / 9_864.9824,
} as const;

/** Metrik kartlarının etiket / görsel / format bilgisi (değerler canlı hesaplanır) */
export const gesMetrics = [
  {
    id: "energy" as const,
    label: "Ürettiğimiz güneş enerjisi (kW)",
    decimals: 2,
    suffix: "",
    image: "/images/ges/01.webp",
    imageAlt: "OmaFil tesisinde güneş panelleri",
  },
  {
    id: "carbon" as const,
    label: "Tasarruf edilen karbon emisyonu (ton)",
    decimals: 4,
    suffix: "CO₂",
    image: "/images/ges/05.webp",
    imageAlt: "Güneş enerjisi üretimi",
  },
  {
    id: "trees" as const,
    label: "Kurtarılan ağaç sayısı (ad)",
    decimals: 5,
    suffix: "",
    image: "/images/ges/10.webp",
    imageAlt: "Doğal çevre ve sürdürülebilir üretim",
  },
] as const;

/** nowMs anındaki üç metrik değeri */
export function computeGesMetrics(nowMs = Date.now()) {
  const epoch = Date.parse(gesLiveCounter.measuredAt);
  const elapsedSec = Math.max(0, (nowMs - epoch) / 1000);
  const energyKwh =
    gesLiveCounter.energyKwhAtMeasure +
    elapsedSec * gesLiveCounter.kwhPerSecond;
  const carbonTons = energyKwh * gesLiveCounter.tonsCo2PerKwh;
  const trees = carbonTons * gesLiveCounter.treesPerTonCo2;

  return {
    energy: energyKwh,
    carbon: carbonTons,
    trees,
  };
}

export const gesGallery = [
  { src: "/images/ges/01.webp", alt: "GES panelleri — görünüm 1" },
  { src: "/images/ges/02.webp", alt: "GES panelleri — görünüm 2" },
  { src: "/images/ges/03.webp", alt: "GES panelleri — görünüm 3" },
  { src: "/images/ges/04.webp", alt: "GES panelleri — görünüm 4" },
  { src: "/images/ges/05.webp", alt: "GES panelleri — görünüm 5" },
  { src: "/images/ges/06.webp", alt: "GES panelleri — görünüm 6" },
  { src: "/images/ges/07.webp", alt: "GES panelleri — görünüm 7" },
  { src: "/images/ges/08.webp", alt: "GES panelleri — görünüm 8" },
  { src: "/images/ges/09.webp", alt: "GES panelleri — görünüm 9" },
  { src: "/images/ges/10.webp", alt: "GES panelleri — görünüm 10" },
] as const;
