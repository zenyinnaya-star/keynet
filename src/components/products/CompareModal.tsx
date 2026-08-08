"use client";

import Image from "next/image";
import { getAverageRating, type Product } from "@/lib/products";
import { StarRating } from "./StarRating";

export function CompareModal({
  products,
  onClose,
}: {
  products: Product[];
  onClose: () => void;
}) {
  if (products.length === 0) return null;

  const specLabels = products[0].specs.map((spec) => spec.label);

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
                    <Image
                      src="/hero-headphones-3d.webp"
                      alt={`${product.name} headphones`}
                      width={140}
                      height={165}
                      sizes="120px"
                      style={{ filter: product.filter }}
                      className="mx-auto h-20 w-auto object-contain"
                    />
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
                    ${product.price},-
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
