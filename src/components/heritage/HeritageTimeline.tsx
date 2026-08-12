"use client";

import Image from "next/image";
import { ShopHeader } from "@/components/products/ShopHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

function PhaseTag({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-[var(--keynex-muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--keynex-teal)] animate-pulse" />
      <span className="font-bold tracking-[0.2em] text-white uppercase">{label}</span>
    </div>
  );
}

export function HeritageTimeline() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      {/* Page header */}
      <section className="bg-grain relative overflow-hidden border-b border-white/10 pt-16 pb-10 sm:pt-24 sm:pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(19,184,166,0.14),transparent_55%)]" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--keynex-teal-bright)] uppercase">
            Heritage
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">
            How <span className="text-[var(--keynex-teal-bright)]">keynex</span> came to be
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--keynex-muted)]">
            Three moments, one thread — from a shared frustration with disposable audio gear to a
            small, deliberate hardware catalog.
          </p>
        </Reveal>
      </section>

      {/* Section 1 — The Founding */}
      <section className="bg-grain relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
        <span className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,20vw,16rem)] leading-none font-black tracking-[-0.14em] text-white/[0.03] select-none">
          2023
        </span>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <Reveal className="space-y-6">
            <PhaseTag label="Phase 01 — March 2023" />

            <p className="text-sm leading-7 text-[var(--keynex-muted)] sm:text-[15px]">
              keynex began as a shared frustration: everyday audio gear that
              looked disposable and sounded worse. Co-founders Zabdiel and
              Santiago spent their evenings after class sketching product
              concepts on whatever paper was closest — napkins, the backs of
              notebooks, the margins of textbooks they should have been
              reading instead. What started as a way to build the headphones
              they wished they could afford grew into a small operation: a
              handful of prototypes, a spreadsheet of components, and a
              shared belief that good design shouldn&apos;t be reserved for
              premium price tags. The first Axiom units barely broke even,
              sold near cost to the handful of people willing to try a
              headphone brand nobody had heard of. It wasn&apos;t much. But
              it was the beginning.
            </p>

            <div className="signal-line h-px w-24 bg-[var(--keynex-teal)]" />

            <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
              The Founding of <span className="text-[var(--keynex-teal-bright)]">keynex</span>
            </h2>
          </Reveal>

          <Reveal delayMs={150} className="relative flex items-center justify-center">
            <div className="diagonal-cut relative flex aspect-[4/5] w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[var(--keynex-panel)]">
              <span className="pointer-events-none absolute -right-4 bottom-0 z-0 text-[clamp(4rem,12vw,7rem)] leading-none font-black tracking-[-0.14em] text-white/[0.05] uppercase select-none">
                Axiom
              </span>
              <span className="signal-line pointer-events-none absolute top-6 left-6 z-10 h-px w-14 bg-[var(--keynex-teal)]" />
              <Image
                src="/hero-headphones-3d.webp"
                alt="Early Axiom headphone prototype"
                width={700}
                height={823}
                sizes="(min-width: 1024px) 420px, 320px"
                style={{ filter: "grayscale(1) contrast(1.3) brightness(0.85)" }}
                className="animate-float relative z-[1] h-72 w-auto object-contain transition-transform duration-500 hover:scale-105 sm:h-96"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Co-founders */}
      <section className="bg-grain relative overflow-hidden border-b border-white/10 bg-[var(--keynex-panel)] py-20 sm:py-28">
        <Reveal className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10">
          <PhaseTag label="Phase 02 — The Team" />
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white uppercase sm:text-4xl">
            Our Co-Founders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--keynex-muted)]">
            Neither background was in consumer electronics. What they shared was a refusal to
            launch anything they wouldn&apos;t use themselves.
          </p>
        </Reveal>

        <div className="relative z-10 mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 px-6 sm:px-10 md:grid-cols-2">
          <Reveal delayMs={120}>
            <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-black/40 p-8">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--keynex-teal-bright)] uppercase">
                Co-Founder
              </span>
              <h3 className="text-xl font-bold tracking-wide text-white uppercase">Zabdiel</h3>
              <p className="text-xs leading-relaxed text-[var(--keynex-muted)]">
                Handled the parts most founders dread — sourcing, testing, the unglamorous work of
                making sure a product actually works before it ships.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={200}>
            <div className="h-full space-y-4 rounded-2xl border border-white/10 bg-black/40 p-8">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--keynex-teal-bright)] uppercase">
                Co-Founder
              </span>
              <h3 className="text-xl font-bold tracking-wide text-white uppercase">Santiago</h3>
              <p className="text-xs leading-relaxed text-[var(--keynex-muted)]">
                Pushed the brand: the way keynex sounds, looks, and talks to the people who wear
                it.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal
          delayMs={320}
          className="relative z-10 mx-auto mt-10 max-w-2xl px-6 text-center sm:px-10"
        >
          <p className="text-sm leading-7 text-[var(--keynex-muted)] sm:text-[15px]">
            That tension — one partner obsessed with function, the other with feel — is still the
            reason keynex products get argued over in every internal review before they reach a
            single customer.
          </p>
        </Reveal>
      </section>

      {/* Section 3 — Current CEO */}
      <section className="bg-grain relative overflow-hidden py-20 sm:py-28">
        <span className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,20vw,16rem)] leading-none font-black tracking-[-0.14em] text-white/[0.03] select-none">
          2025
        </span>

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center sm:px-10">
          <Reveal className="space-y-6">
            <div className="flex justify-center">
              <PhaseTag label="Phase 03 — September 2025" />
            </div>

            <p className="text-sm leading-7 text-[var(--keynex-muted)] sm:text-[15px]">
              Misty joined keynex as its third full-time hire and became CEO
              not long after, taking over day-to-day leadership so the
              founders could focus on product. Her approach has been to keep
              the company small on purpose — fewer releases, held to a
              higher bar, rather than a catalog padded out for its own sake.
              Under her leadership keynex expanded from a single headphone
              line into the beginnings of a real catalog, without losing the
              two-person, get-it-right instinct the company was built on.
            </p>

            <div className="mx-auto signal-line h-px w-24 bg-[var(--keynex-teal)]" />

            <div>
              <h2 className="text-2xl font-black tracking-tight text-[var(--keynex-teal-bright)] uppercase sm:text-3xl">
                Misty
              </h2>
              <p className="mt-1 text-xs tracking-[0.3em] text-[var(--keynex-muted)] uppercase">
                Current <span className="text-[var(--keynex-teal-bright)]">CEO</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
