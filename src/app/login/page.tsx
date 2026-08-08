import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Log In | keynex",
};

export default function LoginPage() {
  return <AuthCard mode="login" />;
}
