"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { GradesPanel } from "@/components/modules/grades-panel";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <GradesPanel title="My grades" description="Criterion scores for the current term." />;
}
