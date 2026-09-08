"use client";

import { Fragment, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

const ROOMS = ["Auditorium", "Science Lab B", "Library", "Music Studio", "Counseling 2"];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

type Booking = { room: string; hour: number; title: string; by: string };

const SEED: Booking[] = [
  { room: "Auditorium", hour: 10, title: "Assembly rehearsal", by: "Arts" },
  { room: "Science Lab B", hour: 9, title: "MYP Sciences", by: "Okonkwo" },
  { room: "Science Lab B", hour: 14, title: "Conflict!", by: "Double" },
  { room: "Library", hour: 11, title: "DP EE clinic", by: "Library" },
  { room: "Music Studio", hour: 13, title: "Band practice", by: "Music" },
  { room: "Counseling 2", hour: 15, title: "Quiet room", by: "CPO" },
];

export function RoomBookingTimeline() {
  const [bookings, setBookings] = useState(SEED);
  const [room, setRoom] = useState(ROOMS[0]);
  const [hour, setHour] = useState(12);
  const [title, setTitle] = useState("");
  const pushNotification = useAppStore((s) => s.pushNotification);

  const map = useMemo(() => {
    const m = new Map<string, Booking>();
    bookings.forEach((b) => m.set(`${b.room}-${b.hour}`, b));
    return m;
  }, [bookings]);

  function reserve() {
    if (!title.trim()) return;
    const key = `${room}-${hour}`;
    if (map.has(key)) {
      pushNotification({
        title: "Room unavailable",
        body: `${room} is already reserved at ${hour}:00.`,
        kind: "warning",
      });
      return;
    }
    setBookings((prev) => [
      ...prev,
      { room, hour, title, by: "You" },
    ]);
    setTitle("");
    pushNotification({
      title: "Room reserved",
      body: `${room} booked for ${hour}:00.`,
      kind: "success",
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Room & resource booking</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visual timeline for school spaces — Gantt-style day view.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Today&apos;s timeline</CardTitle>
            <CardDescription>Hover cells to inspect · conflicts highlight in amber.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div
              className="grid gap-px rounded-2xl border border-black/5 bg-black/5 p-px dark:border-white/10 dark:bg-white/10"
              style={{ gridTemplateColumns: `140px repeat(${HOURS.length}, minmax(64px, 1fr))` }}
            >
              <div className="rounded-tl-[15px] bg-muted/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Room
              </div>
              {HOURS.map((h, i) => (
                <div
                  key={h}
                  className={cn(
                    "bg-muted/80 px-2 py-2 text-center text-[11px] font-medium text-muted-foreground",
                    i === HOURS.length - 1 && "rounded-tr-[15px]"
                  )}
                >
                  {h}:00
                </div>
              ))}

              {ROOMS.map((r, ri) => (
                <Fragment key={r}>
                  <div
                    className={cn(
                      "bg-card px-3 py-3 text-[13px] font-medium",
                      ri === ROOMS.length - 1 && "rounded-bl-[15px]"
                    )}
                  >
                    {r}
                  </div>
                  {HOURS.map((h, hi) => {
                    const b = map.get(`${r}-${h}`);
                    const conflict = b?.by === "Double";
                    return (
                      <div
                        key={`${r}-${h}`}
                        className={cn(
                          "min-h-[56px] bg-card p-1",
                          ri === ROOMS.length - 1 && hi === HOURS.length - 1 && "rounded-br-[15px]"
                        )}
                      >
                        {b && (
                          <div
                            className={cn(
                              "flex h-full flex-col justify-center rounded-lg px-2 py-1 text-[11px]",
                              conflict
                                ? "bg-traffic-yellow/25 text-foreground ring-1 ring-traffic-yellow/50"
                                : "bg-primary/12 text-primary"
                            )}
                            title={`${b.title} · ${b.by}`}
                          >
                            <span className="truncate font-semibold">{b.title}</span>
                            <span className="truncate opacity-80">{b.by}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Quick reserve</CardTitle>
            <CardDescription>Create a one-hour hold on a room.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-3">
          <label className="text-xs font-medium text-muted-foreground">
            Room
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="mt-1 block h-9 min-w-[160px] rounded-xl border border-black/10 bg-background px-3 text-sm dark:border-white/10"
            >
              {ROOMS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            Hour
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="mt-1 block h-9 rounded-xl border border-black/10 bg-background px-3 text-sm dark:border-white/10"
            >
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {h}:00
                </option>
              ))}
            </select>
          </label>
          <label className="min-w-[200px] flex-1 text-xs font-medium text-muted-foreground">
            Purpose
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block h-9 w-full rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
              placeholder="e.g. Parent workshop"
            />
          </label>
          <Button onClick={reserve}>Reserve room</Button>
        </CardContent>
      </Card>
    </div>
  );
}
