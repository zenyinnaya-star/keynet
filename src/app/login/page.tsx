import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Log In | keynex",
};

// Suspense is required here since AuthCard reads the "next" redirect param via useSearchParams
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthCard mode="login" />
    </Suspense>
  );
}
