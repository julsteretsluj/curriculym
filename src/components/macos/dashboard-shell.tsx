"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { MacOsWindowFrame } from "@/components/macos/mac-os-window-frame";
import { useAppStore } from "@/stores/app-store";
import type { AppRole } from "@/lib/demo-data";

export function DashboardShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: AppRole;
}) {
  const setRole = useAppStore((s) => s.setRole);

  useEffect(() => {
    setRole(role);
  }, [role, setRole]);

  return (
    <div className="relative">
      <MacOsWindowFrame>{children}</MacOsWindowFrame>
      <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full border border-black/10 bg-white/90 p-1.5 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-[#2C2C2E]/90">
        <UserButton />
      </div>
    </div>
  );
}
