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
        "flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all",
        added
          ? "bg-green-600 text-white shadow-[0_0_15px_rgba(242,210,255,0.25)]"
          : "bg-[var(--keynex-teal)] text-black hover:bg-[var(--keynex-teal-bright)] hover:shadow-[0_0_20px_rgba(19,184,166,0.3)]",
        className,
      )}
    >
      <span>{added ? "Added ✓" : "Add to cart"}</span>
    </button>
  );
}
