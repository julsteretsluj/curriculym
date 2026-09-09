"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { SchoolDirectory } from "@/components/modules/school-directory";

export default function StaffDirectoryPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return (
    <SchoolDirectory
      title="Directory"
      description="Students and colleagues for your teaching day."
      defaultTab="students"
      tabs={["students", "teachers"]}
    />
  );
}
