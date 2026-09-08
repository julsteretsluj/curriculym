"use client";

import { SafeguardingDesk } from "@/components/modules/safeguarding-desk";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function AdminSafeguardingPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <SafeguardingDesk />;
}
