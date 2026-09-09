"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { EcaHub } from "@/components/modules/eca-hub";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <EcaHub />;
}
