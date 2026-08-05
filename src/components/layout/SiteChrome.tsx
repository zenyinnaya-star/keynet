"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

// These routes ship their own full-bleed dark nav/footer as part of their
// design, so the shared light site chrome is skipped there.
const SELF_CHROMED_ROUTES = new Set(["/", "/heritage", "/cart", "/wishlist"]);
const SELF_CHROMED_PREFIXES = ["/products"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  const isSelfChromed =
    SELF_CHROMED_ROUTES.has(pathname) ||
    SELF_CHROMED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isSelfChromed) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
