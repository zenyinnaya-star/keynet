"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { CompareModal } from "./CompareModal";

const MAX_COMPARE = 3;

// searchable product grid with a "select to compare" flow, capped at MAX_COMPARE items
export function ProductGrid() {
  const [query, setQuery] = useState("");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  // re-filter only when the search query changes, not on every render
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((product) => product.name.toLowerCase().includes(q));
  }, [query]);

  // adds/removes a slug from the compare list, ignoring new checks once the max is reached
  const toggleCompare = (slug: string, checked: boolean) => {
    setCompareSlugs((current) => {
      if (checked) {
        if (current.length >= MAX_COMPARE) return current;
        return [...current, slug];
      }
      return current.filter((s) => s !== slug);
    });
  };

  const compareProducts = PRODUCTS.filter((product) => compareSlugs.includes(product.slug));

  return (
    <div>
      <div className="mb-8">
        <div className="relative max-w-sm">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-full border border-white/20 bg-zinc-900/80 px-5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none"
          />
        </div>
        {query && (
          <p className="mt-2 text-xs text-white/40">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for &quot;{query}&quot;
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-white/50">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              compareChecked={compareSlugs.includes(product.slug)}
              onCompareChange={(checked) => toggleCompare(product.slug, checked)}
              compareDisabled={compareSlugs.length >= MAX_COMPARE}
            />
          ))}
        </div>
      )}

      {compareSlugs.length >= 2 && (
        <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
          <div className="flex items-center gap-4 rounded-full bg-gradient-to-r from-zinc-900 to-zinc-900/60 px-6 py-3 shadow-2xl shadow-[#F2D2FF]/20 ring-1 ring-white/10 backdrop-blur">
            <span className="text-sm text-white/70">{compareSlugs.length} selected</span>
            <button
              type="button"
              onClick={() => setShowCompare(true)}
              className="rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-1.5 text-xs font-bold text-white transition-all hover:shadow-[0_0_15px_rgba(242,210,255,0.3)]"
            >
              Compare
            </button>
            <button
              type="button"
              onClick={() => setCompareSlugs([])}
              className="text-xs text-white/50 transition-colors hover:text-white hover:text-[#F2D2FF]"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {showCompare && (
        <CompareModal products={compareProducts} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
}
