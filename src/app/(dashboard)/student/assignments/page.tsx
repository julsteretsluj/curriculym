"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { HomeworkBoard } from "@/components/modules/homework-board";

export default function StudentAssignmentsPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return (
    <HomeworkBoard
      mode="student"
      title="Homework & assignments"
      description="Due work and file dropzone."
    />
  );
}
