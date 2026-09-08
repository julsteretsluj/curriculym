import { Suspense } from "react";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { getSession } from "@/lib/session";
import { roleHomePath } from "@/lib/auth";

export const metadata = {
  title: "Sign in — Curriculym",
  description: "Sign in to your Curriculym school workspace.",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect(roleHomePath(session.role));
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F2F2F7] text-[#6E6E73]">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
