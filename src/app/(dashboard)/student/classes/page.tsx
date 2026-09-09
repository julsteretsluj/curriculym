"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { ClassesRoster } from "@/components/modules/classes-roster";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <ClassesRoster title="My classes" description="Subjects and next sessions this week." />;
}
