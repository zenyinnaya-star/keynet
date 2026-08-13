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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="m20 20-4-4" />
    </svg>
  );
}

function HeartIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.5s-7.5-4.6-9.8-9.2C.7 7.9 2.3 4.5 5.6 3.8c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.3.7 4.9 4.1 3.4 7.5-2.3 4.6-9.8 9.2-9.8 9.2Z"
      />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L6 8Z" />
      <path strokeLinecap="round" d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

// header's account menu — shows a login link when signed out, or a dropdown with logout when signed in
function UserMenu() {
  const router = useRouter();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // closes the dropdown when clicking anywhere outside of it
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

  // prefer the user's first name, fall back to the part of their email before the @
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

// sticky site header with nav links, account menu, wishlist, and cart — used on every shop page
export function ShopHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // adds a background/shadow to the header once the page has scrolled a bit
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
          Catalog
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
          Support
          <span
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100",
              pathname === "/contact" && "scale-x-100",
            )}
          />
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const value = searchValue.trim();
            router.push(value ? `/products?search=${encodeURIComponent(value)}` : "/products");
          }}
          className="relative hidden lg:block"
        >
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search system..."
            aria-label="Search products"
            className="w-44 rounded-full border border-white/15 bg-white/[0.04] py-2 pr-9 pl-4 text-xs text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
          >
            <SearchIcon className="h-3.5 w-3.5" />
          </button>
        </form>
        <UserMenu />
        <Link
          href="/wishlist"
          aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          <HeartIcon className="h-4 w-4" filled={wishlistCount > 0} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link
          href="/cart"
          aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          <BagIcon className="h-4 w-4" />
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
