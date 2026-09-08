"use client";

import { Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function ParentReportsPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Report cards</h1>
        <p className="mt-1 text-sm text-muted-foreground">Download published term reports.</p>
      </div>
      {["Aria Patel — Term 2 Progress", "Leo Kim — Learning Journey"].map((r) => (
        <Card key={r}>
          <CardHeader>
            <div>
              <CardTitle>{r}</CardTitle>
              <CardDescription>Published · PDF ready</CardDescription>
            </div>
            <Button variant="secondary">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Criterion summaries and teacher comments for the current reporting cycle.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
