"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { CompareModal } from "./CompareModal";

const MAX_COMPARE = 3;

export function ProductGrid() {
  const [query, setQuery] = useState("");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((product) => product.name.toLowerCase().includes(q));
  }, [query]);

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
            className="w-full rounded-full border border-white/20 bg-zinc-900/80 px-5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none"
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
          <div className="flex items-center gap-4 rounded-full bg-zinc-900 px-6 py-3 shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <span className="text-sm text-white/70">{compareSlugs.length} selected</span>
            <button
              type="button"
              onClick={() => setShowCompare(true)}
              className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-500"
            >
              Compare
            </button>
            <button
              type="button"
              onClick={() => setCompareSlugs([])}
              className="text-xs text-white/50 transition-colors hover:text-white"
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
