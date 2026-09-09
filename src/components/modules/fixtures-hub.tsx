"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const FIXTURES = [
  {
    sport: "Football · U15 Boys",
    vs: "Greenfield IS",
    when: "Sat 09:00",
    where: "Pitch A",
    status: "Confirmed",
  },
  {
    sport: "Swimming · Mixed",
    vs: "City Aquatics",
    when: "Sat 11:30",
    where: "Harbor Pool",
    status: "Travel",
  },
  {
    sport: "Basketball · U17 Girls",
    vs: "Riverside Academy",
    when: "Wed 16:00",
    where: "Away",
    status: "TBC",
  },
  {
    sport: "Debate · Senior",
    vs: "Regional finals",
    when: "Fri 13:00",
    where: "Hall",
    status: "Confirmed",
  },
];

const SQUADS = [
  { name: "Aria Patel", role: "Midfield", kit: "7" },
  { name: "Noah Berg", role: "Defence", kit: "4" },
  { name: "Kai Nakamura", role: "Forward", kit: "9" },
  { name: "Mateo Silva", role: "GK", kit: "1" },
];

export function FixturesHub() {
  const [tab, setTab] = useState<"fixtures" | "squads" | "clubs">("fixtures");
  const pushNotification = useAppStore((s) => s.pushNotification);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sport & activities</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fixtures, squads, and club registers for sport and activities.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["fixtures", "Fixtures"],
            ["squads", "Team sheets"],
            ["clubs", "Club registers"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              tab === id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "fixtures" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>This week</CardTitle>
                <CardDescription>Parents notified 48h before kick-off</CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() =>
                  pushNotification({
                    title: "Fixture published",
                    body: "U15 Football vs Greenfield confirmed.",
                    kind: "success",
                  })
                }
              >
                Publish fixture
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {FIXTURES.map((f) => (
              <div
                key={f.sport + f.when}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium">{f.sport}</p>
                  <p className="text-xs text-muted-foreground">
                    vs {f.vs} · {f.when} · {f.where}
                  </p>
                </div>
                <Badge className="bg-muted text-muted-foreground">{f.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "squads" && (
        <Card>
          <CardHeader>
            <CardTitle>U15 Boys football</CardTitle>
            <CardDescription>Team sheet for Saturday</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {SQUADS.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.role}</p>
                </div>
                <Badge className="bg-primary/15 text-primary">#{s.kit}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "clubs" && (
        <Card>
          <CardHeader>
            <CardTitle>Club attendance</CardTitle>
            <CardDescription>Synced with ECA enrollments</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Registers pull from the ECA hub. Coaches can mark present/absent the same way as
            academic attendance.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
