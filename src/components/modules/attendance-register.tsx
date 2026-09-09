"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { DEMO_STUDENTS } from "@/lib/school-population";

const STATUSES = ["Present", "Late", "Absent", "Excused"] as const;
type Status = (typeof STATUSES)[number];

export function AttendanceRegister({ formGroup = "G8A" }: { formGroup?: string }) {
  const roster = DEMO_STUDENTS.filter((s) => s.formGroup === formGroup).slice(0, 24);
  const [marks, setMarks] = useState<Record<string, Status>>(
    Object.fromEntries(roster.map((s) => [s.id, "Present" as Status]))
  );
  const pushNotification = useAppStore((s) => s.pushNotification);

  const counts = STATUSES.map((status) => ({
    status,
    count: Object.values(marks).filter((m) => m === status).length,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Attendance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Homeroom register for {formGroup} — mark present, late, absent, or excused.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {counts.map((c) => (
          <Card key={c.status}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{c.status}</p>
              <p className="mt-1 text-2xl font-semibold">{c.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle>Today · Period 1 Homeroom</CardTitle>
              <CardDescription>{roster.length} students on roll</CardDescription>
            </div>
            <Button
              onClick={() =>
                pushNotification({
                  title: "Register submitted",
                  body: `${formGroup} attendance locked for Period 1.`,
                  kind: "success",
                })
              }
            >
              Submit register
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {roster.map((s) => (
            <div
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/5 bg-muted/30 px-3 py-2.5 dark:border-white/10"
            >
              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  {s.formGroup} · House {s.house}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setMarks((m) => ({ ...m, [s.id]: status }))}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      marks[s.id] === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-white text-muted-foreground dark:bg-[#2C2C2E]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
