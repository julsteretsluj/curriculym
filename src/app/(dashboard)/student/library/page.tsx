"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { OnlineLibrary } from "@/components/modules/online-library";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <OnlineLibrary />;
}
