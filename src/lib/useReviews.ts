"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getProductBySlug, type Review } from "./products";

const STORAGE_PREFIX = "keynex-reviews-";

// listeners and cached reviews are keyed by product slug, since each product has its own review list
const listeners = new Map<string, Set<() => void>>();
const cachedExtra = new Map<string, Review[]>();

// reads the user-submitted reviews for one product out of localStorage
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

const EMPTY_REVIEWS: Review[] = [];

function getServerSnapshot(): Review[] {
  return EMPTY_REVIEWS;
}

// saves the updated review list for a product and notifies subscribers watching that slug
function setExtra(slug: string, reviews: Review[]) {
  cachedExtra.set(slug, reviews);
  window.localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(reviews));
  listeners.get(slug)?.forEach((listener) => listener());
}

// hook for reading and adding reviews on a single product, combining seed data with user-submitted ones
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

  // combine user-submitted reviews with the hardcoded seed reviews from the product data, newest first
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
