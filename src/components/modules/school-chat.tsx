"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const CHANNELS = [
  {
    name: "Homeroom 8A",
    preview: "Reminder: bring PE kit tomorrow",
    unread: 2,
    audience: "Class",
    messages: [
      { from: "Ms. Chen", body: "Reminder: bring PE kit tomorrow.", time: "08:12" },
      { from: "Aria", body: "Thanks — noted!", time: "08:18" },
    ],
  },
  {
    name: "Sciences",
    preview: "Lab safety form due Friday",
    unread: 1,
    audience: "Subject",
    messages: [
      { from: "Mr. Okonkwo", body: "Lab safety form due Friday.", time: "Yesterday" },
      { from: "Noah", body: "Submitted mine this morning.", time: "09:02" },
    ],
  },
  {
    name: "Robotics Club",
    preview: "Practice starts at 15:30",
    unread: 2,
    audience: "ECA",
    messages: [
      { from: "Coach Park", body: "Practice starts at 15:30 in STEM Lab.", time: "11:40" },
    ],
  },
  {
    name: "Year 8 Parents",
    preview: "Sports day volunteering form",
    unread: 0,
    audience: "Family",
    messages: [
      { from: "Office", body: "Sports day volunteering form is open.", time: "Mon" },
    ],
  },
  {
    name: "Staff lounge",
    preview: "Cover needed P4 Science",
    unread: 3,
    audience: "Staff",
    messages: [
      { from: "Cover desk", body: "Cover needed P4 Science — any volunteers?", time: "07:55" },
    ],
  },
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
  const [active, setActive] = useState(threads[0]?.name ?? "");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(
    Object.fromEntries(CHANNELS.map((c) => [c.name, c.messages]))
  );
  const pushNotification = useAppStore((s) => s.pushNotification);
  const current = threads.find((t) => t.name === active) ?? threads[0];

  function send() {
    if (!draft.trim() || !current) return;
    const body = draft.trim();
    setMessages((prev) => ({
      ...prev,
      [current.name]: [
        ...(prev[current.name] ?? []),
        { from: "You", body, time: "Now" },
      ],
    }));
    setDraft("");
    pushNotification({
      title: `Message sent · ${current.name}`,
      body,
      kind: "info",
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>{threads.length} conversations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {threads.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(t.name)}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                  current?.name === t.name
                    ? "border-primary/30 bg-primary/10"
                    : "border-black/5 bg-muted/30 dark:border-white/10"
                }`}
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
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{current?.name ?? "Channel"}</CardTitle>
            <CardDescription>Live school messaging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-2xl bg-muted/40 p-3">
              {(messages[current?.name ?? ""] ?? []).map((m, i) => (
                <div
                  key={`${m.from}-${i}`}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    m.from === "You" ? "ml-8 bg-primary/15" : "mr-8 bg-white dark:bg-[#2C2C2E]"
                  }`}
                >
                  <div className="mb-0.5 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span className="font-medium">{m.from}</span>
                    <span>{m.time}</span>
                  </div>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Write a message…"
                className="h-10 flex-1 rounded-full border border-black/10 bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
              />
              <Button className="rounded-full" onClick={send}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
