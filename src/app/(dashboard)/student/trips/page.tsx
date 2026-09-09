"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { TripsConsent } from "@/components/modules/trips-consent";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <TripsConsent />;
}
