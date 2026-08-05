"use client";

import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { useWishlist } from "@/lib/useWishlist";

export function ShopHeader() {
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="flex items-center justify-between px-6 py-6 sm:px-10">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold">
          K
        </span>
        <span className="hidden text-sm font-semibold tracking-wide sm:inline">keynet</span>
      </Link>

      <nav className="hidden items-center gap-8 text-xs font-medium tracking-widest text-white/80 md:flex">
        <Link href="/" className="uppercase transition-colors hover:text-white">
          Home
        </Link>
        <Link href="/products" className="uppercase transition-colors hover:text-white">
          Our Products
        </Link>
        <Link href="/heritage" className="uppercase transition-colors hover:text-white">
          Heritage
        </Link>
        <Link href="/contact" className="uppercase transition-colors hover:text-white">
          Contacts
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden text-xs font-medium tracking-widest text-white/70 uppercase transition-colors hover:text-white sm:inline"
        >
          Log In
        </Link>
        <Link
          href="/wishlist"
          aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          <span aria-hidden>♡</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
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
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
