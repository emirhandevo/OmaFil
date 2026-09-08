import Image from "next/image";
import Link from "next/link";
import {navLinks, site} from "@/config/site";
import {buttonVariants} from "@/components/ui/button";

/**
 * tüm kamu sayfalarının üst çubuğu
 * menü site.ts -> navlinks; buraya href yazma
 */
export function Header() {
    return (
        <header className="border-b border-border bg-gradient-to-r from-zinc-300 to-[#0a1628]">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center">
                <Image 
                src={site.logo}
                alt={site.name}
                width={270}
                height={50}
                priority
                />
                </Link>

                <nav className="flex items-center gap-1" aria-label="Ana menü">
                    {navLinks.map((item) => (
                        <Link
                        key={item.href}
                        href={item.href}
                        className={buttonVariants({variant: "ghost", size: "sm" })}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}