"use client";

import { useState } from "react";
import { Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const SEED = [
  {
    name: "Robotics Club",
    when: "Mon & Wed · 15:30–17:00",
    where: "STEM Lab",
    seats: "6 spots left",
    enrolled: true,
  },
  {
    name: "Chamber Choir",
    when: "Tue · 16:00–17:30",
    where: "Music Room 2",
    seats: "Waitlist",
    enrolled: false,
  },
  {
    name: "Football Academy",
    when: "Thu · 15:45–17:15",
    where: "Pitch A",
    seats: "Open",
    enrolled: true,
  },
  {
    name: "Debate Society",
    when: "Fri · 15:30–16:45",
    where: "Room 214",
    seats: "3 spots left",
    enrolled: false,
  },
  {
    name: "Art Studio Open Hours",
    when: "Lunch · Daily",
    where: "Art Wing",
    seats: "Drop-in",
    enrolled: false,
  },
  {
    name: "Model United Nations",
    when: "Sat · 09:00–12:00",
    where: "Hall",
    seats: "Open",
    enrolled: false,
  },
];

export function EcaHub() {
  const role = useAppStore((s) => s.role);
  const pushNotification = useAppStore((s) => s.pushNotification);
  const canManage = role === "admin" || role === "staff";
  const [ecas, setEcas] = useState(SEED);

  function toggle(name: string) {
    setEcas((prev) =>
      prev.map((eca) => {
        if (eca.name !== name) return eca;
        const enrolled = !eca.enrolled;
        pushNotification({
          title: enrolled ? `Joined ${eca.name}` : `Left ${eca.name}`,
          body: enrolled
            ? "You’re on the ECA roster for this term."
            : "Enrollment removed. You can rejoin anytime.",
          kind: enrolled ? "success" : "info",
        });
        return {
          ...eca,
          enrolled,
          seats: enrolled ? "Enrolled" : eca.seats === "Enrolled" ? "Open" : eca.seats,
        };
      })
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">ECAs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Clubs, sports, and enrichment — enroll or manage sessions.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {ecas.map((eca) => (
          <Card key={eca.name}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle>{eca.name}</CardTitle>
                  <CardDescription className="mt-1 space-y-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {eca.when}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {eca.where}
                    </span>
                  </CardDescription>
                </div>
                <Badge
                  className={
                    eca.enrolled
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {eca.seats}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                className="rounded-full"
                variant={eca.enrolled && !canManage ? "outline" : "default"}
                onClick={() => {
                  if (canManage) {
                    pushNotification({
                      title: "Session updated",
                      body: `${eca.name} details saved for this term.`,
                      kind: "success",
                    });
                    return;
                  }
                  toggle(eca.name);
                }}
              >
                {canManage ? "Save session" : eca.enrolled ? "Leave" : "Join"}
              </Button>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                Harbor International
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
