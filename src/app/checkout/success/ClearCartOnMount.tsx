"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/useCart";

// invisible helper that empties the cart once the success page loads after a completed order
export function ClearCartOnMount() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}
