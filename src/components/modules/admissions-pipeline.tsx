"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const PIPELINE = [
  { stage: "Enquiry", count: 42, color: "bg-muted text-muted-foreground" },
  { stage: "Application", count: 28, color: "bg-primary/15 text-primary" },
  { stage: "Assessment", count: 16, color: "bg-traffic-yellow/25 text-foreground" },
  { stage: "Offer", count: 11, color: "bg-primary/20 text-primary" },
  { stage: "Accepted", count: 9, color: "bg-[#27C93F]/20 text-foreground" },
];

const APPS = [
  { name: "Hana Sato", grade: "G7", status: "Assessment", date: "12 Sep" },
  { name: "Omar Hassan", grade: "G9", status: "Offer", date: "10 Sep" },
  { name: "Lina Berg", grade: "EY2", status: "Application", date: "9 Sep" },
  { name: "Mateo Silva", grade: "G11", status: "Enquiry", date: "8 Sep" },
  { name: "Aisha Khan", grade: "G4", status: "Accepted", date: "7 Sep" },
];

export function AdmissionsPipeline() {
  const pushNotification = useAppStore((s) => s.pushNotification);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enquiry-to-enrolment pipeline — iSAMS Admissions replacement.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-5">
        {PIPELINE.map((p) => (
          <Card key={p.stage}>
            <CardContent className="p-4">
              <Badge className={p.color}>{p.stage}</Badge>
              <p className="mt-3 text-2xl font-semibold">{p.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>Active applications</CardTitle>
              <CardDescription>Next actions for the admissions office</CardDescription>
            </div>
            <Button
              onClick={() =>
                pushNotification({
                  title: "Offer letters queued",
                  body: "3 digital offers ready for parent signature.",
                  kind: "success",
                })
              }
            >
              Send offers
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {APPS.map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
            >
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-xs text-muted-foreground">
                  {a.grade} · Updated {a.date}
                </p>
              </div>
              <Badge className="bg-muted text-muted-foreground">{a.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
