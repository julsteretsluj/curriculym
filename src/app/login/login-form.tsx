"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { DEMO_ACCOUNT_DIRECTORY } from "@/lib/demo-accounts";

const initial: LoginState = {};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1D1D1F]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,122,255,0.12), transparent 50%), #F2F2F7",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
        <Link href="/" className="mb-10 text-center text-[17px] font-semibold tracking-tight">
          Curriculym
        </Link>

        <div className="rounded-[20px] border border-black/5 bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h1 className="text-[22px] font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-[14px] text-[#6E6E73]">
            Access your school workspace. Demo password for all accounts:{" "}
            <span className="font-medium text-[#1D1D1F]">curriculym</span>
          </p>

          <form action={formAction} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <label className="block text-[12px] font-medium text-[#6E6E73]">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="username"
                defaultValue="admin@harbor.edu"
                className="mt-1.5 h-11 w-full rounded-xl border border-[rgba(60,60,67,0.18)] bg-[#F2F2F7] px-3 text-[15px] outline-none focus:ring-2 focus:ring-[#007AFF]/30"
              />
            </label>
            <label className="block text-[12px] font-medium text-[#6E6E73]">
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                defaultValue="curriculym"
                className="mt-1.5 h-11 w-full rounded-xl border border-[rgba(60,60,67,0.18)] bg-[#F2F2F7] px-3 text-[15px] outline-none focus:ring-2 focus:ring-[#007AFF]/30"
              />
            </label>

            {state.error && (
              <p className="rounded-xl bg-[#FF3B30]/10 px-3 py-2 text-[13px] text-[#FF3B30]">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="h-11 w-full rounded-full bg-[#007AFF] text-[15px] font-medium text-white transition hover:bg-[#0077ED] disabled:opacity-60"
            >
              {pending ? "Signing in…" : "Enter workspace"}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-[16px] border border-black/5 bg-white/80 p-4 backdrop-blur-sm">
          <p className="text-[12px] font-medium text-[#6E6E73]">Demo accounts</p>
          <ul className="mt-2 space-y-1.5">
            {DEMO_ACCOUNT_DIRECTORY.map((a) => (
              <li key={a.email} className="flex justify-between gap-3 text-[12px]">
                <span className="truncate text-[#1D1D1F]">{a.email}</span>
                <span className="shrink-0 capitalize text-[#AEAEB2]">{a.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-[13px] text-[#6E6E73]">
          <Link href="/" className="text-[#007AFF] hover:underline">
            Back to Curriculym
          </Link>
        </p>
      </div>
    </div>
  );
}
