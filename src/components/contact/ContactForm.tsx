"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Step = "name" | "email" | "done";

// two-step contact form: collects name, then email, then shows a confirmation (demo only, doesn't send anywhere)
export function ContactForm() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // moves from the name step to the email step once a name has been entered
  const handleNext = () => {
    setError("");
    if (!name.trim()) {
      setError("Tell us your name first.");
      return;
    }
    setStep("email");
  };

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="max-w-sm rounded-xl border border-green-600/40 bg-green-600/10 p-4 text-sm text-green-400">
        Thanks, {name.split(" ")[0]} — we&apos;ll be in touch at {email}.
        <p className="mt-1 text-green-400/70">
          This is a demo form and isn&apos;t connected to a real inbox yet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSend} className="max-w-sm">
      <div className="flex items-center gap-3">
        {step === "name" ? (
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleNext();
              }
            }}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none"
          />
        ) : (
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your e-mail"
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none"
          />
        )}

        <button
          type={step === "name" ? "button" : "submit"}
          onClick={step === "name" ? handleNext : undefined}
          aria-label={step === "name" ? "Next" : "Send"}
          className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-teal-500 hover:text-teal-500 hover:shadow-[0_0_12px_rgba(242,210,255,0.2)] hover:bg-black/20"
        >
          {step === "name" ? "Next" : "Send"}
          <span aria-hidden>→</span>
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[10px] tracking-wide text-white/40 uppercase">
        <span className={cn(step === "name" ? "text-white" : "")}>Name</span>
        <span
          className={cn(
            "h-px flex-1",
            step === "email" ? "bg-teal-500" : "bg-white/20",
          )}
        />
        <span className={cn(step === "email" ? "text-white" : "")}>E-mail</span>
      </div>

      {error && <p className="mt-2 text-xs text-teal-500">{error}</p>}
    </form>
  );
}
