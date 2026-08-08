import type { Metadata } from "next";
import { ShopHeader } from "@/components/products/ShopHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import WorldMap from "@/components/ui/world-map";

export const metadata: Metadata = {
  title: "Contact | keynex",
};

const MAP_DOTS = [
  { start: { lat: 40.7128, lng: -74.006 }, end: { lat: 51.5074, lng: -0.1278 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 35.6762, lng: 139.6503 } },
  { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: -33.8688, lng: 151.2093 } },
  { start: { lat: 40.7128, lng: -74.006 }, end: { lat: -23.5505, lng: -46.6333 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <p className="text-xs text-white/40">Contacts</p>

        <div className="bg-grain relative mt-6 overflow-hidden rounded-3xl bg-zinc-950 p-8 ring-1 ring-white/10 sm:p-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase">
            <span style={{ color: "#F2D2FF" }}>How to contact us</span>
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            <span style={{ color: "#F2D2FF" }}>Contacts</span>
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs tracking-wide text-white/40 uppercase">Address</p>
              <p className="mt-1 text-sm text-white">Remote — worldwide</p>
            </div>
            <div>
              <p className="text-xs tracking-wide text-white/40 uppercase">Phone</p>
              <p className="mt-1 text-sm text-white">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="text-xs tracking-wide text-white/40 uppercase">E-mail</p>
              <p className="mt-1 text-sm text-white">hello@keynex.com</p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase">
              <span style={{ color: "#F2D2FF" }}>Get in touch</span>
            </p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available 24/7 — always connecting
            </div>
          </div>
          <p className="mt-4 text-center text-2xl font-bold sm:text-3xl">
            Wherever you are, <span className="text-white/40">we&apos;re listening.</span>
          </p>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/60">
            keynex ships and supports customers worldwide — reach out from anywhere.
          </p>
          <div className="mt-8">
            <WorldMap dots={MAP_DOTS} />
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 text-[11px] text-white/40 uppercase sm:px-10">
        © 2026 keynex — All rights reserved
      </div>
    </div>
  );
}
