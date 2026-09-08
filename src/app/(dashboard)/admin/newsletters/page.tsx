"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function AdminNewslettersPage() {
  const setRole = useAppStore((s) => s.setRole);
  const push = useAppStore((s) => s.pushNotification);
  useEffect(() => setRole("admin"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Newsletters</h1>
        <p className="mt-1 text-sm text-muted-foreground">Global family communications.</p>
      </div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>March community letter</CardTitle>
            <CardDescription>Draft · scheduled for Friday 16:00</CardDescription>
          </div>
          <Button
            onClick={() =>
              push({
                title: "Newsletter queued",
                body: "March letter will send to all guardians.",
                kind: "success",
              })
            }
          >
            Publish
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This week&apos;s highlights include the DP CAS showcase, early years reading week,
            and updated parent evening booking windows for secondary.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
