"use client";

import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { MacOsWindowFrame } from "@/components/macos/mac-os-window-frame";
import { useAppStore } from "@/stores/app-store";
import type { AppRole } from "@/lib/demo-data";
import { logoutAction } from "@/app/actions/auth";

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
      <form action={logoutAction} className="pointer-events-none fixed bottom-6 right-6 z-[60]">
        <button
          type="submit"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-[12px] font-medium text-[#1D1D1F] shadow-md backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-[#2C2C2E]/90 dark:text-[#F5F5F7]"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </form>
    </div>
  );
}
