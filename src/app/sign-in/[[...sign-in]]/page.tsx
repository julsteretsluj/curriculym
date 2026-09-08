import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your Curriculym school workspace.",
};

export default function SignInPage() {
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
        <BrandMark size={36} variant="wordmark" className="mb-8" priority />
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/admin"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "rounded-[20px] border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
            },
          }}
        />
        <p className="mt-6 text-center text-[13px] text-[#6E6E73]">
          New school admin?{" "}
          <Link href="/sign-up" className="text-[#007AFF] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
