"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Our Products" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 border-b transition-all duration-300",
        scrolled
          ? "border-black/[.08] bg-white/80 backdrop-blur-md dark:border-white/[.145] dark:bg-black/70"
          : "border-transparent bg-white dark:bg-black",
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          keynet
        </Link>
        <nav className="flex gap-6 text-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-1 transition-colors hover:text-zinc-950 dark:hover:text-zinc-50",
                  isActive
                    ? "text-zinc-950 dark:text-zinc-50"
                    : "text-zinc-600 dark:text-zinc-400",
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-zinc-950 dark:bg-zinc-50" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
