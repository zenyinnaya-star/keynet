"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Yesteryear } from "next/font/google";
import { cn, formatPrice } from "@/lib/utils";
import { ShopHeader } from "@/components/products/ShopHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { WishlistButton } from "@/components/products/WishlistButton";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { getProductBySlug, type Product } from "@/lib/products";

const script = Yesteryear({ subsets: ["latin"], weight: "400" });

const SLIDES: {
  slug: string;
  eyebrow: string;
  headline: string;
  scriptWord: string;
}[] = [
  { slug: "typeflow", eyebrow: "New Arrival", headline: "Type without", scriptWord: "friction" },
  { slug: "midnight-black", eyebrow: "Most Popular", headline: "Hear it", scriptWord: "different" },
  { slug: "slate-grey", eyebrow: "Everyday Comfort", headline: "Comfort that", scriptWord: "lasts" },
  { slug: "ultra-view-x", eyebrow: "Effortless Clarity", headline: "See every", scriptWord: "detail" },
  { slug: "vantage-wireless", eyebrow: "Now Available", headline: "Play without", scriptWord: "wires" },
];

const TEASER_SLUGS = ["midnight-black", "typeflow", "ultra-view-x", "vantage-wireless"];

const PILLARS = [
  {
    n: "01",
    title: "Driver Precision",
    body: "Every driver is tuned in-house to keep mids clear and highs controlled, so nothing gets lost when things get loud.",
  },
  {
    n: "02",
    title: "Tactile Control",
    body: "Low-profile switches and weighted builds put every adjustment under your fingertips, no digging through menus.",
  },
  {
    n: "03",
    title: "Built to Last",
    body: "Matte finishes and reinforced hinges are chosen for years of daily use, not just the unboxing photo.",
  },
];

const AUTO_ADVANCE_MS = 9000;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const goToSlide = (index: number) => {
    setActiveSlide((index + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[activeSlide];
  const product = getProductBySlug(slide.slug)!;

  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      {/* Hero */}
      <section className="bg-grain relative flex min-h-[calc(100vh-88px)] items-center overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(19,184,166,0.15),transparent_60%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left — editorial copy */}
            <div className="space-y-6 lg:col-span-7">
              <div key={slide.slug} className="animate-fade-in-up space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-[var(--keynex-muted)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--keynex-teal)] animate-pulse" />
                  <span className="font-bold tracking-[0.2em] text-white uppercase">{slide.eyebrow}</span>
                </div>

                <h1 className="text-5xl leading-[0.98] font-black tracking-tight text-white uppercase sm:text-7xl lg:text-8xl">
                  {slide.headline}
                  <br />
                  <span
                    className={cn(
                      script.className,
                      "text-6xl normal-case tracking-normal text-[var(--keynex-teal-bright)] drop-shadow-[0_0_25px_rgba(19,184,166,0.35)] sm:text-8xl lg:text-9xl",
                    )}
                  >
                    {slide.scriptWord}
                  </span>
                </h1>

                <p className="max-w-lg text-sm leading-relaxed text-[var(--keynex-muted)] sm:text-base">
                  {product.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="rounded-full bg-[var(--keynex-teal)] px-8 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition hover:bg-[var(--keynex-teal-bright)] active:scale-95"
                  >
                    Inspect this build
                  </Link>
                  <Link
                    href="/products"
                    className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-white uppercase transition hover:text-[var(--keynex-teal-bright)]"
                  >
                    <span>Browse all series</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === activeSlide}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeSlide === idx ? "w-10 bg-[var(--keynex-teal)]" : "w-3 bg-white/20 hover:bg-white/40",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Right — immersive product panel */}
            <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
              <div className="diagonal-cut relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[var(--keynex-panel)] shadow-2xl">
                <span className="pointer-events-none absolute top-1/2 -right-6 z-0 -translate-y-1/2 -translate-x-[6%] text-[clamp(8rem,22vw,18rem)] leading-none font-black tracking-[-0.14em] text-white/[0.05] uppercase select-none">
                  {product.watermark}
                </span>
                <span className="signal-line pointer-events-none absolute top-6 left-6 z-10 h-px w-16 bg-[var(--keynex-teal)] shadow-[24px_0_0_rgba(19,184,166,.18)]" />

                <div key={slide.slug} className="animate-fade-in-up absolute inset-0 z-10 flex items-center justify-center p-10">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={`${product.name} product photo`}
                      width={product.imageWidth}
                      height={product.imageHeight}
                      sizes="(min-width: 1024px) 420px, 320px"
                      priority
                      style={{ filter: product.filter }}
                      className="animate-float h-full w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
                    />
                  ) : (
                    <span className="text-xs font-medium tracking-widest text-white/30 uppercase">
                      Image coming soon
                    </span>
                  )}
                </div>

                <div className="absolute right-6 bottom-6 left-6 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/80 p-4 backdrop-blur-md">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--keynex-teal-bright)] uppercase">
                      Featured Series
                    </span>
                    <h4 className="mt-0.5 text-xs font-bold tracking-wider text-white uppercase">{slide.eyebrow}</h4>
                  </div>
                  <span className="text-sm font-bold text-white">{formatPrice(product.price)}</span>
                </div>
              </div>

              <div className="absolute -bottom-6 right-6 z-30 flex items-center gap-2 lg:right-0">
                <button
                  type="button"
                  onClick={() => goToSlide(activeSlide - 1)}
                  aria-label="Previous slide"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[var(--keynex-teal)]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeSlide + 1)}
                  aria-label="Next slide"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[var(--keynex-teal)]"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog teaser */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--keynex-teal-bright)] uppercase">
              Hardware Catalog
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">The Signal Series</h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-white uppercase transition hover:text-[var(--keynex-teal-bright)]"
          >
            <span>View full catalog</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-5">
          {TEASER_SLUGS.map((slug, index) => {
            const teaserProduct = getProductBySlug(slug);
            if (!teaserProduct) return null;
            return (
              <Reveal
                key={slug}
                delayMs={index * 60}
                className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:translate-y-8"}
              >
                <TeaserCard product={teaserProduct} wide={index % 2 === 0} />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why keynex */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <Reveal className="mb-12 max-w-xl space-y-3">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--keynex-teal-bright)] uppercase">
            Why keynex
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
            Hardware built to be lived with, not just unboxed.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.n} delayMs={index * 60}>
              <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-[var(--keynex-panel)] p-8">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--keynex-teal)]/15 font-bold text-[var(--keynex-teal-bright)]">
                  {pillar.n}
                </div>
                <h3 className="text-base font-bold tracking-wider text-white uppercase">{pillar.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--keynex-muted)]">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
        <Reveal className="glow-teal rounded-2xl border border-white/15 bg-[var(--keynex-panel)] p-8 text-center sm:p-14">
          <h3 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
            Ready to build your setup?
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-[var(--keynex-muted)] sm:text-sm">
            Browse the full lineup — headphones, keyboard, monitor, and wireless headset — and put
            together a rig that actually sounds and feels intentional.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-[var(--keynex-teal)] px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-black uppercase transition hover:bg-[var(--keynex-teal-bright)]"
          >
            View Catalog
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

