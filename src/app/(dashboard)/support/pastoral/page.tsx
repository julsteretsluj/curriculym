"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { PastoralMedical } from "@/components/modules/pastoral-medical";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("support"), [setRole]);
  return <PastoralMedical />;
}
