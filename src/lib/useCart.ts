"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PRODUCTS } from "./products";

const STORAGE_KEY = "keynex-cart";

export type CartItem = { slug: string; quantity: number };

const listeners = new Set<() => void>();
let cachedItems: CartItem[] | null = null;

function readStoredItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): CartItem[] {
  if (cachedItems === null) {
    cachedItems = readStoredItems();
  }
  return cachedItems;
}

const EMPTY_ITEMS: CartItem[] = [];

function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setStoredItems(items: CartItem[]) {
  cachedItems = items;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((listener) => listener());
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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

  const subtotal = items.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return { items, count, subtotal, addItem, removeItem, updateQuantity, clear };
}
