"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const NOTES = [
  { student: "Aria Patel", type: "Allergy", detail: "Peanuts — EpiPen with nurse", severity: "High" },
  { student: "Noah Berg", type: "Pastoral", detail: "Check-in after friendship conflict", severity: "Medium" },
  { student: "Mia Santos", type: "Medical", detail: "Asthma inhaler · sports days", severity: "Medium" },
  { student: "Leo Kim", type: "Wellbeing", detail: "Settling well in Early Years", severity: "Low" },
];

const MERITS = [
  { student: "Aria Patel", points: 12, reason: "Science collaboration" },
  { student: "Kai Nakamura", points: 8, reason: "House spirit" },
  { student: "Sofia Costa", points: -2, reason: "Late to Period 3" },
];

export function PastoralMedical() {
  const pushNotification = useAppStore((s) => s.pushNotification);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pastoral & medical</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Wellbeing notes, medical flags, and behaviour points — iSAMS pastoral desk.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Care flags</CardTitle>
            <CardDescription>Visible to authorized staff only</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {NOTES.map((n) => (
              <div
                key={`${n.student}-${n.type}`}
                className="rounded-xl border border-black/5 bg-muted/30 px-3 py-3 dark:border-white/10"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{n.student}</p>
                  <Badge className="bg-muted text-muted-foreground">{n.severity}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {n.type} · {n.detail}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Behaviour & merits</CardTitle>
                <CardDescription>House points this week</CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() =>
                  pushNotification({
                    title: "Merit awarded",
                    body: "House point recorded for Coral.",
                    kind: "success",
                  })
                }
              >
                Award merit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {MERITS.map((m) => (
              <div
                key={m.student + m.reason}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium">{m.student}</p>
                  <p className="text-xs text-muted-foreground">{m.reason}</p>
                </div>
                <span className={`font-semibold ${m.points < 0 ? "text-destructive" : "text-primary"}`}>
                  {m.points > 0 ? `+${m.points}` : m.points}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
