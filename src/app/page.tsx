"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Yesteryear } from "next/font/google";
import { cn, formatPrice } from "@/lib/utils";
import { ShopHeader } from "@/components/products/ShopHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { TextEffect } from "@/components/core/text-effect";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from "@/components/core/morphing-dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from "@/components/core/carousel";
import ScrollExpand from "@/components/core/ScrollExpand";
import SpecularButton from "@/components/core/SpecularButton";
import { AnimatedIcon } from "@/components/core/AnimatedIcon";
import { WishlistButton } from "@/components/products/WishlistButton";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { getProductBySlug, type Product } from "@/lib/products";

const script = Yesteryear({ subsets: ["latin"], weight: "400" });

const SLIDES: {
  slug: string;
  eyebrow: string;
  headline: string;
  scriptWord: string;
  bg: string;
}[] = [
  {
    slug: "typeflow",
    eyebrow: "New Arrival",
    headline: "Type without",
    scriptWord: "friction",
    bg: "/hero-atmosphere-flipped.jpg",
  },
  {
    slug: "midnight-black",
    eyebrow: "Most Popular",
    headline: "Hear it",
    scriptWord: "different",
    bg: "/midnight-bg.jpg",
  },
  {
    slug: "slate-grey",
    eyebrow: "Everyday Comfort",
    headline: "Comfort that",
    scriptWord: "lasts",
    bg: "/slate-bg.jpg",
  },
  {
    slug: "ultra-view-x",
    eyebrow: "Effortless Clarity",
    headline: "See every",
    scriptWord: "detail",
    bg: "/monitor-bg.jpg",
  },
  {
    slug: "vantage-wireless",
    eyebrow: "Now Available",
    headline: "Play without",
    scriptWord: "wires",
    bg: "/racecar-bg.jpg",
  },
];

const TEASER_SLUGS = ["midnight-black", "typeflow", "ultra-view-x", "vantage-wireless"];

const PILLARS = [
  {
    n: "01",
    title: "Driver Precision",
    body: "Every driver is tuned in-house to keep mids clear and highs controlled, so nothing gets lost when things get loud.",
    icon: WaveformIcon,
  },
  {
    n: "02",
    title: "Tactile Control",
    body: "Low-profile switches and weighted builds put every adjustment under your fingertips, no digging through menus.",
    icon: SwitchIcon,
  },
  {
    n: "03",
    title: "Built to Last",
    body: "Matte finishes and reinforced hinges are chosen for years of daily use, not just the unboxing photo.",
    icon: ShieldIcon,
  },
];

const AUTO_ADVANCE_MS = 9000;

