"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/useCart";

export function ClearCartOnMount() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}
