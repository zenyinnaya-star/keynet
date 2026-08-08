"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Mode = "login" | "signup";

const IMAGE_CLIP = "polygon(0 0, 100% 0, 82% 100%, 0 100%)";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none";

export function AuthCard({ mode }: { mode: Mode }) {
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
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

    setSuccess(true);
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
              <Link href="/" className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold">
                  K
                </span>
                <span className="text-sm font-semibold text-white">keynex</span>
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
            <div className="mb-6 flex items-center gap-2 md:hidden">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                K
              </span>
              <span className="text-sm font-semibold text-white">keynex</span>
            </div>

            <h1 className="text-2xl font-semibold text-white">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-white/50">
              {isSignup
                ? "Join keynex to track orders, wishlist, and reviews."
                : "Log in to your keynex account."}
            </p>

            {success ? (
              <div className="mt-8 rounded-xl border border-green-600/40 bg-green-600/10 p-4 text-sm text-green-400">
                {isSignup ? "Account created." : "Signed in."} This is a demo form — it isn&apos;t
                connected to a real account system, so nothing was actually stored.
                <Link href="/" className="mt-3 block font-semibold text-white underline">
                  Continue to keynex →
                </Link>
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

                {error && <p className="text-xs text-red-500">{error}</p>}

                {!isSignup && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-xs text-white/50 transition-colors hover:text-white"
                      onClick={() => setError("Password reset isn't connected in this demo.")}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-red-600 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
                >
                  {isSignup ? "Sign up" : "Log in"}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-white/40">Or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setError("Google sign-in isn't connected in this demo — try email instead.")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-medium text-white transition-colors hover:border-white/50"
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
                    className="font-semibold text-red-500 hover:underline"
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
