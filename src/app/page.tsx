"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Yesteryear } from "next/font/google";
import { cn } from "@/lib/utils";

const script = Yesteryear({ subsets: ["latin"], weight: "400" });

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Our Products" },
  { href: "/heritage", label: "Heritage" },
  { href: "/contact", label: "Contacts" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", initials: "FB" },
  { href: "#", label: "Instagram", initials: "IG" },
  { href: "#", label: "Twitter", initials: "X" },
];

const SLIDES: {
  eyebrow: string;
  productName: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  description: string;
}[] = [
  {
    eyebrow: "New Arrival",
    productName: "Keynex TypeFlow",
    description:
      "Keynex TypeFlow delivers smooth, responsive typing with a clean, minimalist design. Comfortable, consistent, and easy to use, it keeps your workflow steady whether you're studying, working, or typing through your day.",
  },
  {
    eyebrow: "Most Popular",
    productName: "Keynex Echo G3",
    image: "/hero-headphones-3d.webp",
    imageWidth: 840,
    imageHeight: 985,
    description:
      "The Keynex Echo G3 delivers warm, immersive audio in a sleek, lightweight design. With its minimalist look and all‑day comfort, it's the perfect companion for studying, gaming, or escaping into your favorite sounds.",
  },
  {
    eyebrow: "Everyday Comfort",
    productName: "Keynex Comfort Pro",
    image: "/hero-headphones-3d.webp",
    imageWidth: 840,
    imageHeight: 985,
    description:
      "Keynex Comfort Pro is built for all‑day ease, blending soft cushioning with a lightweight frame for effortless wear. Its clear, balanced audio makes every call, song, and moment feel smooth and comfortable.",
  },
  {
    eyebrow: "Effortless Clarity",
    productName: "Keynex Ultra View X",
    image: "/ultra-view-x-monitor.webp",
    imageWidth: 828,
    imageHeight: 758,
    description:
      "Keynex UltraView X delivers sharp detail, rich color, and a smooth viewing experience inside a refined, modern frame. Built for clarity and comfort, it elevates your workspace with premium visuals that stay crisp whether you're working, creating, or unwinding.",
  },
];

const AUTO_ADVANCE_MS = 12000;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [activeSlide]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide((index + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[activeSlide];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background composition */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 55% 0, 40% 100%, 0 100%)",
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), transparent 35%), linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 60%, #000 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(55% 0, 100% 0, 100% 100%, 40% 100%)",
            background:
              "radial-gradient(circle at 75% 45%, #9b7fb8 0%, #6b4f8c 45%, #000 80%)",
          }}
        />
        <div className="animate-glow-pulse absolute inset-0 bg-[radial-gradient(circle_at_85%_60%,rgba(62,130,142,0.25),rgba(242,210,255,0.15),transparent_45%)]" />
      </div>

      {/* Nav */}
      <header
        className={cn(
          "sticky top-0 z-20 flex items-center justify-between gap-6 px-6 py-6 transition-all duration-300 sm:px-10",
          scrolled
            ? "border-b border-white/10 bg-black/70 py-4 shadow-lg shadow-black/30 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div></div>

        <nav className="hidden items-center gap-8 text-xs font-medium tracking-widest text-white/80 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/";
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative py-1 uppercase transition-colors hover:text-white",
                  isActive && "text-white",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100",
                    isActive && "scale-x-100",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-white/70 transition-all duration-200 hover:scale-110 hover:border-[#F2D2FF] hover:text-[#F2D2FF] hover:bg-[#F2D2FF]/10"
              >
                {social.initials}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/50 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="flex flex-col gap-1">
              <span
                className={cn(
                  "h-px w-4 bg-white transition-transform",
                  mobileMenuOpen && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-4 bg-white transition-opacity",
                  mobileMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px w-4 bg-white transition-transform",
                  mobileMenuOpen && "-translate-y-1.5 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "relative z-20 overflow-hidden transition-all duration-300 ease-out md:hidden",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-4 px-6 pb-6 text-sm font-medium tracking-widest text-white/80">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-white/70 transition-colors hover:border-teal-500 hover:text-white"
              >
                {social.initials}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col justify-center px-6 sm:px-10 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div key={activeSlide} className="max-w-xl animate-fade-in-up">
            <p className="pb-4 text-xs font-semibold uppercase tracking-[0.3em]">
              <span style={{ color: "#F2D2FF" }}>{slide.eyebrow}</span>
            </p>

            <h1
              className={cn(
                script.className,
                "mt-2 text-5xl leading-none text-teal-600 drop-shadow-[0_0_25px_rgba(62,130,142,0.45)] sm:text-6xl",
              )}
            >
              {slide.productName}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px w-full max-w-2xl bg-gradient-to-r from-teal-600 to-[#F2D2FF]" />
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/70 sm:text-base">
              {slide.description}
            </p>

            <button className="group mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white/90 transition-all hover:border-[#F2D2FF]/50 hover:bg-[#F2D2FF]/5 hover:shadow-[0_0_12px_rgba(242,210,255,0.2)]">
              Read More
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>

          {/* Hero product image */}
          <div className="relative flex h-80 items-center justify-center sm:h-[26rem] lg:justify-end">
            <div className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/30 to-pink-100/30 blur-3xl sm:h-96 sm:w-96" />
            {slide.image && (
              <div key={activeSlide} className="animate-fade-in-up">
                <Image
                  src={slide.image}
                  alt={`${slide.productName} product image`}
                  width={slide.imageWidth}
                  height={slide.imageHeight}
                  sizes="(min-width: 640px) 360px, 280px"
                  priority
                  className="animate-float relative h-80 w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105 sm:h-[26rem]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 sm:right-10 md:flex">
        {SLIDES.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeSlide}
            onClick={() => goToSlide(index)}
            className={cn(
              "block h-2 w-2 rounded-full border border-white/50 transition-all duration-300 hover:scale-125 hover:border-[#F2D2FF] hover:shadow-[0_0_8px_rgba(242,210,255,0.4)]",
              index === activeSlide
                ? "scale-125 border-[#F2D2FF] bg-[#F2D2FF]"
                : "bg-transparent",
            )}
          />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 text-white/50 sm:px-10">
        <p className="text-[11px] uppercase tracking-wider">
          © 2026 keynex
          <br />
          All rights are reserved
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goToSlide(activeSlide - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 transition-all duration-200 hover:scale-110 hover:border-white/50 hover:text-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goToSlide(activeSlide + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 transition-all duration-200 hover:scale-110 hover:border-white/50 hover:text-white"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
