"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { GradesPanel } from "@/components/modules/grades-panel";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);
  return <GradesPanel title="Grades" description="Current term scores for Aria Patel." />;
}
