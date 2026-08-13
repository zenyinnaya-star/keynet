"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ShopHeader } from "./ShopHeader";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "./ProductGrid";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";
import { formatPrice } from "@/lib/utils";

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", initials: "FB" },
  { href: "#", label: "Instagram", initials: "IG" },
  { href: "#", label: "Twitter", initials: "X" },
];

export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToIndex = (index: number) => {
    setActiveIndex((index + PRODUCTS.length) % PRODUCTS.length);
  };

  const product = PRODUCTS[activeIndex];

  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        {/* Section header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">
              <span className="text-[var(--keynex-teal-bright)]">Shop</span>
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Our <span className="text-[var(--keynex-teal-bright)]">Products</span>
            </h1>
          </div>
          <p className="hidden text-xs text-white/40 sm:block">
            {PRODUCTS.length} variants available
          </p>
        </div>

        <Suspense fallback={null}>
          <ProductGrid />
        </Suspense>

        {/* Featured showcase */}
        <div className="mt-16 scroll-mt-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Featured
          </p>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 pl-8 sm:pl-10 border border-white/5 backdrop-blur-sm">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-b from-teal-600 to-teal-600/80 sm:w-10 shadow-[2px_0_15px_rgba(242,210,255,0.2)]">
              <span className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold tracking-[0.3em] whitespace-nowrap text-white/80 uppercase">
                Welcome to keynex
              </span>
            </div>

            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 -left-4 -translate-y-1/2 -translate-x-[6%] select-none text-[6rem] leading-none font-black tracking-tight text-white/5 uppercase sm:text-[9rem]"
            >
              {product.watermark}
            </span>

            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div key={activeIndex} className="animate-fade-in-up relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs text-white/50 transition-colors hover:text-white"
                  >
                    Shop / {product.name}
                  </Link>
                </div>

                <h2 className="text-3xl font-semibold sm:text-4xl">{product.name}</h2>
                <p className="mt-3 text-2xl font-bold text-teal-500">{formatPrice(product.price)}</p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
                  {product.tagline}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <AddToCartButton slug={product.slug} />
                  <WishlistButton slug={product.slug} />
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs font-semibold tracking-wide text-white/60 uppercase transition-colors hover:text-white"
                  >
                    View details →
                  </Link>

                  <div className="flex items-center gap-3">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-white/70 transition-all hover:border-teal-500 hover:text-white"
                      >
                        {social.initials}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex h-72 items-center justify-center sm:h-80 lg:justify-end">
                <div key={activeIndex} className="animate-fade-in-up">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={product.imageWidth}
                      height={product.imageHeight}
                      sizes="(min-width: 1024px) 380px, 300px"
                      style={{ filter: product.filter }}
                      className="animate-float h-72 w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] sm:h-80"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="animate-float flex h-72 w-56 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-xs font-medium tracking-widest text-white/30 uppercase backdrop-blur-sm sm:h-80 sm:w-64"
                    >
                      Image coming soon
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="relative z-10 flex items-center justify-end gap-4 px-8 pb-6 sm:px-12">
              <button
                type="button"
                aria-label="Previous product"
                onClick={() => goToIndex(activeIndex - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 transition-all hover:scale-110 hover:border-white/50"
              >
                ‹
              </button>
              <span className="text-xs text-white/50">
                {activeIndex + 1} / {PRODUCTS.length}
              </span>
              <button
                type="button"
                aria-label="Next product"
                onClick={() => goToIndex(activeIndex + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 transition-all hover:scale-110 hover:border-white/50"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
