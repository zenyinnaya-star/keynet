"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

// The home page ("/") and the products page ship their own full-bleed
// dark nav/footer as part of their design, so the shared light site
// chrome is skipped there.
const SELF_CHROMED_ROUTES = new Set(["/", "/products"]);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (SELF_CHROMED_ROUTES.has(pathname ?? "")) {
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
