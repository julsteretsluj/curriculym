"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CLASSES = [
  { name: "MYP Sciences 8A", teacher: "James Okonkwo", next: "Today · P3 · Lab B", status: "Live" },
  { name: "Mathematics 8A", teacher: "Priya Shah", next: "Today · P5 · Room 204", status: "Today" },
  { name: "English L&L 8A", teacher: "Hannah Lee", next: "Tomorrow · P2 · Room 118", status: "Upcoming" },
  { name: "Individuals & Societies", teacher: "Marco Rossi", next: "Wed · P4 · Room 212", status: "Upcoming" },
];

export function ClassesRoster({
  title = "Classes",
  description = "Your teaching groups and next sessions",
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
      <div className="grid gap-3 md:grid-cols-2">
        {CLASSES.map((c) => (
          <Card key={c.name}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle>{c.name}</CardTitle>
                  <CardDescription>{c.teacher}</CardDescription>
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
