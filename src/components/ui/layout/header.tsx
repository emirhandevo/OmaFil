"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useCopy } from "@/components/i18n/locale-provider";
import { navLinks, site } from "@/config/site";
import { navLabel } from "@/i18n/labels";
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
  const copy = useCopy();

  // Route değişince mobilde menüyü kapat + masaüstü dropdown odağını temizle
  useEffect(() => {
    setIsOpen(false);
    setCorpForcedClosed(true);
    blurActive();
  }, [pathname]);

  useEffect(() => {
    // Menü açıkken sayfa kaymasın; kaydırma nav kutusunda kalsın.
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

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
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-3 px-4">
        <LocaleLink href="/" className="flex shrink-0 items-center" onClick={() => setIsOpen(false)}>
          <Image
            src={site.logo}
            alt={site.name}
            width={270}
            height={50}
            className="h-auto w-36 lg:w-44 xl:w-56"
            priority
          />
        </LocaleLink>

        {/* Masaüstü menü — mobilde gizli */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label={copy.nav.main}>
          {navLinks.map((item) =>
            "children" in item ? (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setCorpForcedClosed(false)}
                onMouseLeave={() => setCorpForcedClosed(false)}
              >
                <LocaleLink
                  href={item.href}
                  onClick={closeCorpDropdown}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "px-2 xl:px-3",
                  })}
                >
                  {navLabel(item.href, copy)}
                  <ChevronDown aria-hidden="true" className="size-4" />
                </LocaleLink>
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
                        <LocaleLink
                          href={child.href}
                          onClick={closeCorpDropdown}
                          className="block rounded-md px-3 py-2 text-center text-sm text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
                        >
                          {navLabel(child.href, copy)}
                        </LocaleLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <LocaleLink
                key={item.href}
                href={item.href}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "px-2 xl:px-3",
                })}
              >
                {navLabel(item.href, copy)}
              </LocaleLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        {/* Hamburger buton — sadece mobilde görünür */}
        <button
          type="button"
          aria-label={isOpen ? copy.nav.closeMenu : copy.nav.openMenu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange lg:hidden"
        >
          {/* Üç çizgi aynı yerde döner; ikon değişimi zıplamaz */}
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ease-in-out motion-reduce:transition-none ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition duration-300 ease-in-out motion-reduce:transition-none ${
                isOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ease-in-out motion-reduce:transition-none ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        </div>
      </div>

      {/* Mobil açılır menü — isOpen true olunca render edilir */}
      {isOpen && (
        <nav
          aria-label={copy.nav.mobile}
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-y-contain border-t border-border bg-background px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <LocaleLink
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
                >
                  {navLabel(item.href, copy)}
                </LocaleLink>
                {"children" in item && (
                  <ul className="pb-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <LocaleLink
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-md px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
                        >
                          {navLabel(child.href, copy)}
                        </LocaleLink>
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