/**
 * Aynı yerler, iki tema.
 * Açıkta beyaz üstünde turuncu. Koyuda siyah üstünde gece mavisi.
 * Lekeler küçük, aralıklı ve aynı hizada değil.
 */
export function SidePaintSpots() {
  return (
    <>
      <div className="absolute top-[7%] -left-3 size-24 rounded-full bg-[#f19000]/45 blur-2xl sm:size-32 dark:bg-[#1e355d]" />
      <div className="absolute top-[16%] left-[7%] size-20 rounded-full bg-[#e07c00]/40 blur-2xl sm:size-28 dark:bg-[#163a6d]" />
      <div className="absolute top-[38%] left-[2%] size-16 rounded-full bg-[#ffb04a]/50 blur-2xl sm:size-24 dark:bg-[#12243c]" />
      <div className="absolute top-[55%] -left-6 size-24 rounded-full bg-[#f19000]/40 blur-2xl sm:size-28 dark:bg-[#1e355d]" />
      <div className="absolute top-[73%] left-[9%] size-16 rounded-full bg-[#e07c00]/45 blur-2xl sm:size-24 dark:bg-[#163a6d]" />
      <div className="absolute top-[90%] left-[1%] size-20 rounded-full bg-[#ffb04a]/40 blur-2xl sm:size-28 dark:bg-[#12243c]" />
      <div className="absolute top-[4%] right-[8%] size-16 rounded-full bg-[#f19000]/40 blur-2xl sm:size-24 dark:bg-[#163a6d]" />
      <div className="absolute top-[22%] -right-2 size-24 rounded-full bg-[#e07c00]/45 blur-2xl sm:size-32 dark:bg-[#1e355d]" />
      <div className="absolute top-[41%] right-[6%] size-20 rounded-full bg-[#ffb04a]/45 blur-2xl sm:size-24 dark:bg-[#12243c]" />
      <div className="absolute top-[63%] right-[1%] size-16 rounded-full bg-[#f19000]/40 blur-2xl sm:size-28 dark:bg-[#163a6d]" />
      <div className="absolute top-[81%] -right-5 size-20 rounded-full bg-[#e07c00]/40 blur-2xl sm:size-24 dark:bg-[#1e355d]" />
    </>
  );
}
