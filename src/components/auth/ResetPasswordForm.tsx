"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark, Wordmark } from "@/components/BrandMark";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
      <div className="bg-grain w-full max-w-sm rounded-3xl bg-zinc-950 p-8 shadow-2xl shadow-black/60 ring-1 ring-white/10">
        <Link href="/" className="mb-6 flex items-center gap-2.5">
          <BrandMark className="h-7 w-7 text-[var(--keynex-teal-bright)]" />
          <Wordmark className="text-sm" />
        </Link>

        <h1 className="text-2xl font-semibold text-white">Set a new password</h1>
        <p className="mt-1 text-sm text-white/50">
          Choose a new password for your keynex account.
        </p>

        {done ? (
          <div className="mt-8 rounded-xl border border-teal-600/40 bg-teal-600/10 p-4 text-sm text-teal-300">
            Password updated. Redirecting you to log in...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              className={inputClass}
            />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className={inputClass}
            />

            {error && <p className="text-xs text-teal-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-gradient-to-r from-teal-600 to-teal-500 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(242,210,255,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
