import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign Up | keynet",
};

export default function SignupPage() {
  return <AuthCard mode="signup" />;
}
