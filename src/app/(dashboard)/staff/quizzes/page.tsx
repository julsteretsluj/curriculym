"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { QuizzesAssessments } from "@/components/modules/quizzes-assessments";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <QuizzesAssessments />;
}
