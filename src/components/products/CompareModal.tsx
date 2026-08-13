"use client";

import Image from "next/image";
import { getAverageRating, type Product } from "@/lib/products";
import { StarRating } from "./StarRating";
import { formatPrice } from "@/lib/utils";

// modal showing a side-by-side spec table for the products picked for comparison
export function CompareModal({
  products,
  onClose,
}: {
  products: Product[];
  onClose: () => void;
}) {
  if (products.length === 0) return null;

  // union of every spec label across the selected products, so the table has one row per spec
  const specLabels = Array.from(
    new Set(products.flatMap((product) => product.specs.map((spec) => spec.label))),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-4xl overflow-auto rounded-2xl bg-zinc-900 p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Compare Products</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="w-28" />
                {products.map((product) => (
                  <th key={product.slug} className="px-3 pb-4 text-center">
                    <div className="mx-auto flex h-20 items-center justify-center">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={product.imageWidth}
                          height={product.imageHeight}
                          sizes="120px"
                          style={{ filter: product.filter }}
                          className="h-full w-auto object-contain"
                        />
                      ) : (
                        <span className="text-[9px] font-medium tracking-widest text-white/30 uppercase">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-semibold text-white">{product.name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-t border-white/10">
                <td className="py-3 text-white/40">Price</td>
                {products.map((product) => (
                  <td
                    key={product.slug}
                    className="px-3 py-3 text-center font-semibold text-teal-500"
                  >
                    {formatPrice(product.price)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 text-white/40">Rating</td>
                {products.map((product) => (
                  <td key={product.slug} className="px-3 py-3 text-center">
                    <div className="flex justify-center">
                      <StarRating value={getAverageRating(product.reviews)} />
                    </div>
                  </td>
                ))}
              </tr>
              {specLabels.map((label) => (
                <tr key={label} className="border-t border-white/10">
                  <td className="py-3 text-white/40">{label}</td>
                  {products.map((product) => {
                    const spec = product.specs.find((s) => s.label === label);
                    return (
                      <td key={product.slug} className="px-3 py-3 text-center">
                        {spec?.value ?? "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
