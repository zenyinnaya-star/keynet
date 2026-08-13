"use client";

import { useWishlist } from "@/lib/useWishlist";
import { cn } from "@/lib/utils";

// heart button that toggles a product's wishlist status
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
        // this button often sits inside a Link (e.g. on ProductCard), so stop the click from also navigating
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border text-base transition-all hover:scale-110",
        active
          ? "border-teal-500 bg-gradient-to-br from-teal-500/20 to-[#F2D2FF]/20 text-teal-500 shadow-[0_0_15px_rgba(242,210,255,0.2)]"
          : "border-white/20 bg-black/40 text-white/60 hover:border-white/50 hover:text-white hover:shadow-[0_0_10px_rgba(242,210,255,0.15)]",
        className,
      )}
    >
      <span aria-hidden>{active ? "♥" : "♡"}</span>
    </button>
  );
}
