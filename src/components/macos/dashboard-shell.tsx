"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { MacOsWindowFrame } from "@/components/macos/mac-os-window-frame";
import { useAppStore } from "@/stores/app-store";
import { pathRole, roleHomePath, type AccountAccess } from "@/lib/clerk-roles";

export function DashboardShell({
  children,
  access,
}: {
  children: React.ReactNode;
  access: AccountAccess;
}) {
  const hydrateAccess = useAppStore((s) => s.hydrateAccess);
  const setRole = useAppStore((s) => s.setRole);
  const pathname = usePathname();
  const router = useRouter();

  const accessKey = useMemo(
    () =>
      [
        access.email,
        access.name,
        access.primaryRole,
        access.canAccessAll ? "1" : "0",
        access.allowedRoles.join(","),
      ].join("|"),
    [access]
  );

  useEffect(() => {
    const required = pathRole(pathname) ?? access.primaryRole;
    const allowed =
      access.canAccessAll || access.allowedRoles.includes(required);

    hydrateAccess({
      role: allowed ? required : access.primaryRole,
      allowedRoles: access.allowedRoles,
      email: access.email,
      name: access.name,
      canAccessAll: access.canAccessAll,
    });

    if (!allowed) {
      router.replace(roleHomePath(access.primaryRole));
      return;
    }

    setRole(required);
  }, [access, accessKey, pathname, hydrateAccess, setRole, router]);

  return (
    <div className="relative">
      <MacOsWindowFrame>{children}</MacOsWindowFrame>
      <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full border border-black/10 bg-white/90 p-1.5 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-[#2C2C2E]/90">
        <UserButton />
      </div>
    </div>
  );
}
