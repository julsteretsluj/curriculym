"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { FixturesSocs } from "@/components/modules/fixtures-socs";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <FixturesSocs />;
}
