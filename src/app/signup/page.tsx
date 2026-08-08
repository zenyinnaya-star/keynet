import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign Up | keynex",
};

export default function SignupPage() {
  return <AuthCard mode="signup" />;
}
