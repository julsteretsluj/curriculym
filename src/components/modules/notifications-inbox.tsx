"use client";

import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

export function NotificationsInbox() {
  const notifications = useAppStore((s) => s.notifications);
  const dismiss = useAppStore((s) => s.dismissNotification);
  const clear = useAppStore((s) => s.clearNotifications);
  const setOpen = useAppStore((s) => s.setNotificationOpen);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Alerts for meetings, rooms, homework, and safeguarding.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            Open center
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={clear}>
            Clear all
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Inbox
          </CardTitle>
          <CardDescription>{notifications.length} items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {notifications.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">You&apos;re all caught up.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-black/5 bg-muted/30 px-3 py-3 dark:border-white/10"
              >
                <div>
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {formatDistanceToNow(n.createdAt, { addSuffix: true })} · {n.kind}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 rounded-full"
                  onClick={() => dismiss(n.id)}
                >
                  Dismiss
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
