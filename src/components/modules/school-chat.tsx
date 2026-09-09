"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CHANNELS = [
  { name: "Homeroom 8A", preview: "Reminder: bring PE kit tomorrow", unread: 2, audience: "Class" },
  { name: "Sciences", preview: "Lab safety form due Friday", unread: 1, audience: "Subject" },
  { name: "Robotics Club", preview: "Practice starts at 15:30", unread: 2, audience: "ECA" },
  { name: "Year 8 Parents", preview: "Sports day volunteering form", unread: 0, audience: "Family" },
  { name: "Staff lounge", preview: "Cover needed P4 Science", unread: 3, audience: "Staff" },
];

export function SchoolChat({
  title = "Chat",
  description = "Class, club, and school channels",
  audienceFilter,
}: {
  title?: string;
  description?: string;
  audienceFilter?: string[];
}) {
  const threads = audienceFilter
    ? CHANNELS.filter((c) => audienceFilter.includes(c.audience))
    : CHANNELS;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Channels</CardTitle>
          <CardDescription>{threads.length} conversations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {threads.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 dark:border-white/10"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <Badge className="bg-muted text-muted-foreground text-[10px]">
                    {t.audience}
                  </Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">{t.preview}</p>
              </div>
              {t.unread > 0 ? (
                <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                  {t.unread}
                </span>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
