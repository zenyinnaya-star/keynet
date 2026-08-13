"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/lib/useCart";
import { useWishlist } from "@/lib/useWishlist";
import { useUser } from "@/lib/useUser";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { BrandMark, Wordmark } from "@/components/BrandMark";

function UserMenu() {
  const router = useRouter();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (!user) {
    return (
      <Link
        href="/login"
        className="hidden text-xs font-medium tracking-widest text-white/70 uppercase transition-colors hover:text-white sm:inline"
      >
        Log In
      </Link>
    );
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    "Account";

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={menuRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="text-xs font-medium tracking-widest text-white/70 uppercase transition-colors hover:text-white"
      >
        {displayName}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-3 w-40 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 py-1 shadow-2xl shadow-black/50"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-xs text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export function ShopHeader() {
  const pathname = usePathname();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
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
        "sticky top-0 z-20 flex items-center justify-between gap-6 px-6 py-6 transition-all duration-300 sm:px-10",
        scrolled
          ? "border-b border-white/10 bg-black/70 py-4 shadow-lg shadow-black/30 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Link href="/" className="group flex items-center gap-2.5">
        <BrandMark className="h-7 w-7 text-[var(--keynex-teal-bright)] transition-transform duration-300 group-hover:scale-105" />
        <Wordmark className="text-sm" />
      </Link>

      <nav className="hidden items-center gap-8 text-xs font-medium tracking-widest text-white/80 md:flex">
        <Link
          href="/"
          className={cn(
            "group relative py-1 uppercase transition-colors hover:text-white",
            pathname === "/" && "text-white",
          )}
        >
          Home
          <span
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100",
              pathname === "/" && "scale-x-100",
            )}
          />
        </Link>
        <Link
          href="/products"
          className={cn(
            "group relative py-1 uppercase transition-colors hover:text-white",
            pathname.startsWith("/products") && "text-white",
          )}
        >
          Our Products
          <span
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100",
              pathname.startsWith("/products") && "scale-x-100",
            )}
          />
        </Link>
        <Link
          href="/heritage"
          className={cn(
            "group relative py-1 uppercase transition-colors hover:text-white",
            pathname === "/heritage" && "text-white",
          )}
        >
          Heritage
          <span
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100",
              pathname === "/heritage" && "scale-x-100",
            )}
          />
        </Link>
        <Link
          href="/contact"
          className={cn(
            "group relative py-1 uppercase transition-colors hover:text-white",
            pathname === "/contact" && "text-white",
          )}
        >
          Contacts
          <span
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100",
              pathname === "/contact" && "scale-x-100",
            )}
          />
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <UserMenu />
        <Link
          href="/wishlist"
          aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          <span aria-hidden>♡</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link
          href="/cart"
          aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          <span aria-hidden>🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
