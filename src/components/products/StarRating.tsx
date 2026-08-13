"use client";

import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

// renders 5 stars filled up to "value"; pass onChange to make it clickable for picking a rating
export function StarRating({
  value,
  onChange,
  size = "sm",
  className,
}: {
  value: number;
  onChange?: (value: number) => void;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  // read-only display mode if no onChange handler is given, otherwise it's a clickable picker
  const interactive = !!onChange;

  return (
    <div
      className={cn("flex items-center gap-0.5", SIZE_CLASSES[size], className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? undefined : `${value.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(value);
        return interactive ? (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === Math.round(value)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onClick={() => onChange(star)}
            className={cn(
              "transition-colors",
              filled ? "text-teal-500" : "text-white/20 hover:text-teal-500/60",
            )}
          >
            ★
          </button>
        ) : (
          <span key={star} aria-hidden className={filled ? "text-teal-500" : "text-white/20"}>
            ★
          </span>
        );
      })}
    </div>
  );
}
