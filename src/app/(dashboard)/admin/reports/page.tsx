"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { ReportCards } from "@/components/modules/report-cards";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <ReportCards />;
}
