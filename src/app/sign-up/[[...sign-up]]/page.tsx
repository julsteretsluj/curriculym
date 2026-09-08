import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export const metadata = {
  title: "Sign up",
  description: "Create your Curriculym school workspace account.",
};

export default function SignUpPage() {
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
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-16">
        <BrandMark size={36} variant="wordmark" tone="light" className="mb-8" priority />
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/admin"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "rounded-[20px] border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
            },
          }}
        />
        <p className="mt-6 text-center text-[13px] text-[#6E6E73]">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#007AFF] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
