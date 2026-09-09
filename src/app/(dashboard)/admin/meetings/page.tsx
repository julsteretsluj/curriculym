"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { ParentMeetingPortal } from "@/components/modules/parent-meeting-portal";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <ParentMeetingPortal mode="staff" />;
}
