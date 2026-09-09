"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { SchoolChat } from "@/components/modules/school-chat";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);
  return <SchoolChat title="Family chat" description="Homeroom and year-group channels" audienceFilter={["Family", "Class"]} />;
}
