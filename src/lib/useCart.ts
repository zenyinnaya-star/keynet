"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PRODUCTS } from "./products";

const STORAGE_KEY = "keynex-cart";

export type CartItem = { slug: string; quantity: number };

// module-level state so every component using useCart shares the same cart, not just per-instance state
const listeners = new Set<() => void>();
let cachedItems: CartItem[] | null = null;

// pulls the cart out of localStorage, falling back to empty if it's missing or corrupted
function readStoredItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

// only reads localStorage once and caches the result, since useSyncExternalStore calls this often
function getSnapshot(): CartItem[] {
  if (cachedItems === null) {
    cachedItems = readStoredItems();
  }
  return cachedItems;
}

const EMPTY_ITEMS: CartItem[] = [];

// there's no localStorage on the server, so SSR just sees an empty cart
function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

// registers a component to be notified when the cart changes elsewhere
function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// writes the new cart to localStorage and tells every subscribed component to re-render
function setStoredItems(items: CartItem[]) {
  cachedItems = items;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((listener) => listener());
}

// hook for reading and updating the shopping cart, backed by localStorage
export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // adds a product to the cart, or bumps the quantity if it's already there
  const addItem = useCallback((slug: string, quantity = 1) => {
    const current = getSnapshot();
    const existing = current.find((item) => item.slug === slug);
    const next = existing
      ? current.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item,
        )
      : [...current, { slug, quantity }];
    setStoredItems(next);
  }, []);

  const removeItem = useCallback((slug: string) => {
    setStoredItems(getSnapshot().filter((item) => item.slug !== slug));
  }, []);

  // setting quantity to 0 or below just removes the item instead of leaving a dead entry
  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setStoredItems(getSnapshot().filter((item) => item.slug !== slug));
      return;
    }
    setStoredItems(
      getSnapshot().map((item) => (item.slug === slug ? { ...item, quantity } : item)),
    );
  }, []);

  const clear = useCallback(() => setStoredItems([]), []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  // looks up each cart item's current price from the product catalog to total the cart
  const subtotal = items.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return { items, count, subtotal, addItem, removeItem, updateQuantity, clear };
}
