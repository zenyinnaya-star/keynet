import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// merges Tailwind classes and resolves conflicts (e.g. "p-2 p-4" becomes just "p-4")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// formats a raw number as USD, e.g. 249 -> "$249.00"
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}
