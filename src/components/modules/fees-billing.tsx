"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const INVOICES = [
  { family: "Rivera", student: "Aria Patel", item: "Term 1 tuition", amount: "$8,450", status: "Paid" },
  { family: "Berg", student: "Noah Berg", item: "Term 1 tuition", amount: "$8,450", status: "Due" },
  { family: "Santos", student: "Mia Santos", item: "Bus · Zone B", amount: "$620", status: "Overdue" },
  { family: "Kim", student: "Leo Kim", item: "ECA · Football", amount: "$180", status: "Paid" },
  { family: "Chen", student: "Mei Chen", item: "Trip · Chiang Mai", amount: "$340", status: "Due" },
];

export function FeesBilling() {
  const pushNotification = useAppStore((s) => s.pushNotification);
  const role = useAppStore((s) => s.role);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Fees & billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tuition, transport, trips, and ECA charges — iSAMS Fees replacement.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Collected this term", value: "$2.4M" },
          { label: "Outstanding", value: "$186k" },
          { label: "Overdue families", value: "23" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ledger</CardTitle>
              <CardDescription>Family statements and reminders</CardDescription>
            </div>
            {role !== "parent" && (
              <Button
                onClick={() =>
                  pushNotification({
                    title: "Payment reminders sent",
                    body: "14 families notified for overdue balances.",
                    kind: "info",
                  })
                }
              >
                Send reminders
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {INVOICES.map((inv) => (
            <div
              key={`${inv.family}-${inv.item}`}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
            >
              <div>
                <p className="font-medium">
                  {inv.family} · {inv.student}
                </p>
                <p className="text-xs text-muted-foreground">{inv.item}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{inv.amount}</span>
                <Badge
                  className={
                    inv.status === "Paid"
                      ? "bg-primary/15 text-primary"
                      : inv.status === "Overdue"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground"
                  }
                >
                  {inv.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
