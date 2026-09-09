"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { SchoolChat } from "@/components/modules/school-chat";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <SchoolChat title="School chat" description="All campus channels" />;
}
