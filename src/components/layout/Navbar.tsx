"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu on Escape (links close it via onClick)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/en-construction" ? pathname === href : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/en-construction" aria-label="EN Construction home" className="relative block h-12 w-[170px]">
          <Image src="/images/en-construction-light.png" alt="EN Construction" fill sizes="170px" priority className="object-contain object-left" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined}
                className={cn("relative px-4 py-2 text-sm font-medium transition-colors hover:text-brand",
                  isActive(l.href) ? "text-brand after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:bg-brand" : "text-white/80")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-12 w-12 items-center justify-center md:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div id="mobile-menu" className={cn("grid transition-[grid-template-rows] duration-300 ease-out md:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <ul className="overflow-hidden bg-ink" inert={!open}>
          {nav.map((l) => (
            <li key={l.href} className="border-t border-white/10">
              <Link href={l.href} onClick={() => setOpen(false)} aria-current={isActive(l.href) ? "page" : undefined}
                className={cn("flex min-h-14 items-center px-5 text-base font-medium sm:px-8", isActive(l.href) ? "text-brand" : "text-white")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
