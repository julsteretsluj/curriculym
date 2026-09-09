"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { ClassroomWorkspace } from "@/components/modules/classroom-workspace";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);
  return <ClassroomWorkspace />;
}
