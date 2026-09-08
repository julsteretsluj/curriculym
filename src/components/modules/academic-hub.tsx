"use client";

import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useState } from "react";
import { cn } from "@/lib/utils";

const UNITS = [
  { id: 1, title: "Cells & Systems", week: "W3–W6", status: "Active", color: "bg-primary/15 text-primary" },
  { id: 2, title: "Forces & Motion", week: "W7–W10", status: "Planned", color: "bg-muted text-muted-foreground" },
  { id: 3, title: "Ecology Field Study", week: "W11–W14", status: "Draft", color: "bg-traffic-yellow/20 text-foreground" },
];

const CRITERIA = [
  { student: "Aria Patel", a: 7, b: 6, c: 7, d: 6 },
  { student: "Noah Berg", a: 5, b: 6, c: 5, d: 6 },
  { student: "Mia Santos", a: 8, b: 7, c: 8, d: 7 },
  { student: "Kai Nakamura", a: 6, b: 5, c: 6, d: 5 },
];

export function AcademicHub() {
  const [view, setView] = useState("grid");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Academic Hub</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Unit planning, assignment dropzone, and criterion gradebook.
          </p>
        </div>
        <SegmentedControl
          value={view}
          onChange={setView}
          options={[
            { value: "grid", label: "Grid" },
            { value: "list", label: "List" },
          ]}
        />
      </div>

      <div className={cn(view === "grid" ? "grid gap-4 md:grid-cols-3" : "space-y-3")}>
        {UNITS.map((unit, i) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div>
                  <CardTitle>{unit.title}</CardTitle>
                  <CardDescription>{unit.week}</CardDescription>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", unit.color)}>
                  {unit.status}
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  4 lessons · 2 assessments
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Homework dropzone</CardTitle>
              <CardDescription>Drag files or click to upload submissions.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <button
              type="button"
              className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-black/15 bg-muted/40 px-4 py-10 text-sm text-muted-foreground transition hover:border-primary/40 hover:bg-accent/40 dark:border-white/15"
            >
              <Upload className="h-6 w-6 text-primary" />
              Drop assignment files here
              <span className="text-xs">PDF, DOCX, images · max 25MB</span>
            </button>
            <div className="mt-3 space-y-2">
              {["Lab report — Cells.pdf", "Reflection journal.docx"].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 rounded-xl border border-black/5 bg-card px-3 py-2 text-sm dark:border-white/10"
                >
                  <CheckCircle2 className="h-4 w-4 text-traffic-green" />
                  {f}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Criterion gradebook</CardTitle>
              <CardDescription>IB MYP criteria A–D (0–8).</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/60 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Student</th>
                    <th className="px-2 py-2 font-medium">A</th>
                    <th className="px-2 py-2 font-medium">B</th>
                    <th className="px-2 py-2 font-medium">C</th>
                    <th className="px-2 py-2 font-medium">D</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map((row) => (
                    <tr key={row.student} className="border-t border-black/5 dark:border-white/10">
                      <td className="px-3 py-2.5">{row.student}</td>
                      <td className="px-2 py-2.5 tabular-nums">{row.a}</td>
                      <td className="px-2 py-2.5 tabular-nums">{row.b}</td>
                      <td className="px-2 py-2.5 tabular-nums">{row.c}</td>
                      <td className="px-2 py-2.5 tabular-nums">{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
