"use client";

import { useState } from "react";
import { useReviews } from "@/lib/useReviews";
import { getAverageRating } from "@/lib/products";
import { StarRating } from "./StarRating";
import { ReviewerAvatar } from "./ReviewerAvatar";

export function ReviewsSection({ slug }: { slug: string }) {
  const { reviews, addReview } = useReviews(slug);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const average = getAverageRating(reviews);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !comment.trim() || rating === 0) return;
    addReview({ author: name.trim(), rating, comment: comment.trim() });
    setName("");
    setRating(0);
    setComment("");
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <StarRating value={average} size="md" />
        <span className="text-sm text-white/60">
          {average.toFixed(1)} out of 5 ({reviews.length} review{reviews.length === 1 ? "" : "s"})
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-3 border-b border-white/10 pb-6">
            <ReviewerAvatar name={review.author} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{review.author}</p>
                <p className="text-xs text-white/40">{review.date}</p>
              </div>
              <StarRating value={review.rating} className="mt-1" />
              <p className="mt-2 text-sm leading-6 text-white/70">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 border border-white/5 backdrop-blur">
        <h3 className="text-sm font-semibold text-white">Write a review</h3>
        <div className="mt-4">
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
          className="mt-4 w-full rounded-lg border border-white/20 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none"
        />
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Share your thoughts..."
          required
          rows={3}
          className="mt-3 w-full rounded-lg border border-white/20 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={rating === 0}
          className="mt-4 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-5 py-2 text-xs font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(242,210,255,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit review
        </button>
        {submitted && <p className="mt-2 text-xs text-green-500">Thanks for your review!</p>}
      </form>
    </div>
  );
}
