"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/i18n/locales";
import type { ProductFamily } from "@/content/catalog/types";

type BrowseState = {
  family: ProductFamily;
  setFamily: (next: ProductFamily) => void;
};

const BrowseContext = createContext<BrowseState | null>(null);

const STORAGE_KEY = "omafil:urunlerimiz-browse";

export function isProductListPath(pathname: string) {
  return stripLocale(pathname) === "/urunlerimiz";
}

export function isProductDetailPath(pathname: string) {
  return /^\/urunlerimiz\/[^/]+$/.test(stripLocale(pathname));
}

type StoredBrowse = {
  family: ProductFamily;
  scrollY: number;
};

function isFamily(value: unknown): value is ProductFamily {
  return (
    value === "all" ||
    value === "nylon6" ||
    value === "nylon66" ||
    value === "polyester"
  );
}

function readStored(): StoredBrowse | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredBrowse;
    if (!isFamily(parsed.family)) return null;
    return {
      family: parsed.family,
      scrollY: Number(parsed.scrollY) || 0,
    };
  } catch {
    return null;
  }
}

function writeStored(next: StoredBrowse) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* gizli sekme / kota */
  }
}

/**
 * Liste ve detay aynı layout’ta kalır: filtre React state’te durur.
 * Detaydan listeye dönünce Next tepeye kaydırır; biz son Y’yi geri yazarız.
 */
export function ProductsBrowseProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [family, setFamilyState] = useState<ProductFamily>("all");
  const familyRef = useRef(family);
  const scrollYRef = useRef(0);
  const wasListRef = useRef(isProductListPath(pathname));
  const didHydrateRef = useRef(false);
  // Next detaya giderken scrollTop=0 atar. O sıçramayı kayda yazma.
  const suppressZeroRef = useRef(false);

  familyRef.current = family;

  function persist(scrollY = scrollYRef.current) {
    writeStored({ family: familyRef.current, scrollY });
  }

  function rememberScroll(y: number) {
    if (suppressZeroRef.current && y === 0 && scrollYRef.current > 0) return;
    scrollYRef.current = y;
    persist(y);
  }

  function setFamily(next: ProductFamily) {
    setFamilyState(next);
    writeStored({ family: next, scrollY: scrollYRef.current });
  }

  // Ürün linkine basıldığı anda Y’yi kilitle. Scroll olayı daha sonra 0 gelirse ezmesin.
  useEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    function onPointerDown(event: PointerEvent) {
      if (!isProductListPath(window.location.pathname)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href || !isProductDetailPath(href)) return;
      suppressZeroRef.current = true;
      scrollYRef.current = window.scrollY;
      persist(window.scrollY);
    }

    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      history.scrollRestoration = previousRestoration;
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  // Tam yüklemede (detay URL’si yenile, sonra geri) filtre kaybolmasın.
  useLayoutEffect(() => {
    if (didHydrateRef.current) return;
    didHydrateRef.current = true;
    const stored = readStored();
    if (!stored) return;
    setFamilyState(stored.family);
    scrollYRef.current = stored.scrollY;
  }, []);

  useEffect(() => {
    if (!isProductListPath(pathname)) return;

    function onScroll() {
      rememberScroll(window.scrollY);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useLayoutEffect(() => {
    const onList = isProductListPath(pathname);
    const leavingToDetail =
      wasListRef.current && isProductDetailPath(pathname);
    const returningToList = !wasListRef.current && onList;

    if (leavingToDetail) {
      suppressZeroRef.current = true;
      persist();
    }

    wasListRef.current = onList;
    if (!returningToList) return;

    const stored = readStored();
    const y = stored?.scrollY ?? scrollYRef.current;
    if (stored) setFamilyState(stored.family);
    scrollYRef.current = y;
    suppressZeroRef.current = true;

    // instant bazı tarayıcılarda ScrollBehavior değil; düz scrollTo her yerde durur.
    const apply = () => {
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
    };
    apply();

    // Next ve view transition kaydırmayı geç bitirebiliyor. Birkaç kare boyunca Y’de tut.
    let frames = 0;
    let raf = 0;
    const pump = () => {
      apply();
      frames += 1;
      if (frames < 24) {
        raf = window.requestAnimationFrame(pump);
        return;
      }
      suppressZeroRef.current = false;
      scrollYRef.current = y;
      persist(y);
    };
    raf = window.requestAnimationFrame(pump);

    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <BrowseContext.Provider value={{ family, setFamily }}>
      {children}
    </BrowseContext.Provider>
  );
}

export function useProductsBrowse() {
  const ctx = useContext(BrowseContext);
  if (!ctx) {
    throw new Error(
      "useProductsBrowse, ProductsBrowseProvider içinde kullanılmalı",
    );
  }
  return ctx;
}
