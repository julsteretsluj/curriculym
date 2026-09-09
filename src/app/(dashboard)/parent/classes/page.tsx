"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { ClassesRoster } from "@/components/modules/classes-roster";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);
  return <ClassesRoster title="Children’s classes" description="Subjects and teachers for your family." />;
}
