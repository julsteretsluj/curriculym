"use client";

import { ParentMeetingPortal } from "@/components/modules/parent-meeting-portal";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function StaffMeetingsPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <ParentMeetingPortal mode="staff" />;
}
