"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { HomeworkBoard } from "@/components/modules/homework-board";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);
  return <HomeworkBoard mode="parent" title="Homework" description="Upcoming work for your children." />;
}
