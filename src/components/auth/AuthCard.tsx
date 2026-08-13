"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandMark, Wordmark } from "@/components/BrandMark";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";
type Status = "idle" | "check-email" | "reset-sent";

const IMAGE_CLIP = "polygon(0 0, 100% 0, 82% 100%, 0 100%)";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none";

// login/signup form — same component renders both modes depending on the "mode" prop
export function AuthCard({ mode }: { mode: Mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitting, setSubmitting] = useState(false);

  // handles both the signup and login form submit, branching on mode
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (isSignup && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();

    if (isSignup) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      setSubmitting(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (data.session) {
        // email confirmation is off, so signup logs the user straight in
        router.push(next);
        router.refresh();
        return;
      }
      // email confirmation is required, so show a "check your inbox" message instead
      setStatus("check-email");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push(next);
    router.refresh();
  };

  // sends a password reset email; only shown on the login form
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email above first, then tap "Forgot password?".');
      return;
    }
    setError("");
    setSubmitting(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setStatus("reset-sent");
  };

  // kicks off Google OAuth login, works for both login and signup
  const handleGoogleSignIn = async () => {
    setError("");
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
    }
    // On success Supabase redirects the browser to Google, then back to
    // /auth/callback — nothing further to do here.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
      <div className="bg-grain relative flex w-full max-w-4xl overflow-hidden rounded-3xl bg-zinc-950 shadow-2xl shadow-black/60 ring-1 ring-white/10">
        {/* Image panel */}
        <div className="relative hidden w-[45%] shrink-0 md:block">
          <Image
            src="/gamers-login.webp"
            alt="Two keynex users celebrating at their setup"
            fill
            sizes="(min-width: 768px) 45vw, 0px"
            style={{ clipPath: IMAGE_CLIP, objectFit: "cover" }}
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/50"
            style={{ clipPath: IMAGE_CLIP }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5">
                <BrandMark className="h-7 w-7 text-[var(--keynex-teal-bright)]" />
                <Wordmark className="text-sm" />
              </Link>
              <Link
                href={isSignup ? "/login" : "/signup"}
                className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                {isSignup ? "Log in" : "Join us"}
              </Link>
            </div>

            <div>
              <p className="text-2xl font-semibold text-white">Hear the game.</p>
              <p className="mt-2 max-w-[190px] text-sm text-white/70">
                Sign in to save your wishlist, orders, and reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 md:w-[55%]">
          <div className="mx-auto w-full max-w-sm">
            <Link href="/" className="mb-6 flex items-center gap-2.5 md:hidden">
              <BrandMark className="h-7 w-7 text-[var(--keynex-teal-bright)]" />
              <Wordmark className="text-sm" />
            </Link>

            <h1 className="text-2xl font-semibold text-white">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-white/50">
              {isSignup
                ? "Join keynex to track orders, wishlist, and reviews."
                : "Log in to your keynex account."}
            </p>

            {status === "check-email" ? (
              <div className="mt-8 rounded-xl border border-teal-600/40 bg-teal-600/10 p-4 text-sm text-teal-300">
                Check your inbox — we sent a confirmation link to{" "}
                <span className="font-semibold text-white">{email}</span>. Click it to activate
                your account, then log in.
                <Link href="/login" className="mt-3 block font-semibold text-white underline">
                  Back to log in →
                </Link>
              </div>
            ) : status === "reset-sent" ? (
              <div className="mt-8 rounded-xl border border-teal-600/40 bg-teal-600/10 p-4 text-sm text-teal-300">
                If an account exists for{" "}
                <span className="font-semibold text-white">{email}</span>, we&apos;ve sent a
                password reset link.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {isSignup && (
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Full name"
                    className={inputClass}
                  />
                )}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  className={inputClass}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className={inputClass}
                />
                {isSignup && (
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm password"
                    className={inputClass}
                  />
                )}

                {error && <p className="text-xs text-teal-500">{error}</p>}

                {!isSignup && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs text-white/50 transition-colors hover:text-white"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-gradient-to-r from-teal-600 to-teal-500 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(242,210,255,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? isSignup
                      ? "Signing up..."
                      : "Logging in..."
                    : isSignup
                      ? "Sign up"
                      : "Log in"}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-white/40">Or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-medium text-white transition-all hover:border-teal-500/50 hover:bg-black/30 hover:shadow-[0_0_12px_rgba(242,210,255,0.15)]"
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black"
                  >
                    G
                  </span>
                  Continue with Google
                </button>

                <p className="pt-2 text-center text-sm text-white/50">
                  {isSignup ? "Already have an account? " : "Don't have an account? "}
                  <Link
                    href={isSignup ? "/login" : "/signup"}
                    className="font-semibold text-teal-500 hover:underline"
                  >
                    {isSignup ? "Log in" : "Sign up"}
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
