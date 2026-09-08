"use client";

import Link from "next/link";
import { AcademicHub } from "@/components/modules/academic-hub";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function StaffOverviewPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { href: "/staff/meetings", label: "Parent slots open", value: "8" },
          { href: "/staff/rooms", label: "Room holds today", value: "2" },
          { href: "/staff/gradebook", label: "Ungraded tasks", value: "14" },
        ].map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <AcademicHub />
    </div>
  );
}
