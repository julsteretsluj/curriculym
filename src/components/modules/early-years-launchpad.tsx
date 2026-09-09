"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Camera,
  Mic,
  Palette,
  Star,
  Trophy,
  Video,
} from "lucide-react";
import { useAppStore } from "@/stores/app-store";

const APPS = [
  { label: "My Day", icon: BookOpen, tint: "from-sky-400 to-blue-500" },
  { label: "Story Time", icon: Mic, tint: "from-violet-400 to-purple-500" },
  { label: "Draw & Share", icon: Palette, tint: "from-rose-400 to-pink-500" },
  { label: "Photo Upload", icon: Camera, tint: "from-amber-400 to-orange-500" },
  { label: "Video Diary", icon: Video, tint: "from-emerald-400 to-teal-500" },
  { label: "Star Badges", icon: Star, tint: "from-yellow-300 to-amber-400" },
];

export function EarlyYearsLaunchpad() {
  const name = useAppStore((s) => s.currentUser().name);

  return (
    <div className="mx-auto max-w-3xl py-4">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-muted-foreground">Good morning</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{name}</h1>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-traffic-yellow/25 px-3 py-1.5 text-sm font-medium">
          <Trophy className="h-4 w-4 text-amber-600" />
          12 star badges this week
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {APPS.map((app, i) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.label}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 320, damping: 22 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br ${app.tint} shadow-lg shadow-black/10`}
              >
                <Icon className="h-10 w-10 text-white" strokeWidth={1.75} />
              </div>
              <span className="text-[15px] font-medium">{app.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl border border-black/5 bg-card/90 p-5 text-center shadow-sm dark:border-white/10">
        <p className="text-sm text-muted-foreground">Today&apos;s challenge</p>
        <p className="mt-1 text-lg font-semibold tracking-tight">
          Record a 20-second video about your favourite book
        </p>
      </div>
    </div>
  );
}
