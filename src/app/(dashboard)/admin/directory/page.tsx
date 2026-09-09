"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { SchoolDirectory } from "@/components/modules/school-directory";

export default function AdminDirectoryPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return (
    <SchoolDirectory
      title="Directory"
      description="Full campus directory — students, teachers, and parents."
      defaultTab="teachers"
    />
  );
}
