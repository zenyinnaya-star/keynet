import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export function HeritageTimeline() {
  return (
    <div className="min-h-screen bg-black text-white">
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
          <Link href="/products" className="uppercase transition-colors hover:text-white">
            Our Products
          </Link>
          <span className="uppercase text-white">Heritage</span>
        </nav>
      </header>

      {/* Section 1 — The Founding */}
      <section className="bg-grain relative overflow-hidden bg-[#141414] py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.35em] text-white/50">
              — 2023 —
            </p>
            <p className="mt-1 text-xs tracking-[0.3em] text-white/30 uppercase">
              March 03
            </p>
            <div className="mt-6 h-px w-16 bg-red-600" />
            <p className="mt-6 text-sm leading-7 text-white/70 sm:text-[15px]">
              keynet began as a shared frustration: everyday audio gear that
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
            <p className="mt-8 text-center text-xs tracking-[0.4em] text-white/30">
              * * *
            </p>
            <h2 className="mt-4 text-center text-2xl font-bold tracking-tight uppercase sm:text-3xl">
              The Founding of Keynet
            </h2>
          </Reveal>

          <Reveal delayMs={150} className="relative flex items-center justify-center">
            <Image
              src="/hero-headphones-3d.webp"
              alt="Early Axiom headphone prototype"
              width={700}
              height={823}
              sizes="(min-width: 1024px) 480px, 320px"
              style={{ filter: "grayscale(1) contrast(1.3) brightness(0.8)" }}
              className="animate-float h-72 w-auto object-contain transition-transform duration-500 hover:scale-105 sm:h-96"
            />
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Co-founders */}
      <section className="bg-grain relative overflow-hidden bg-[#20221b] py-20 sm:py-28">
        <Reveal className="mx-auto max-w-5xl px-6 text-center sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight uppercase sm:text-4xl">
            Our Co-Founders
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-12 grid max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,0.8fr)] lg:gap-6">
          <Reveal delayMs={100} className="order-2 flex justify-center lg:order-1">
            <Image
              src="/founders/zabdiel.webp"
              alt="Zabdiel, co-founder of keynet"
              width={1151}
              height={1523}
              sizes="(min-width: 1024px) 260px, 220px"
              style={{
                filter:
                  "grayscale(0.55) sepia(0.15) hue-rotate(50deg) contrast(1.1) brightness(0.95)",
              }}
              className="h-64 w-auto object-contain transition-transform duration-500 hover:scale-105 sm:h-80"
            />
          </Reveal>

          <Reveal delayMs={200} className="order-1 lg:order-2">
            <p className="text-sm leading-7 text-white/70 sm:text-[15px]">
              Zabdiel handled the parts most founders dread — sourcing,
              testing, the unglamorous work of making sure a product
              actually works before it ships. Santiago pushed the brand: the
              way keynet sounds, looks, and talks to the people who wear it.
              Neither background was in consumer electronics. What they
              shared was a refusal to launch anything they wouldn&apos;t use
              themselves.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-[15px]">
              That tension — one partner obsessed with function, the other
              with feel — is still the reason keynet products get argued
              over in every internal review before they reach a single
              customer.
            </p>
          </Reveal>

          <Reveal delayMs={300} className="order-3 flex justify-center">
            <Image
              src="/founders/santiago.webp"
              alt="Santiago, co-founder of keynet"
              width={2257}
              height={2959}
              sizes="(min-width: 1024px) 260px, 220px"
              style={{
                filter:
                  "grayscale(0.55) sepia(0.15) hue-rotate(50deg) contrast(1.1) brightness(0.95)",
              }}
              className="h-64 w-auto object-contain transition-transform duration-500 hover:scale-105 sm:h-80"
            />
          </Reveal>
        </div>

        <Reveal
          delayMs={400}
          className="relative mt-12 text-center text-sm font-semibold tracking-[0.35em] text-white/50 uppercase"
        >
          Zabdiel &amp; Santiago
        </Reveal>
      </section>

      {/* Section 3 — Current CEO */}
      <section className="bg-grain relative overflow-hidden bg-[#2c2114] py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.35em] text-white/50">
              — 2025 —
            </p>
            <p className="mt-1 text-xs tracking-[0.3em] text-white/30 uppercase">
              September 18
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-red-600" />
            <p className="mt-6 text-sm leading-7 text-white/70 sm:text-[15px]">
              Misty joined keynet as its third full-time hire and became CEO
              not long after, taking over day-to-day leadership so the
              founders could focus on product. Her approach has been to keep
              the company small on purpose — fewer releases, held to a
              higher bar, rather than a catalog padded out for its own sake.
              Under her leadership keynet expanded from a single headphone
              line into the beginnings of a real catalog, without losing the
              two-person, get-it-right instinct the company was built on.
            </p>
            <p className="mt-8 text-xs tracking-[0.4em] text-white/30">
              * * *
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight uppercase sm:text-3xl">
              Misty
            </h2>
            <p className="mt-1 text-xs tracking-[0.3em] text-white/40 uppercase">
              Current CEO
            </p>
          </Reveal>
        </div>
      </section>

      <div className="px-6 py-10 text-[11px] text-white/40 uppercase sm:px-10">
        © 2026 keynet — All rights reserved
      </div>
    </div>
  );
}
