"use client";

import { useMemo, useState } from "react";
import { addDays, format, setHours, setMinutes, startOfWeek } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

type Slot = {
  id: string;
  dayOffset: number;
  hour: number;
  minute: number;
  teacher: string;
  booked: boolean;
};

const BASE_SLOTS: Slot[] = [
  { id: "s1", dayOffset: 1, hour: 15, minute: 0, teacher: "Mr. Okonkwo", booked: false },
  { id: "s2", dayOffset: 1, hour: 15, minute: 20, teacher: "Mr. Okonkwo", booked: true },
  { id: "s3", dayOffset: 1, hour: 15, minute: 40, teacher: "Ms. Chen", booked: false },
  { id: "s4", dayOffset: 2, hour: 16, minute: 0, teacher: "Ms. Berg", booked: false },
  { id: "s5", dayOffset: 2, hour: 16, minute: 20, teacher: "Ms. Berg", booked: false },
  { id: "s6", dayOffset: 3, hour: 15, minute: 0, teacher: "Mr. Okonkwo", booked: false },
  { id: "s7", dayOffset: 3, hour: 15, minute: 20, teacher: "Dr. Vargas", booked: true },
  { id: "s8", dayOffset: 4, hour: 14, minute: 40, teacher: "Ms. Chen", booked: false },
];

export function ParentMeetingPortal({ mode = "parent" }: { mode?: "parent" | "staff" }) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const [slots, setSlots] = useState(BASE_SLOTS);
  const [selected, setSelected] = useState<string | null>(null);
  const pushNotification = useAppStore((s) => s.pushNotification);

  const days = useMemo(
    () => Array.from({ length: 5 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  function book(id: string) {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, booked: true } : s))
    );
    setSelected(id);
    pushNotification({
      title: "Meeting booked",
      body: "Your parent–teacher conference slot is confirmed.",
      kind: "success",
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === "staff" ? "Meeting availability" : "Book a parent meeting"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          macOS calendar-style slot picker for conference evenings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Week of {format(weekStart, "MMM d")}</CardTitle>
            <CardDescription>
              {mode === "parent"
                ? "Select an open slot with your child’s teacher."
                : "Open slots parents can book this week."}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-5">
            {days.map((day, dayIndex) => {
              const daySlots = slots.filter((s) => s.dayOffset === dayIndex + 1);
              return (
                <div key={day.toISOString()} className="rounded-2xl border border-black/5 bg-muted/30 p-3 dark:border-white/10">
                  <p className="text-center text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {format(day, "EEE")}
                  </p>
                  <p className="mb-3 text-center text-sm font-medium">
                    {format(day, "d MMM")}
                  </p>
                  <div className="space-y-2">
                    {daySlots.length === 0 && (
                      <p className="py-6 text-center text-xs text-muted-foreground">No slots</p>
                    )}
                    {daySlots.map((slot) => {
                      const time = setMinutes(setHours(day, slot.hour), slot.minute);
                      const isSelected = selected === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={slot.booked && !isSelected}
                          onClick={() => !slot.booked && mode === "parent" && book(slot.id)}
                          className={cn(
                            "w-full rounded-xl border px-2.5 py-2 text-left transition",
                            slot.booked
                              ? "border-transparent bg-black/5 text-muted-foreground opacity-60 dark:bg-white/5"
                              : isSelected
                                ? "border-primary bg-accent text-accent-foreground shadow-sm"
                                : "border-black/5 bg-card hover:border-primary/40 hover:shadow-sm dark:border-white/10"
                          )}
                        >
                          <p className="text-[13px] font-semibold">{format(time, "HH:mm")}</p>
                          <p className="truncate text-[11px] text-muted-foreground">
                            {slot.teacher}
                          </p>
                          <p className="mt-1 text-[10px] font-medium uppercase tracking-wide">
                            {slot.booked ? "Booked" : "Open"}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {mode === "staff" && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() =>
                  pushNotification({
                    title: "Slots published",
                    body: "Parents can now book Thursday evening.",
                    kind: "info",
                  })
                }
              >
                Publish new evening
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
