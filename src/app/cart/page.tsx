"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { getProductBySlug } from "@/lib/products";
import { ShopHeader } from "@/components/products/ShopHeader";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();

  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      <div className="mx-auto max-w-3xl px-6 pb-24 sm:px-10">
        <h1 className="text-3xl font-semibold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-sm text-white/60">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:shadow-[0_0_15px_rgba(242,210,255,0.3)]"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 divide-y divide-white/10">
              {items.map((item) => {
                const product = getProductBySlug(item.slug);
                if (!product) return null;
                return (
                  <div key={item.slug} className="flex flex-wrap items-center gap-4 py-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={product.imageWidth}
                          height={product.imageHeight}
                          sizes="64px"
                          style={{ filter: product.filter }}
                          className="h-full w-auto object-contain"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-semibold text-white hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-white/50">${product.price},- each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <p className="w-16 text-right text-sm font-semibold text-teal-500">
                      ${product.price * item.quantity},-
                    </p>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeItem(item.slug)}
                      className="text-white/40 transition-colors hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={clear}
                className="text-xs text-white/50 transition-colors hover:text-white"
              >
                Clear cart
              </button>
              <div className="text-right">
                <p className="text-xs text-white/50">Subtotal</p>
                <p className="text-2xl font-bold text-white">${subtotal},-</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-full bg-gradient-to-r from-teal-600 to-teal-500 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(242,210,255,0.3)]"
            >
              Checkout
            </button>
            <p className="mt-2 text-center text-xs text-white/30">
              This is a demo store — checkout isn&apos;t connected to real payments.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
