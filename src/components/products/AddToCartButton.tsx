"use client";

import { useState } from "react";
import { useCart } from "@/lib/useCart";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
      className={cn(
        "flex items-center gap-2 rounded-full py-2.5 pr-5 pl-4 text-xs font-bold transition-colors",
        added ? "bg-green-600 text-white" : "bg-white text-black hover:bg-white/90",
        className,
      )}
    >
      <span>{added ? "Added to cart ✓" : "+ Add to cart"}</span>
    </button>
  );
}
