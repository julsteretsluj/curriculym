"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { HomeworkBoard } from "@/components/modules/homework-board";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <HomeworkBoard mode="staff" title="Homework & assignments" description="Set work and collect submissions." />;
}
