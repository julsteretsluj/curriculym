"use client";

import { AcademicHub } from "@/components/modules/academic-hub";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function StaffClassesPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <AcademicHub />;
}
