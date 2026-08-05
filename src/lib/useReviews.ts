"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getProductBySlug, type Review } from "./products";

const STORAGE_PREFIX = "keynet-reviews-";

const listeners = new Map<string, Set<() => void>>();
const cachedExtra = new Map<string, Review[]>();

function readStoredExtra(slug: string): Review[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + slug);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function getExtraSnapshot(slug: string): Review[] {
  if (!cachedExtra.has(slug)) {
    cachedExtra.set(slug, readStoredExtra(slug));
  }
  return cachedExtra.get(slug)!;
}

function getServerSnapshot(): Review[] {
  return [];
}

function setExtra(slug: string, reviews: Review[]) {
  cachedExtra.set(slug, reviews);
  window.localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(reviews));
  listeners.get(slug)?.forEach((listener) => listener());
}

export function useReviews(slug: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (!listeners.has(slug)) listeners.set(slug, new Set());
      listeners.get(slug)!.add(callback);
      return () => listeners.get(slug)!.delete(callback);
    },
    [slug],
  );

  const getSnapshot = useCallback(() => getExtraSnapshot(slug), [slug]);

  const extraReviews = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const seedReviews = getProductBySlug(slug)?.reviews ?? [];
  const reviews = [...extraReviews, ...seedReviews];

  const addReview = useCallback(
    (review: Omit<Review, "id" | "date">) => {
      const newReview: Review = {
        ...review,
        id: `user-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
      };
      setExtra(slug, [newReview, ...getExtraSnapshot(slug)]);
    },
    [slug],
  );

  return { reviews, addReview };
}
