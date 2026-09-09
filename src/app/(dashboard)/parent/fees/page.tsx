"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { FeesBilling } from "@/components/modules/fees-billing";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);
  return <FeesBilling />;
}
