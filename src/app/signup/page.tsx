import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign Up | keynex",
};

// same AuthCard as login, just in signup mode
export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <AuthCard mode="signup" />
    </Suspense>
  );
}
