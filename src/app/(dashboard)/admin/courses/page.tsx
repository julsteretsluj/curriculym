"use client";

import { CurriculumCourseBrowser } from "@/components/modules/curriculum-course-browser";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function AdminCoursesPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <CurriculumCourseBrowser />;
}