function TeaserCard({ product, wide }: { product: Product; wide: boolean }) {
  return (
    <div className="group relative flex flex-col overflow-hidden border-b border-white/15 bg-[var(--keynex-panel)] transition duration-300 hover:border-[var(--keynex-teal)] hover:shadow-[0_18px_40px_rgba(19,184,166,0.12)]">
      <div className="absolute top-4 right-4 z-20">
        <WishlistButton slug={product.slug} />
      </div>
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          "diagonal-cut-tight relative block overflow-hidden bg-black",
          wide ? "aspect-[5/3]" : "aspect-[4/3]",
        )}
      >
        <span className="pointer-events-none absolute -bottom-1 -left-5 z-0 text-[clamp(5rem,14vw,10rem)] leading-none font-black tracking-[-0.14em] text-white/[0.06] uppercase select-none">
          {product.watermark}
        </span>
        <span className="signal-line pointer-events-none absolute top-6 left-6 z-10 h-px w-12 bg-[var(--keynex-teal)]" />
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} product photo`}
            width={product.imageWidth}
            height={product.imageHeight}
            sizes="(min-width: 768px) 45vw, 90vw"
            style={{ filter: product.filter }}
            className="relative z-[1] h-full w-full object-contain p-8 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="relative z-[1] flex h-full items-center justify-center text-xs font-medium tracking-widest text-white/30 uppercase">
            Image coming soon
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <Link href={`/products/${product.slug}`} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--keynex-teal-bright)] uppercase">
              {product.specs[0]?.label ?? "Studio Grade"}
            </span>
            <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
          </div>
          <h3 className="text-lg font-bold tracking-wider text-white uppercase transition group-hover:text-[var(--keynex-teal-bright)]">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--keynex-muted)]">{product.tagline}</p>
        </Link>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="text-[11px] font-bold tracking-wider text-[var(--keynex-muted)] uppercase transition hover:text-white"
          >
            View details →
          </Link>
          <AddToCartButton slug={product.slug} />
        </div>
      </div>
    </div>
  );
}
