"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = {
  id: string;
  name: string;
  watermark: string;
  filter: string;
};

const VARIANTS: Variant[] = [
  {
    id: "black",
    name: "Midnight Black",
    watermark: "MIDNIGHT",
    filter: "brightness(0.4) contrast(1.3) saturate(0.9)",
  },
  {
    id: "white",
    name: "Studio White",
    watermark: "STUDIO",
    filter: "brightness(1.55) contrast(0.85) saturate(0.3)",
  },
  {
    id: "grey",
    name: "Slate Grey",
    watermark: "SLATE",
    filter: "sepia(0.2) hue-rotate(190deg) saturate(1.1) brightness(0.95)",
  },
  {
    id: "red",
    name: "Crimson Red",
    watermark: "CRIMSON",
    filter: "sepia(1) saturate(4.5) hue-rotate(-52deg) brightness(0.85)",
  },
];

const PRICE = 249;

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", initials: "FB" },
  { href: "#", label: "Instagram", initials: "IG" },
  { href: "#", label: "Twitter", initials: "X" },
];

export function ProductShowcase() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [added, setAdded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const goToVariant = (index: number) => {
    setActiveVariant((index + VARIANTS.length) % VARIANTS.length);
    setAdded(false);
  };

  const handleBrowse = (index: number) => {
    setActiveVariant(index);
    setAdded(false);
    sliderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleAddToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const variant = VARIANTS[activeVariant];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold">
            K
          </span>
          <span className="hidden text-sm font-semibold tracking-wide sm:inline">
            keynet
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-xs font-medium tracking-widest text-white/80 md:flex">
          <Link href="/" className="uppercase transition-colors hover:text-white">
            Home
          </Link>
          <span className="uppercase text-white">Our Products</span>
          <Link href="/about" className="uppercase transition-colors hover:text-white">
            About
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        {/* Section header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              Shop
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Shop by Color
            </h1>
          </div>
          <p className="hidden text-xs text-white/40 sm:block">
            {VARIANTS.length} variants available
          </p>
        </div>

        {/* Variant grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VARIANTS.map((v, index) => (
            <button
              key={v.id}
              type="button"
              onClick={() => handleBrowse(index)}
              className={cn(
                "group relative min-h-[220px] overflow-hidden rounded-2xl bg-zinc-900/80 p-6 text-left transition-colors hover:bg-zinc-800",
                index === activeVariant && "ring-1 ring-red-500/60",
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -bottom-6 select-none text-7xl font-black tracking-tight text-white/5 uppercase sm:text-8xl"
              >
                {v.watermark}
              </span>

              <div className="relative z-10">
                <p className="text-xs text-white/40">Starting from</p>
                <p className="text-lg font-semibold text-red-500">${PRICE},-</p>
              </div>

              <div className="relative z-10 mt-24 sm:mt-28">
                <p className="text-lg font-semibold text-white">{v.name}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/60 uppercase group-hover:text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30">
                    −
                  </span>
                  Browse
                </span>
              </div>

              <Image
                src="/hero-headphones-3d.webp"
                alt={`${v.name} headphones preview`}
                width={280}
                height={329}
                sizes="180px"
                style={{ filter: v.filter }}
                className="pointer-events-none absolute right-0 bottom-0 h-40 w-auto object-contain opacity-90 sm:h-48"
              />
            </button>
          ))}
        </div>

        {/* Product showcase slider */}
        <div ref={sliderRef} className="mt-16 scroll-mt-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Slider
          </p>

          <div className="relative overflow-hidden rounded-3xl bg-zinc-900/80 pl-8 sm:pl-10">
            <div className="absolute inset-y-0 left-0 w-8 bg-red-600 sm:w-10">
              <span className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold tracking-[0.3em] whitespace-nowrap text-white/80 uppercase">
                Welcome to keynet
              </span>
            </div>

            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 -left-4 -translate-y-1/2 -translate-x-[6%] select-none text-[6rem] leading-none font-black tracking-tight text-white/5 uppercase sm:text-[9rem]"
            >
              {variant.watermark}
            </span>

            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div key={activeVariant} className="animate-fade-in-up relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-xs text-white/50">Shop / Headphones</p>
                  <p className="text-sm font-semibold text-white/70">${PRICE},-</p>
                </div>

                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Headphones — {variant.name}
                </h2>
                <p className="mt-3 text-2xl font-bold text-red-500">${PRICE},-</p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={cn(
                      "flex items-center gap-2 rounded-full py-2.5 pr-5 pl-4 text-xs font-bold transition-colors",
                      added
                        ? "bg-green-600 text-white"
                        : "bg-white text-black hover:bg-white/90",
                    )}
                  >
                    <span>{added ? "Added ✓" : "+ Add to cart"}</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-white/70 transition-all hover:border-red-500 hover:text-white"
                      >
                        {social.initials}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex justify-center lg:justify-end">
                <div key={activeVariant} className="animate-fade-in-up">
                  <Image
                    src="/hero-headphones-3d.webp"
                    alt={`${variant.name} headphones`}
                    width={420}
                    height={493}
                    sizes="(min-width: 1024px) 380px, 300px"
                    style={{ filter: variant.filter }}
                    className="animate-float h-72 w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] sm:h-80"
                  />
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="relative z-10 flex items-center justify-end gap-4 px-8 pb-6 sm:px-12">
              <button
                type="button"
                aria-label="Previous variant"
                onClick={() => goToVariant(activeVariant - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 transition-all hover:scale-110 hover:border-white/50"
              >
                ‹
              </button>
              <span className="text-xs text-white/50">
                {activeVariant + 1} / {VARIANTS.length}
              </span>
              <button
                type="button"
                aria-label="Next variant"
                onClick={() => goToVariant(activeVariant + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 transition-all hover:scale-110 hover:border-white/50"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 text-[11px] text-white/40 uppercase sm:px-10">
        © 2026 keynet — All rights reserved
      </div>
    </div>
  );
}
