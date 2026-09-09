"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { CoverManagement } from "@/components/modules/cover-management";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <CoverManagement />;
}
