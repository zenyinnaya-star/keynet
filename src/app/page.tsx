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
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contacts" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", initials: "FB" },
  { href: "#", label: "Instagram", initials: "IG" },
  { href: "#", label: "Twitter", initials: "X" },
];

const SLIDES = [
  {
    eyebrow: "New Arrival",
    description:
      "This is your landing page hero, styled after a bold, image-driven product showcase. Swap this copy for your own product or brand story.",
  },
  {
    eyebrow: "Studio Sound",
    description:
      "Tuned drivers and active noise cancellation built for hours of immersive, distraction-free listening.",
  },
  {
    eyebrow: "Everyday Comfort",
    description:
      "Memory-foam ear cushions and a featherweight frame mean you forget you're wearing them at all.",
  },
  {
    eyebrow: "All-Day Battery",
    description:
      "Up to 30 hours on a single charge, with fast-charge support when you're in a hurry.",
  },
  {
    eyebrow: "Crafted to Last",
    description:
      "Premium matte-finish materials and a reinforced hinge, designed to go the distance.",
  },
];

const AUTO_ADVANCE_MS = 6000;

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
              "radial-gradient(circle at 75% 45%, #2a0a0a 0%, #120404 45%, #000 80%)",
          }}
        />
        <div className="animate-glow-pulse absolute inset-0 bg-[radial-gradient(circle_at_85%_60%,rgba(220,20,20,0.25),transparent_45%)]" />
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
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold transition-transform hover:scale-110">
            K
          </span>
          <span className="hidden text-sm font-semibold tracking-wide sm:inline">
            keynet
          </span>
        </Link>

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
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-red-500 transition-transform duration-300 group-hover:scale-x-100",
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
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-white/70 transition-all duration-200 hover:scale-110 hover:border-red-500 hover:text-white"
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
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-white/70 transition-colors hover:border-red-500 hover:text-white"
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              {slide.eyebrow}
            </p>

            <h1
              className={cn(
                script.className,
                "mt-2 text-7xl leading-none text-red-600 drop-shadow-[0_0_25px_rgba(220,20,20,0.45)] sm:text-8xl",
              )}
            >
              keynet
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px w-16 bg-red-600" />
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/70 sm:text-base">
              {slide.description}
            </p>

            <button className="group mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white/90 transition-colors hover:border-white/50 hover:bg-white/5">
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
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute h-72 w-72 rounded-full bg-red-600/20 blur-3xl sm:h-96 sm:w-96" />
            <Image
              src="/hero-headphones-3d.webp"
              alt="3D wireframe render of Axiom wireless headphones"
              width={840}
              height={985}
              sizes="(min-width: 640px) 360px, 280px"
              priority
              className="animate-float relative h-80 w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105 sm:h-[26rem]"
            />
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
              "block h-2 w-2 rounded-full border border-white/50 transition-all duration-300 hover:scale-125 hover:border-red-500",
              index === activeSlide
                ? "scale-125 border-red-500 bg-red-500"
                : "bg-transparent",
            )}
          />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 text-white/50 sm:px-10">
        <p className="text-[11px] uppercase tracking-wider">
          © 2026 keynet
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
