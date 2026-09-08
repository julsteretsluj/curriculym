"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

const THREADS = [
  { name: "Homeroom 8A", preview: "Reminder: bring PE kit tomorrow", unread: 2 },
  { name: "Sciences", preview: "Lab safety form due Friday", unread: 1 },
  { name: "Robotics Club", preview: "Practice starts at 15:30", unread: 2 },
];

export default function StudentChatPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Class and club channels</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {THREADS.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 dark:border-white/10"
            >
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.preview}</p>
              </div>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                {t.unread}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
