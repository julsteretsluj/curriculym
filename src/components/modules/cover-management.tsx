"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const GAPS = [
  { period: "P2", subject: "Mathematics G8A", teacher: "Priya Shah", reason: "PD day", cover: "Open" },
  { period: "P3", subject: "Sciences G9B", teacher: "James Okonkwo", reason: "Illness", cover: "Assigned · Costa" },
  { period: "P5", subject: "English G7C", teacher: "Hannah Lee", reason: "Trip", cover: "Open" },
];

export function CoverManagement() {
  const pushNotification = useAppStore((s) => s.pushNotification);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cover & absence</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Staff absence and cover assignment — iSAMS Cover Manager.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today&apos;s gaps</CardTitle>
              <CardDescription>3 periods need cover</CardDescription>
            </div>
            <Button
              onClick={() =>
                pushNotification({
                  title: "Cover broadcast",
                  body: "Open periods posted to staff lounge chat.",
                  kind: "info",
                })
              }
            >
              Broadcast openings
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {GAPS.map((g) => (
            <div
              key={g.period + g.subject}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
            >
              <div>
                <p className="font-medium">
                  {g.period} · {g.subject}
                </p>
                <p className="text-xs text-muted-foreground">
                  {g.teacher} · {g.reason}
                </p>
              </div>
              <Badge
                className={
                  g.cover.startsWith("Open")
                    ? "bg-traffic-yellow/25 text-foreground"
                    : "bg-primary/15 text-primary"
                }
              >
                {g.cover}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
