"use client";

import { EarlyYearsLaunchpad } from "@/components/modules/early-years-launchpad";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

const FEED = [
  { title: "Daily news", body: "Sports day rehearsal at 14:00 on the field." },
  { title: "Homework due", body: "Science reflection — submit by Thursday." },
  { title: "Club reminder", body: "Robotics meets in Lab C after school." },
];

export default function StudentHomePage() {
  const setRole = useAppStore((s) => s.setRole);
  const band = useAppStore((s) => s.studentBand);
  useEffect(() => setRole("student"), [setRole]);

  if (band === "early_years") return <EarlyYearsLaunchpad />;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Student desktop</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Timetable, feeds, homework, and extracurriculars in one window.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Today</CardTitle>
              <CardDescription>Your period schedule</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Homeroom", "Mathematics", "Sciences", "Languages", "Arts"].map((s, i) => (
              <div
                key={s}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-2.5 text-sm dark:border-white/10"
              >
                <span className="font-medium">{s}</span>
                <span className="text-xs text-muted-foreground">
                  {8 + i}:{i % 2 === 0 ? "30" : "40"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Feed</CardTitle>
              <CardDescription>News & reminders</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {FEED.map((f) => (
              <div key={f.title} className="rounded-xl bg-muted/40 p-3">
                <p className="text-[13px] font-semibold">{f.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
