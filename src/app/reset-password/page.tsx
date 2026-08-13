import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | keynex",
};

// route wrapper, all the actual content lives in ResetPasswordForm
export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
