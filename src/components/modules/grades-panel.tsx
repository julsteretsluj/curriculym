"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_STUDENTS } from "@/lib/school-population";

function score(seed: string, max = 8) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return 4 + (h % (max - 3));
}

export function GradesPanel({
  title = "Grades",
  description = "Criterion scores and current overall",
}: {
  title?: string;
  description?: string;
}) {
  const classmates = DEMO_STUDENTS.filter((s) => s.formGroup === "G8A").slice(0, 8);
  const focus = classmates.find((s) => s.name === "Aria Patel") ?? classmates[0]!;
  const subjects = [
    "MYP Sciences",
    "Mathematics",
    "English Language & Literature",
    "Individuals & Societies",
  ];

  const rows = subjects.map((subject) => {
    const a = score(`${focus.id}-${subject}-a`);
    const b = score(`${focus.id}-${subject}-b`);
    const c = score(`${focus.id}-${subject}-c`);
    const d = score(`${focus.id}-${subject}-d`);
    const overall = Math.round((a + b + c + d) / 4);
    return { subject, a, b, c, d, overall: String(overall) };
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current term · {focus.name}</CardTitle>
          <CardDescription>
            IB MYP criteria A–D · {focus.formGroup} · House {focus.house}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {rows.map((row) => (
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
