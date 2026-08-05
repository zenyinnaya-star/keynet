"use client";

import { useWishlist } from "@/lib/useWishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const active = has(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border text-base transition-all hover:scale-110",
        active
          ? "border-red-500 bg-red-500/10 text-red-500"
          : "border-white/20 bg-black/40 text-white/60 hover:border-white/50 hover:text-white",
        className,
      )}
    >
      <span aria-hidden>{active ? "♥" : "♡"}</span>
    </button>
  );
}
