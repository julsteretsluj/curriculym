"use client";

import { Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

const TASKS = [
  { title: "Science reflection", due: "Thu", subject: "Sciences" },
  { title: "Algebra practice set", due: "Fri", subject: "Math" },
  { title: "Reading log week 6", due: "Mon", subject: "English" },
];

export default function StudentAssignmentsPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Homework</h1>
        <p className="mt-1 text-sm text-muted-foreground">Dropzone for upcoming work.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Due soon</CardTitle>
              <CardDescription>3 items need attention</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {TASKS.map((t) => (
              <div
                key={t.title}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>
                <span className="text-xs font-medium text-primary">Due {t.due}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Submit work</CardTitle>
              <CardDescription>Upload files for your teachers</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <button
              type="button"
              className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-black/15 bg-muted/40 py-12 text-sm text-muted-foreground dark:border-white/15"
            >
              <Upload className="h-6 w-6 text-primary" />
              Drop homework here
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
