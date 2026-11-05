"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useCopy } from "@/components/i18n/locale-provider";
import { navLinks, site } from "@/config/site";
import { SiteLogo } from "@/components/ui/layout/site-logo";
import { navLabel } from "@/i18n/labels";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/**
 * NyLion link değil: tıklanınca sayfa değişmez.
 * Açık tema polimer SVG, koyu tema dark SVG. İkisi birden DOM'da durur.
 * className kutunun boyu ve hangi ekranda görüneceği. Tema sınıfı içeride.
 */
function NyLionLogo({ className, sizes }: { className: string; sizes: string }) {
  return (
    <span className={className}>
      <Image
        src={site.nylionLogo}
        alt="NyLion"
        width={402}
        height={133}
        sizes={sizes}
        className="h-full w-auto dark:hidden"
      />
      <Image
        src={site.nylionLogoDark}
        alt="NyLion"
        width={402}
        height={133}
        sizes={sizes}
        className="hidden h-full w-auto dark:block"
      />
    </span>
  );
}

/** Soft navigate sonrası focus-within dropdown’u açık tutmasın */
function blurActive() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

export function Header({
  logo,
  logoDark,
}: {
  logo: string;
  logoDark: string;
}) {
  // Mobil menü açık/kapalı durumu
  const [isOpen, setIsOpen] = useState(false);
  // Hamburger: Kurumsal alt linkleri kapalı başlar
  const [corpMobileOpen, setCorpMobileOpen] = useState(false);
  // Masaüstü: hover/odakla açık mı (aria-expanded için)
  const [corpDesktopOpen, setCorpDesktopOpen] = useState(false);
  // Headerın tamamını saran ref - dışına tıklamayı tespit etmek için
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const copy = useCopy();

  // Route değişince hamburger ve Kurumsal akordeon kapansın
  useEffect(() => {
    setIsOpen(false);
    setCorpMobileOpen(false);
    setCorpDesktopOpen(false);
    blurActive();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) setCorpMobileOpen(false);
  }, [isOpen]);

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

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-50 border-b border-border"
    >
      {/* Blur logonun atası değil. sm = 8px; logo bu katmanın üstünde boyanır. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background/70 backdrop-blur-md"
      />
      <div className="relative z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-3 sm:px-4">
        <LocaleLink href="/" className="flex shrink-0 items-center" onClick={() => setIsOpen(false)}>
          <SiteLogo
            priority
            src={logo}
            srcDark={logoDark}
            className="h-auto w-28 sm:w-36 lg:w-40 xl:w-52"
          />
        </LocaleLink>

        {/* Masaüstü menü — mobilde gizli. Boşluk iki logonun arasında kalır. */}
        <nav className="mx-4 hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" aria-label={copy.nav.main}>
          {navLinks.map((item) =>
            "children" in item ? (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setCorpDesktopOpen(true)}
                onMouseLeave={() => setCorpDesktopOpen(false)}
              >
                {/* Sayfaya gitmez. Hover / klavye odağında alt menü. */}
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={corpDesktopOpen}
                  onFocus={() => setCorpDesktopOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                      setCorpDesktopOpen(false);
                    }
                  }}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "px-2 xl:px-3",
                  })}
                >
                  {navLabel(item.href, copy)}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  />
                </button>
                <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2 group-focus-within:block group-hover:block">
                  <ul className="min-w-52 rounded-xl border border-border bg-background p-2 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <LocaleLink
                          href={child.href}
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

        <div className="flex shrink-0 items-center gap-1">
          {/* Telefon: NyLion sağda. justify-between boşluğu OmaFil ile bunun arasına verir. */}
          <NyLionLogo sizes="120px" className="me-2 inline-flex h-8 items-center sm:me-3 sm:h-9 lg:hidden" />
          {/* Menü ile dil arasında: çizgi, NyLion, çizgi. */}
          <span aria-hidden="true" className="mx-1 hidden h-8 w-px bg-border lg:block" />
          <NyLionLogo sizes="140px" className="hidden h-9 items-center lg:inline-flex xl:h-12 translate-y-2" />
          <span aria-hidden="true" className="mx-1 hidden h-8 w-px bg-border lg:block" />
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
          className="relative z-10 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-y-contain border-t border-border bg-background px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) =>
              "children" in item ? (
                <li key={item.href}>
                  {/* Hub sayfasına gitmez. Tık = alt linkleri aç/kapa. */}
                  <button
                    type="button"
                    aria-expanded={corpMobileOpen}
                    aria-controls="header-corp-submenu"
                    onClick={() => setCorpMobileOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
                  >
                    {navLabel(item.href, copy)}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 shrink-0 transition-transform duration-200 ${
                        corpMobileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {corpMobileOpen ? (
                    <ul id="header-corp-submenu" className="pb-2">
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
                  ) : null}
                </li>
              ) : (
                <li key={item.href}>
                  <LocaleLink
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/10 active:text-brand-orange"
                  >
                    {navLabel(item.href, copy)}
                  </LocaleLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}