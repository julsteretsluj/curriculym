"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { AttendanceRegister } from "@/components/modules/attendance-register";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <AttendanceRegister />;
}
