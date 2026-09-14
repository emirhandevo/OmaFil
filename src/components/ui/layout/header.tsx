"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  // Mobil menü açık/kapalı durumu
  const [isOpen, setIsOpen] = useState(false);
  // Headerın tamamını saran ref - dışına tıklamayı tespit etmek için
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // menü kapalıyken dinleyici eklemeye gerek yok
    if (!isOpen) return;

    function handleClickOutside(e:MouseEvent) {
        if (headerRef.current && !headerRef.current.contains(e.target as Node)){
            setIsOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-white/10 bg-zinc-900">
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
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger buton — sadece mobilde görünür */}
        <button
          type="button"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex size-10 items-center justify-center rounded-md text-white lg:hidden"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobil açılır menü — isOpen true olunca render edilir */}
      {isOpen && (
        <nav
          aria-label="Mobil menü"
          className="border-t border-white/10 bg-zinc-900 px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}