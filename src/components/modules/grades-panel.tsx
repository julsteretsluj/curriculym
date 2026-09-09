"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ROWS = [
  { subject: "MYP Sciences", a: 7, b: 6, c: 7, d: 6, overall: "6" },
  { subject: "Mathematics", a: 6, b: 7, c: 6, d: 6, overall: "6" },
  { subject: "English Language & Literature", a: 5, b: 6, c: 6, d: 5, overall: "6" },
  { subject: "Individuals & Societies", a: 6, b: 6, c: 5, d: 6, overall: "6" },
];

export function GradesPanel({
  title = "Grades",
  description = "Criterion scores and current overall",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current term</CardTitle>
          <CardDescription>IB MYP criteria A–D · Harbor International</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {ROWS.map((row) => (
            <div
              key={row.subject}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
            >
              <p className="font-medium">{row.subject}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>A {row.a}</span>
                <span>B {row.b}</span>
                <span>C {row.c}</span>
                <span>D {row.d}</span>
                <Badge>Overall {row.overall}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
