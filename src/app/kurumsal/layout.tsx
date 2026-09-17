import { SiteShell } from "@/components/ui/layout/site-shell";

// Header ve Footer alt sayfalarda bir kez sarılır.
export default function KurumsalLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
