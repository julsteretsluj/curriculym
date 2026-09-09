"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { BrandMark } from "@/components/brand-mark";

export function LandingNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <BrandMark size={28} variant="wordmark" tone="light" priority />
        <nav className="flex items-center gap-2">
          <a
            href="#product"
            className="hidden rounded-full px-3 py-1.5 text-[13px] text-[#6E6E73] transition hover:text-[#1D1D1F] sm:inline"
          >
            Product
          </a>
          <a
            href="#curricula"
            className="hidden rounded-full px-3 py-1.5 text-[13px] text-[#6E6E73] transition hover:text-[#1D1D1F] md:inline"
          >
            Curricula
          </a>
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[#1D1D1F] transition hover:bg-black/5"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-[#007AFF] px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-[#0077ED]"
            >
              Open school workspace
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/admin"
              className="rounded-full bg-[#007AFF] px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-[#0077ED]"
            >
              Open workspace
            </Link>
            <UserButton />
          </Show>
        </nav>
      </div>
    </header>
  );
}

export function ProductWindowPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      <div className="overflow-hidden rounded-[18px] border border-black/10 bg-[#F5F5F7] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
        <div className="flex h-11 items-center gap-2 border-b border-black/5 bg-white/70 px-4 backdrop-blur-md">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
          <p className="ml-3 flex-1 truncate text-center text-[12px] text-[#6E6E73]">
            Harbor International School — Admin Dashboard — Curriculym
          </p>
        </div>
        <div className="grid min-h-[320px] grid-cols-[200px_1fr] md:min-h-[420px]">
          <aside className="hidden border-r border-black/5 bg-white/60 p-3 backdrop-blur-xl sm:block">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wide text-[#AEAEB2]">
              Source list
            </p>
            {["Overview", "Course Catalog", "Directory", "Safeguarding"].map((item, i) => (
              <div
                key={item}
                className={`mb-1 rounded-[10px] px-2.5 py-2 text-[13px] ${
                  i === 1 ? "bg-[#007AFF]/15 text-[#007AFF] font-medium" : "text-[#6E6E73]"
                }`}
              >
                {item}
              </div>
            ))}
          </aside>
          <div className="space-y-3 bg-[#F2F2F7] p-4 md:p-6">
            <div>
              <p className="text-[11px] font-medium text-[#6E6E73]">Course catalog</p>
              <p className="text-[22px] font-semibold tracking-tight text-[#1D1D1F]">
                351 courses · 13 pathways
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { title: "IB DP", meta: "33 subjects" },
                { title: "AP", meta: "40 courses" },
                { title: "IGCSE", meta: "72 syllabuses" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                >
                  <p className="text-[15px] font-semibold tracking-tight">{card.title}</p>
                  <p className="mt-1 text-[12px] text-[#6E6E73]">{card.meta}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] font-semibold">Today’s timetable</p>
                <span className="rounded-full bg-[#007AFF]/10 px-2 py-0.5 text-[10px] font-medium text-[#007AFF]">
                  Live
                </span>
              </div>
              {["MYP Sciences · Lab B", "Parent meetings · Open slots", "Room booking · Library"].map(
                (row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between border-t border-black/5 py-2 text-[12px] first:border-0"
                  >
                    <span className="text-[#1D1D1F]">{row}</span>
                    <span className="text-[#AEAEB2]">Today</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
