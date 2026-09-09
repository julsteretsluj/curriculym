"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const REPORTS = [
  { student: "Aria Patel", term: "Term 1", curriculum: "MYP", status: "Published" },
  { student: "Noah Berg", term: "Term 1", curriculum: "MYP", status: "In review" },
  { student: "Leo Kim", term: "Term 1", curriculum: "Early Years", status: "Draft" },
];

export function ReportCards() {
  const role = useAppStore((s) => s.role);
  const pushNotification = useAppStore((s) => s.pushNotification);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Report cards</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Criterion comments and downloadable PDF report packs.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Term 1 cycle</CardTitle>
              <CardDescription>Publish windows open Friday 16:00</CardDescription>
            </div>
            <Button
              onClick={() =>
                pushNotification({
                  title: role === "parent" ? "Report downloaded" : "Reports published",
                  body:
                    role === "parent"
                      ? "Term 1 PDF saved to your downloads."
                      : "Families notified for published reports.",
                  kind: "success",
                })
              }
            >
              {role === "parent" ? "Download PDF" : "Publish batch"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {REPORTS.map((r) => (
            <div
              key={r.student}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
            >
              <div>
                <p className="font-medium">{r.student}</p>
                <p className="text-xs text-muted-foreground">
                  {r.term} · {r.curriculum}
                </p>
              </div>
              <Badge className="bg-muted text-muted-foreground">{r.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
