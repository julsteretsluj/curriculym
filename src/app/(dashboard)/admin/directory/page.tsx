"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

const PEOPLE = [
  { name: "Maya Chen", role: "Head of School", dept: "Leadership" },
  { name: "James Okonkwo", role: "Teacher", dept: "Sciences" },
  { name: "Elena Vargas", role: "CPO", dept: "Student Support" },
  { name: "Priya Nair", role: "Coordinator", dept: "IB DP" },
];

export default function AdminDirectoryPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Directory</h1>
        <p className="mt-1 text-sm text-muted-foreground">Staff profiles and role access overview.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PEOPLE.map((p) => (
          <Card key={p.name}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>
                    {p.role} · {p.dept}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-[11px]">
                <span className="rounded-full bg-muted px-2 py-1">Timetable</span>
                <span className="rounded-full bg-muted px-2 py-1">Rooms</span>
                {p.role === "CPO" && (
                  <span className="rounded-full bg-destructive/10 px-2 py-1 text-destructive">
                    Safeguarding
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
