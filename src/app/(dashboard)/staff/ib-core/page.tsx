"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { IbCoreTracker } from "@/components/modules/ib-core-tracker";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <IbCoreTracker />;
}
