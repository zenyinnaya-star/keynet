"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/lib/useWishlist";
import { getProductBySlug, getAverageRating } from "@/lib/products";
import { ShopHeader } from "@/components/products/ShopHeader";
import { StarRating } from "@/components/products/StarRating";
import { WishlistButton } from "@/components/products/WishlistButton";
import { AddToCartButton } from "@/components/products/AddToCartButton";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = ids
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<typeof product> => !!product);

  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      <div className="mx-auto max-w-4xl px-6 pb-24 sm:px-10">
        <h1 className="text-3xl font-semibold">Your Wishlist</h1>

        {products.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-sm text-white/60">Nothing saved yet.</p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:shadow-[0_0_15px_rgba(242,210,255,0.3)]"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products.map((product) => {
              const avgRating = getAverageRating(product.reviews);
              return (
                <div key={product.slug} className="relative rounded-2xl bg-zinc-900/80 p-6">
                  <div className="absolute top-3 right-3">
                    <WishlistButton slug={product.slug} />
                  </div>
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="mx-auto flex h-32 items-center justify-center">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={product.imageWidth}
                          height={product.imageHeight}
                          sizes="160px"
                          style={{ filter: product.filter }}
                          className="h-full w-auto object-contain"
                        />
                      ) : (
                        <span className="text-[10px] font-medium tracking-widest text-white/30 uppercase">
                          Image coming soon
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-center text-lg font-semibold text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-center text-sm font-semibold text-teal-500">
                      ${product.price},-
                    </p>
                    <div className="mt-2 flex justify-center gap-2">
                      <StarRating value={avgRating} />
                      <span className="text-xs text-white/40">({product.reviews.length})</span>
                    </div>
                  </Link>
                  <div className="mt-4 flex justify-center">
                    <AddToCartButton slug={product.slug} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
