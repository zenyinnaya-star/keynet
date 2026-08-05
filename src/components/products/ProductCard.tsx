import Image from "next/image";
import Link from "next/link";
import { getAverageRating, type Product } from "@/lib/products";
import { StarRating } from "./StarRating";
import { WishlistButton } from "./WishlistButton";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  compareChecked,
  onCompareChange,
  compareDisabled,
}: {
  product: Product;
  compareChecked: boolean;
  onCompareChange: (checked: boolean) => void;
  compareDisabled?: boolean;
}) {
  const avgRating = getAverageRating(product.reviews);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/80 transition-colors hover:bg-zinc-800">
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton slug={product.slug} />
      </div>

      <Link href={`/products/${product.slug}`} className="relative block p-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -bottom-6 select-none text-7xl font-black tracking-tight text-white/5 uppercase sm:text-8xl"
        >
          {product.watermark}
        </span>

        <div className="relative z-[1] flex justify-center">
          <Image
            src="/hero-headphones-3d.webp"
            alt={`${product.name} headphones`}
            width={280}
            height={329}
            sizes="220px"
            style={{ filter: product.filter }}
            className="h-40 w-auto object-contain sm:h-48"
          />
        </div>

        <div className="relative z-[1] mt-4">
          <p className="text-lg font-semibold text-white">{product.name}</p>
          <p className="mt-1 text-sm font-semibold text-red-500">${product.price},-</p>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={avgRating} />
            <span className="text-xs text-white/40">({product.reviews.length})</span>
          </div>
        </div>
      </Link>

      <label
        className={cn(
          "relative z-10 flex items-center gap-2 border-t border-white/10 px-6 py-3 text-xs text-white/60",
          compareDisabled && !compareChecked && "opacity-40",
        )}
      >
        <input
          type="checkbox"
          checked={compareChecked}
          disabled={compareDisabled && !compareChecked}
          onChange={(event) => onCompareChange(event.target.checked)}
          className="h-4 w-4 accent-red-600"
        />
        Compare
      </label>
    </div>
  );
}
