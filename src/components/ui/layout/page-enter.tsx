"use client";

import { useEffect, useState, type ReactNode } from "react";

// Yalnız tarayıcıda. İlk boyamadan sonra true olur.
let afterFirstPaint = false;

/**
 * Lighthouse ilk HTML'i ölçer. Orada opacity 0 olursa hero görünmez,
 * LCP header logosuna düşer ve buzlu bar yüzünden geç boyanır.
 * Fade yalnız sonraki geçişlerde.
 */
export function PageEnter({ children }: { children: ReactNode }) {
  const [animate] = useState(() => afterFirstPaint);

  useEffect(() => {
    // Strict mode efekti kurup hemen söker. Bayrak o ara true olursa
    // ilk açılış da solar ve LCP yine logoya düşer.
    const id = window.setTimeout(() => {
      afterFirstPaint = true;
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return <div className={animate ? "omafil-page-enter" : undefined}>{children}</div>;
}
