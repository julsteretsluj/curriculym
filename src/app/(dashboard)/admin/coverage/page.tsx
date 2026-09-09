"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { PlatformCoverage } from "@/components/modules/platform-coverage";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <PlatformCoverage />;
}
