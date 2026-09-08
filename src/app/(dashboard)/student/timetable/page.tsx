"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

const PERIODS = [
  { time: "08:30–09:20", class: "Homeroom 8A", room: "A204" },
  { time: "09:30–10:20", class: "Mathematics", room: "B112" },
  { time: "10:40–11:30", class: "Sciences", room: "Lab B" },
  { time: "11:40–12:30", class: "Languages", room: "C018" },
  { time: "13:30–14:20", class: "Arts", room: "Studio 1" },
];

export default function StudentTimetablePage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My timetable</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tuesday · Grade 8</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Period grid</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {PERIODS.map((p) => (
            <div
              key={p.time}
              className="grid grid-cols-[110px_1fr_80px] items-center gap-3 rounded-xl border border-black/5 bg-muted/30 px-3 py-2.5 text-sm dark:border-white/10"
            >
              <span className="tabular-nums text-muted-foreground">{p.time}</span>
              <span className="font-medium">{p.class}</span>
              <span className="text-right text-xs text-muted-foreground">{p.room}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
