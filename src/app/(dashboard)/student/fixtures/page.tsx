"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { FixturesHub } from "@/components/modules/fixtures-hub";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <FixturesHub />;
}
