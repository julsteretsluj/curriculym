"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";

const PERIODS = [
  { period: "P1", subject: "English L&L", room: "118" },
  { period: "P2", subject: "Mathematics", room: "204" },
  { period: "P3", subject: "Sciences", room: "Lab B" },
  { period: "P4", subject: "I&S", room: "212" },
  { period: "P5", subject: "PE", room: "Gym" },
];

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Schedule</h1>
        <p className="mt-1 text-sm text-muted-foreground">Today’s timetable for Aria Patel.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Wednesday</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {PERIODS.map((p) => (
            <div
              key={p.period}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
            >
              <span className="font-medium">
                {p.period} · {p.subject}
              </span>
              <span className="text-muted-foreground">{p.room}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