// homepage: auto-advancing hero carousel plus catalog teaser, "why keynex" pillars, and a closing CTA
export default function Home() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);

  // auto-advance the hero slide, restarting the timer whenever the slide changes (manual or automatic)
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
      <section className="relative flex min-h-[calc(100vh-88px)] items-center overflow-hidden border-b border-white/10">
        <Image
          key={slide.slug}
          src={slide.bg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-fade-in-up absolute inset-0 z-0 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/85 to-black/25" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/10 to-black/50" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(19,184,166,0.15),transparent_60%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left — editorial copy */}
            <div className="space-y-6 lg:col-span-7">
              <div key={slide.slug} className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-[var(--keynex-muted)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--keynex-teal)] animate-pulse" />
                  <span className="font-bold tracking-[0.2em] text-white uppercase">{slide.eyebrow}</span>
                </div>

                <h1 className="mt-6 text-4xl leading-[0.98] font-black tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
                  <TextEffect key={`${slide.slug}-headline`} per="char" preset="fade">
                    {slide.headline}
                  </TextEffect>
                  <br />
                  <TextEffect
                    key={`${slide.slug}-script`}
                    per="char"
                    preset="fade"
                    delay={0.25}
                    className={cn(
                      script.className,
                      "text-6xl normal-case tracking-normal text-[var(--keynex-teal-bright)] drop-shadow-[0_0_25px_rgba(19,184,166,0.35)] sm:text-8xl lg:text-9xl",
                    )}
                  >
                    {slide.scriptWord}
                  </TextEffect>
                </h1>

                <p className="mt-4 max-w-[300px] text-base leading-relaxed text-[var(--keynex-muted)] sm:max-w-[460px] sm:text-lg">
                  {product.tagline}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <SpecularButton
                    size="lg"
                    radius={999}
                    baseColor="var(--keynex-teal)"
                    textColor="#000000"
                    lineColor="var(--keynex-teal-bright)"
                    thickness={1}
                    tint="#ffffff"
                    tintOpacity={0}
                    blur={6}
                    intensity={0.9}
                    shineSize={45}
                    shineFade={55}
                    speed={0.3}
                    followMouse
                    proximity={220}
                    autoAnimate={false}
                    onClick={() => router.push(`/products/${product.slug}`)}
                  >
                    Inspect this build
                  </SpecularButton>
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

                <TrustRow />
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
              <div className="relative aspect-[3/4] w-full max-w-md">
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
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[var(--keynex-teal)]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeSlide + 1)}
                  aria-label="Next slide"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-[var(--keynex-teal)]"
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

        <Carousel>
          <CarouselContent className="-ml-5 pb-2">
            {TEASER_SLUGS.map((slug, index) => {
              const teaserProduct = getProductBySlug(slug);
              if (!teaserProduct) return null;
              return (
                <CarouselItem key={slug} className="basis-[82%] pl-5 sm:basis-1/2 lg:basis-1/3">
                  <Reveal delayMs={index * 60}>
                    <TeaserCard product={teaserProduct} />
                  </Reveal>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNavigation className="mt-6 justify-end" alwaysShow />
        </Carousel>
      </section>

      {/* Cinematic showcase */}
      <ScrollExpand
        src="/hero-headphones-3d.webp"
        alt="Axiom Midnight Black headphones"
        title="Tuned in the dark"
        scrollHint="Scroll"
        useWindowScroll
        topOffset={88}
        className="mt-16 sm:mt-24"
      >
        <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-4xl">
          Every driver, tuned by hand
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
          No mass-produced curve. Every unit is calibrated in-house before it ships, so the sound
          you hear is the sound we tuned — not a factory default.
        </p>
      </ScrollExpand>

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
                <div className="flex items-center gap-2">
                  <AnimatedIcon
                    icon={pillar.icon}
                    className="h-5 w-5 shrink-0 text-[var(--keynex-teal-bright)]"
                    delay={index * 100}
                  />
                  <h3 className="text-base font-bold tracking-wider text-white uppercase">{pillar.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-[var(--keynex-muted)]">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 sm:pb-48">
        <Reveal className="glow-teal rounded-2xl border border-white/15 bg-[var(--keynex-panel)] p-8 text-center sm:p-14">
          <h3 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
            Lock in your rig
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-[var(--keynex-muted)] sm:text-sm">
            Browse the full lineup — headphones, keyboard, monitor, and wireless headset — and put
            together a rig that actually sounds and feels intentional.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-[var(--keynex-teal)] px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-black uppercase transition hover:bg-[var(--keynex-teal-bright)]"
          >
            Browse System
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

const TRUST_ITEMS = [
  { label: "Free shipping", icon: TruckIcon },
  { label: "30-day returns", icon: ReturnIcon },
  { label: "2-year warranty", icon: ShieldIcon },
];

function TrustRow() {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
      {TRUST_ITEMS.map(({ label, icon: Icon }, index) => (
        <div key={label} className="flex items-center gap-2">
          <AnimatedIcon
            icon={Icon}
            className="h-6 w-6 shrink-0 text-[var(--keynex-teal-bright)]"
            delay={index * 100}
          />
          <span className="text-sm text-[var(--keynex-reassure)]">{label}</span>
        </div>
      ))}
    </div>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h10.5v8.25h-10.5v-8.25Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 11.25h3.5l3.5 3v2.25h-7v-5.25Z" />
      <circle cx="6" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

function ReturnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5a8 8 0 1 1 2.1 6.4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5v5h5" />
    </svg>
  );
}

function WaveformIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.5 12h2.5l1.5-6 3 15 3-18 3 12 1.5-3H21.5"
      />
    </svg>
  );
}

function SwitchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v3M12 16v-2M9 13h6" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.75 4.5 5.5v5.75c0 5 3.2 8 7.5 10 4.3-2 7.5-5 7.5-10V5.5L12 2.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

// product card used in the homepage catalog carousel
function TeaserCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden border-b border-white/15 bg-[var(--keynex-panel)] transition duration-300 hover:border-[var(--keynex-teal)] hover:shadow-[0_18px_40px_rgba(19,184,166,0.12)]">
      <div className="absolute top-4 right-4 z-20">
        <WishlistButton slug={product.slug} />
      </div>

      <MorphingDialog transition={{ type: "spring", bounce: 0.05, duration: 0.3 }}>
        <MorphingDialogTrigger className="diagonal-cut-tight relative block aspect-[4/3] overflow-hidden bg-black">
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
        </MorphingDialogTrigger>

        <MorphingDialogContainer>
          <MorphingDialogContent className="relative w-[90vw] max-w-md rounded-2xl border border-white/15 bg-[var(--keynex-panel)]">
            <MorphingDialogClose />
            {product.image && (
              <MorphingDialogImage
                src={product.image}
                alt={`${product.name} product photo`}
                className="h-64 w-full bg-black object-contain p-8"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <MorphingDialogSubtitle className="text-[10px] font-bold tracking-[0.2em] text-[var(--keynex-teal-bright)] uppercase">
                  {product.specs[0]?.label ?? "Studio Grade"}
                </MorphingDialogSubtitle>
                <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
              </div>
              <MorphingDialogTitle className="mt-1 text-xl tracking-wider text-white uppercase">
                {product.name}
              </MorphingDialogTitle>
              <MorphingDialogDescription>
                <p className="mt-3 text-sm leading-relaxed text-[var(--keynex-muted)]">{product.description}</p>
              </MorphingDialogDescription>

              <div className="mt-6 flex items-center gap-4">
                <AddToCartButton slug={product.slug} />
                <Link
                  href={`/products/${product.slug}`}
                  className="text-[11px] font-bold tracking-wider text-[var(--keynex-muted)] uppercase transition hover:text-white"
                >
                  Full details →
                </Link>
              </div>
            </div>
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>

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
