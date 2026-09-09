"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { AdmissionsPipeline } from "@/components/modules/admissions-pipeline";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <AdmissionsPipeline />;
}
