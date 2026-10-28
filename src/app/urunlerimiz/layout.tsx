import type { ReactNode } from "react";
import { ProductsBrowseProvider } from "@/components/sections/products-browse";

/**
 * Liste ve [slug] bu layout’u paylaşır.
 * Client provider unmount olmaz → filtre/scroll detaydan sonra durur.
 */
export default function UrunlerimizLayout({ children }: { children: ReactNode }) {
  return <ProductsBrowseProvider>{children}</ProductsBrowseProvider>;
}
