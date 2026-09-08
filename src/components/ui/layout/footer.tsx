import {site} from "@/config/site";

export function Footer() {
    return(
        <footer className="mt-auto border-t border-border">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} {site.name}</p>
                <p>Endüstriyel iplik</p>
            </div>
        </footer>
    )
}