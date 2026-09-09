"use client";

import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";
import { MacOsTopNav } from "./mac-os-top-nav";
import { MacOsSidebar } from "./mac-os-sidebar";
import { MacOsNotificationCenter } from "./mac-os-notification-center";
import { useAppStore } from "@/stores/app-store";
import { roleDashboardLabel } from "@/lib/demo-data";

interface MacOsWindowFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function MacOsWindowFrame({ children, className }: MacOsWindowFrameProps) {
  const { schoolName, role, gradeBand } = useAppStore(
    useShallow((s) => {
      const user = s.currentUser();
      return {
        schoolName: user.schoolName,
        role: user.role,
        gradeBand: user.gradeBand,
      };
    })
  );
  const studentBand = useAppStore((s) => s.studentBand);
  const title = `${schoolName} — ${roleDashboardLabel(role, gradeBand ?? studentBand)} — Curriculym`;

  return (
    <div className="desktop-wallpaper flex min-h-screen items-center justify-center p-3 md:p-5">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "relative flex h-[min(920px,calc(100vh-1.5rem))] w-full max-w-[1440px] overflow-hidden rounded-[18px] border border-black/10 bg-background/40 shadow-[0_24px_80px_rgba(0,0,0,0.22)] dark:border-white/10",
          className
        )}
      >
        <MacOsSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <MacOsTopNav title={title} />
          <main className="relative min-h-0 flex-1 overflow-y-auto bg-background/70 p-4 md:p-6 dark:bg-background/50">
            {children}
          </main>
        </div>
        <MacOsNotificationCenter />
      </motion.div>
    </div>
  );
}
