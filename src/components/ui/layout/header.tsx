"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navLinks, site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/** Soft navigate sonrası focus-within dropdown’u açık tutmasın */
function blurActive() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

export function Header() {
  // Mobil menü açık/kapalı durumu
  const [isOpen, setIsOpen] = useState(false);
  // Masaüstü Kurumsal dropdown: tıklanınca hover/focus yüzünden açık kalmasın
  const [corpForcedClosed, setCorpForcedClosed] = useState(false);
  // Headerın tamamını saran ref - dışına tıklamayı tespit etmek için
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Route değişince mobilde menüyü kapat + masaüstü dropdown odağını temizle
  useEffect(() => {
    setIsOpen(false);
    setCorpForcedClosed(true);
    blurActive();
  }, [pathname]);

  useEffect(() => {
    // menü kapalıyken dinleyici eklemeye gerek yok
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function closeCorpDropdown() {
    setCorpForcedClosed(true);
    blurActive();
  }

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setIsOpen(false)}>
          <Image
            src={site.logo}
            alt={site.name}
            width={270}
            height={50}
            className="h-auto w-44 lg:w-[270px]"
            priority
          />
        </Link>

        {/* Masaüstü menü — mobilde gizli */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {navLinks.map((item) =>
            "children" in item ? (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setCorpForcedClosed(false)}
                onMouseLeave={() => setCorpForcedClosed(false)}
              >
                <Link
                  href={item.href}
                  onClick={closeCorpDropdown}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" className="size-4" />
                </Link>
                {/* Hover ve klavye odağında açılır. Tıklanınca force-close. */}
                <div
                  className={
                    corpForcedClosed
                      ? "absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2"
                      : "absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2 group-focus-within:block group-hover:block"
                  }
                >
                  <ul className="min-w-52 rounded-xl border border-border bg-background p-2 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeCorpDropdown}
                          className="block rounded-md px-3 py-2 text-center text-sm text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
        {/* Hamburger buton — sadece mobilde görünür */}
        <button
          type="button"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex size-10 items-center justify-center rounded-md text-foreground lg:hidden"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
        </div>
      </div>

      {/* Mobil açılır menü — isOpen true olunca render edilir */}
      {isOpen && (
        <nav
          aria-label="Mobil menü"
          className="border-t border-border bg-background px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                >
                  {item.label}
                </Link>
                {"children" in item && (
                  <ul className="pb-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-md px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}