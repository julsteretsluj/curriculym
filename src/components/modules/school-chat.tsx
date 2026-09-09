"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

type Channel = {
  id: string;
  name: string;
  audience: string;
  unread: number;
  preview: string;
};

type ChatMessage = {
  id: string;
  body: string;
  createdAt: string;
  from: string;
  senderId: string;
  mine: boolean;
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  if (sameDay) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function SchoolChat({
  title = "Chat",
  description = "Class, club, and school channels",
  audienceFilter,
}: {
  title?: string;
  description?: string;
  audienceFilter?: string[];
}) {
  const pushNotification = useAppStore((s) => s.pushNotification);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChannels = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/chat/channels");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Failed to load channels (${res.status})`);
    }
    const data = (await res.json()) as { channels: Channel[] };
    const filtered = audienceFilter
      ? data.channels.filter((c) => audienceFilter.includes(c.audience))
      : data.channels;
    setChannels(filtered);
    setActiveId((prev) => {
      if (prev && filtered.some((c) => c.id === prev)) return prev;
      return filtered[0]?.id ?? "";
    });
    return filtered;
  }, [audienceFilter]);

  const loadMessages = useCallback(async (channelId: string) => {
    if (!channelId) {
      setMessages([]);
      return;
    }
    const res = await fetch(`/api/chat/messages?channelId=${encodeURIComponent(channelId)}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Failed to load messages (${res.status})`);
    }
    const data = (await res.json()) as { messages: ChatMessage[] };
    setMessages(data.messages);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const list = await loadChannels();
        if (cancelled) return;
        const first = list[0]?.id;
        if (first) await loadMessages(first);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load chat");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadChannels, loadMessages]);

  useEffect(() => {
    if (!activeId || loading) return;
    let cancelled = false;
    (async () => {
      try {
        await loadMessages(activeId);
        if (!cancelled) {
          setChannels((prev) =>
            prev.map((c) => (c.id === activeId ? { ...c, unread: 0 } : c))
          );
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load messages");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps -- reload when channel changes

  // Light polling so other tabs/users appear without a full refresh
  useEffect(() => {
    if (!activeId) return;
    const id = window.setInterval(() => {
      void loadMessages(activeId).catch(() => undefined);
      void loadChannels().catch(() => undefined);
    }, 4000);
    return () => window.clearInterval(id);
  }, [activeId, loadChannels, loadMessages]);

  const current = channels.find((t) => t.id === activeId) ?? channels[0];

  async function send() {
    if (!draft.trim() || !current || sending) return;
    const body = draft.trim();
    setSending(true);
    setDraft("");
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId: current.id, body }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Send failed");
      }
      const data = (await res.json()) as { message: ChatMessage };
      setMessages((prev) => [...prev, data.message]);
      setChannels((prev) =>
        prev.map((c) =>
          c.id === current.id ? { ...c, preview: body, unread: 0 } : c
        )
      );
      pushNotification({
        title: `Message sent · ${current.name}`,
        body,
        kind: "info",
      });
    } catch (e) {
      setDraft(body);
      setError(e instanceof Error ? e.message : "Send failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <p className="mt-1 text-xs text-red-600/80">
            Make sure Postgres is running and you are signed in.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>
              {loading ? "Loading…" : `${channels.length} conversations`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {channels.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveId(t.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                  current?.id === t.id
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
            {!loading && channels.length === 0 ? (
              <p className="text-sm text-muted-foreground">No channels for this view.</p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{current?.name ?? "Channel"}</CardTitle>
            <CardDescription>Saved to your school database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-2xl bg-muted/40 p-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    m.mine ? "ml-8 bg-primary/15" : "mr-8 bg-white dark:bg-[#2C2C2E]"
                  }`}
                >
                  <div className="mb-0.5 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span className="font-medium">{m.mine ? "You" : m.from}</span>
                    <span>{formatTime(m.createdAt)}</span>
                  </div>
                  <p>{m.body}</p>
                </div>
              ))}
              {!loading && current && messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet — say hello.</p>
              ) : null}
            </div>
            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void send()}
                placeholder="Write a message…"
                disabled={!current || sending}
                className="h-10 flex-1 rounded-full border border-black/10 bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 dark:border-white/10"
              />
              <Button
                className="rounded-full"
                onClick={() => void send()}
                disabled={!current || sending || !draft.trim()}
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
