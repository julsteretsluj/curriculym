"use client";

import { Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TASKS = [
  { title: "Science reflection", due: "Thu", subject: "Sciences", kind: "Homework" },
  { title: "Algebra practice set", due: "Fri", subject: "Math", kind: "Homework" },
  { title: "Reading log week 6", due: "Mon", subject: "English", kind: "Assignment" },
  { title: "I&S source analysis", due: "Wed", subject: "I&S", kind: "Assignment" },
];

export function HomeworkBoard({
  title = "Homework & assignments",
  description = "Due work and submissions",
  mode = "student",
}: {
  title?: string;
  description?: string;
  mode?: "student" | "staff" | "parent";
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{mode === "staff" ? "Set for classes" : "Due soon"}</CardTitle>
            <CardDescription>
              {mode === "staff" ? "Active homework across your groups" : "Items needing attention"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {TASKS.map((t) => (
              <div
                key={t.title}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{t.title}</p>
                    <Badge className="border border-black/10 bg-transparent text-muted-foreground text-[10px] dark:border-white/15">
                      {t.kind}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>
                <span className="text-xs font-medium text-primary">Due {t.due}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{mode === "staff" ? "Collect submissions" : "Submit work"}</CardTitle>
            <CardDescription>
              {mode === "parent" ? "View what your child needs to hand in" : "Upload files for teachers"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button
              type="button"
              className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-black/15 bg-muted/40 py-12 text-sm text-muted-foreground dark:border-white/15"
            >
              <Upload className="h-6 w-6 text-primary" />
              {mode === "staff" ? "Drop marking pack here" : "Drop homework here"}
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
