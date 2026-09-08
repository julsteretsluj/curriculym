"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

const CURRICULA = [
  { name: "IB PYP", status: "Active", years: "Pre-K–G5" },
  { name: "IB MYP", status: "Active", years: "G6–G10" },
  { name: "IB DP", status: "Active", years: "G11–G12" },
  { name: "Cambridge IGCSE", status: "Pilot", years: "G9–G10" },
  { name: "AP Capstone", status: "Optional", years: "G11–G12" },
];

export default function AdminSchoolPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">School setup</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tenant configuration, curricula, and campus defaults.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Curricula matrix</CardTitle>
            <CardDescription>Harbor International School · Asia-Pacific campus</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {CURRICULA.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-4 py-3 dark:border-white/10"
            >
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.years}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                {c.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
