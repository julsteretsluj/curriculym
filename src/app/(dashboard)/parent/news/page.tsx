"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function ParentNewsPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">School news</h1>
        <p className="mt-1 text-sm text-muted-foreground">Daily updates and newsletters.</p>
      </div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Sports day rehearsal</CardTitle>
            <CardDescription>Today · 14:00 · Field</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Secondary students should wear house colours. Early years parade begins at 13:30.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
