"use client";

import { useState } from "react";
import { AlertTriangle, Lock, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";

type Log = {
  id: string;
  student: string;
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: string;
  when: string;
};

const INITIAL: Log[] = [
  {
    id: "sg1",
    student: "Student #4821",
    title: "Welfare concern — attendance pattern",
    severity: "HIGH",
    status: "Under review",
    when: "Today 09:14",
  },
  {
    id: "sg2",
    student: "Student #3902",
    title: "Peer conflict follow-up",
    severity: "MEDIUM",
    status: "Open",
    when: "Yesterday",
  },
];

const severityClass = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-traffic-yellow/20 text-foreground",
  HIGH: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  URGENT: "bg-destructive/15 text-destructive",
};

export function SafeguardingDesk() {
  const [logs, setLogs] = useState(INITIAL);
  const [title, setTitle] = useState("");
  const [studentRef, setStudentRef] = useState("");
  const [severity, setSeverity] = useState<Log["severity"]>("MEDIUM");
  const pushNotification = useAppStore((s) => s.pushNotification);
  const role = useAppStore((s) => s.role);

  const authorized = role === "admin" || role === "support";

  if (!authorized) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-destructive" />
            <div>
              <CardTitle>Restricted module</CardTitle>
              <CardDescription>
                Safeguarding logs are isolated to CPO / leadership roles.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !studentRef.trim()) return;
    const entry: Log = {
      id: `sg-${Date.now()}`,
      student: studentRef,
      title,
      severity,
      status: "Open",
      when: "Just now",
    };
    setLogs((prev) => [entry, ...prev]);
    setTitle("");
    setStudentRef("");
    if (severity === "URGENT" || severity === "HIGH") {
      pushNotification({
        title: "Urgent safeguarding alert",
        body: `${severity}: ${entry.title}`,
        kind: "safeguarding",
      });
    } else {
      pushNotification({
        title: "Safeguarding log saved",
        body: "Encrypted entry stored for CPO review.",
        kind: "info",
      });
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-destructive/10 p-3">
          <ShieldAlert className="h-5 w-5 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Safeguarding desk</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Encrypted, tenant-scoped incident logs. Never exposed to students, parents, or standard teachers.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>New confidential log</CardTitle>
              <CardDescription>Body is stored encrypted at rest (bodyEnc).</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={submit}>
              <label className="block text-xs font-medium text-muted-foreground">
                Student reference
                <input
                  value={studentRef}
                  onChange={(e) => setStudentRef(e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
                  placeholder="Student #… or internal ID"
                />
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                Summary title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
                  placeholder="Brief factual title"
                />
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                Severity
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as Log["severity"])}
                  className="mt-1 h-9 w-full rounded-xl border border-black/10 bg-background px-3 text-sm outline-none dark:border-white/10"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                Encrypted notes
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
                  placeholder="Factual account only…"
                />
              </label>
              <Button type="submit" className="w-full">
                Save encrypted log
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>Open caseload</CardTitle>
              <CardDescription>Visible only within authorized RBAC roles.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl border border-black/5 bg-card/80 p-4 dark:border-white/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold">{log.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {log.student} · {log.when} · {log.status}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      severityClass[log.severity]
                    )}
                  >
                    {(log.severity === "HIGH" || log.severity === "URGENT") && (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {log.severity}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
