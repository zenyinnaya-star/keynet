import Link from "next/link";
import { BrandMark, Wordmark } from "@/components/BrandMark";

const SHOP_LINKS = [
  { href: "/products/midnight-black", label: "Midnight Black Headphones" },
  { href: "/products/typeflow", label: "Keynex TypeFlow" },
  { href: "/products/ultra-view-x", label: "Keynex Ultra View X" },
  { href: "/products/vantage-wireless", label: "Keynex Vantage Wireless" },
];

const COMPANY_LINKS = [
  { href: "/heritage", label: "Heritage" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log In" },
  { href: "/signup", label: "Sign Up" },
];

// site-wide footer with shop/company links, shown at the bottom of every page
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-10 sm:px-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-0">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark className="h-8 w-8 text-[var(--keynex-teal-bright)]" />
              <Wordmark />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-[var(--keynex-muted)]">
              Focused audio and gaming peripherals engineered for people who treat their
              setup as an intentional acoustic instrument. Designed in the dark.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="h-2 w-2 rounded-full bg-[var(--keynex-teal)] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--keynex-teal-bright)] uppercase">
                System Signal Online
              </span>
            </div>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">System</h4>
            <ul className="space-y-2 text-xs text-[var(--keynex-muted)]">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:col-span-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Collective</h4>
            <ul className="space-y-2 text-xs text-[var(--keynex-muted)]">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[11px] text-[var(--keynex-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} keynex. All rights reserved. Demo storefront.</p>
          <div className="flex items-center gap-6">
            <span>Privacy</span>
            <span>Warranty</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
