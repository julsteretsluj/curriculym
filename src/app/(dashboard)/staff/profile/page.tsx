"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { ProfilePanel } from "@/components/modules/profile-panel";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <ProfilePanel />;
}
