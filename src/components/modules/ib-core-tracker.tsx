"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const CAS = [
  { title: "Beach clean-up", strand: "Service", hours: 6, status: "Approved" },
  { title: "Varsity football", strand: "Activity", hours: 24, status: "In progress" },
  { title: "Jazz ensemble", strand: "Creativity", hours: 18, status: "In progress" },
];

const EE = {
  subject: "History",
  research: "Trade routes and port cities in 17th-century SE Asia",
  supervisor: "Ms. Chen",
  stage: "First draft",
};

const TOK = [
  { title: "Exhibition object 1", status: "Submitted" },
  { title: "Essay draft", status: "Feedback" },
  { title: "Presentation rehearsal", status: "Scheduled" },
];

export function IbCoreTracker() {
  const [tab, setTab] = useState<"CAS" | "EE" | "TOK">("CAS");
  const pushNotification = useAppStore((s) => s.pushNotification);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">IB Core</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          CAS · EE · TOK — ManageBac core programme replacement.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["CAS", "EE", "TOK"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "CAS" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>CAS experiences</CardTitle>
                <CardDescription>48 hours logged · reflections due Friday</CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() =>
                  pushNotification({
                    title: "CAS reflection saved",
                    body: "Advisor notified for review.",
                    kind: "success",
                  })
                }
              >
                Add reflection
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {CAS.map((c) => (
              <div
                key={c.title}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.strand} · {c.hours}h
                  </p>
                </div>
                <Badge className="bg-muted text-muted-foreground">{c.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "EE" && (
        <Card>
          <CardHeader>
            <CardTitle>Extended Essay</CardTitle>
            <CardDescription>
              {EE.subject} · Supervisor {EE.supervisor}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">{EE.research}</p>
            <Badge className="bg-primary/15 text-primary">{EE.stage}</Badge>
            <div>
              <Button
                onClick={() =>
                  pushNotification({
                    title: "EE draft uploaded",
                    body: "Supervisor feedback window opens for 7 days.",
                    kind: "success",
                  })
                }
              >
                Upload draft
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "TOK" && (
        <Card>
          <CardHeader>
            <CardTitle>Theory of Knowledge</CardTitle>
            <CardDescription>Exhibition and essay milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {TOK.map((t) => (
              <div
                key={t.title}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <p className="font-medium">{t.title}</p>
                <Badge className="bg-muted text-muted-foreground">{t.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
