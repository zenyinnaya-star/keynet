import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAverageRating, getProductBySlug, PRODUCTS } from "@/lib/products";
import { ShopHeader } from "@/components/products/ShopHeader";
import { WishlistButton } from "@/components/products/WishlistButton";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { StarRating } from "@/components/products/StarRating";
import { ReviewsSection } from "@/components/products/ReviewsSection";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} | keynex` : "Product | keynex" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const avgRating = getAverageRating(product.reviews);

  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <nav className="mb-8 text-xs text-white/40">
          <Link href="/products" className="transition-colors hover:text-white">
            Our Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative flex h-80 items-center justify-center sm:h-96">
            <div className="absolute h-64 w-64 rounded-full bg-teal-600/10 blur-3xl" />
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={product.imageWidth}
                height={product.imageHeight}
                sizes="(min-width: 1024px) 420px, 320px"
                style={{ filter: product.filter }}
                priority
                className="relative h-80 w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] sm:h-96"
              />
            )}
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold sm:text-4xl">{product.name}</h1>
                <p className="mt-2 text-sm text-white/60">{product.tagline}</p>
              </div>
              <WishlistButton slug={product.slug} />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <StarRating value={avgRating} size="md" />
              <span className="text-sm text-white/50">
                {avgRating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-teal-500">${product.price},-</p>

            <p className="mt-6 text-sm leading-7 text-white/70">{product.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs tracking-wide text-white/40 uppercase">{spec.label}</dt>
                  <dd className="mt-1 text-sm text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <AddToCartButton slug={product.slug} />
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-12">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="mt-6">
            <ReviewsSection slug={product.slug} />
          </div>
        </div>
      </div>

      <div className="px-6 py-10 text-[11px] text-white/40 uppercase sm:px-10">
        © 2026 keynex — All rights reserved
      </div>
    </div>
  );
}
