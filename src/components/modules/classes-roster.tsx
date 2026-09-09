"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_STUDENTS, DEMO_TEACHERS } from "@/lib/school-population";

const CLASS_DEFS = [
  { name: "MYP Sciences 8A", department: "Sciences", form: "G8A", next: "Today · P3 · Lab B", status: "Live" },
  { name: "Mathematics 8A", department: "Mathematics", form: "G8A", next: "Today · P5 · Room 204", status: "Today" },
  { name: "English L&L 8A", department: "English", form: "G8A", next: "Tomorrow · P2 · Room 118", status: "Upcoming" },
  { name: "Individuals & Societies", department: "Individuals & Societies", form: "G8B", next: "Wed · P4 · Room 212", status: "Upcoming" },
] as const;

export function ClassesRoster({
  title = "Classes",
  description = "Your teaching groups and next sessions",
}: {
  title?: string;
  description?: string;
}) {
  const classes = CLASS_DEFS.map((c) => {
    const teacher =
      DEMO_TEACHERS.find((t) => t.department === c.department) ?? DEMO_TEACHERS[0]!;
    const size = DEMO_STUDENTS.filter((s) => s.formGroup === c.form).length;
    return { ...c, teacher: teacher.name, size };
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {classes.map((c) => (
          <Card key={c.name}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle>{c.name}</CardTitle>
                  <CardDescription>
                    {c.teacher} · {c.size} students
                  </CardDescription>
                </div>
                <Badge className="bg-muted text-muted-foreground">{c.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{c.next}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
