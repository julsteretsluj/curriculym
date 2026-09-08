"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

const STUDENTS = [
  { name: "Aria Patel", grade: "G8", house: "Coral" },
  { name: "Noah Berg", grade: "G9", house: "Jade" },
  { name: "Mia Santos", grade: "G7", house: "Azure" },
];

export default function SupportDirectoryPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("support"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Student directory</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Support staff access for pastoral follow-up.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STUDENTS.map((s) => (
          <Card key={s.name}>
            <CardHeader>
              <div>
                <CardTitle>{s.name}</CardTitle>
                <CardDescription>
                  {s.grade} · House {s.house}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Form tutor linked · safeguarding flags hidden unless authorized.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
