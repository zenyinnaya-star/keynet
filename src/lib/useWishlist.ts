"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "keynet-wishlist";
const listeners = new Set<() => void>();
let cachedIds: string[] | null = null;

function readStoredIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (cachedIds === null) {
    cachedIds = readStoredIds();
  }
  return cachedIds;
}

function getServerSnapshot(): string[] {
  return [];
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setStoredIds(ids: string[]) {
  cachedIds = ids;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  listeners.forEach((listener) => listener());
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const has = useCallback((slug: string) => ids.includes(slug), [ids]);

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    const next = current.includes(slug)
      ? current.filter((id) => id !== slug)
      : [...current, slug];
    setStoredIds(next);
  }, []);

  return { ids, count: ids.length, has, toggle };
}
