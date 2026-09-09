"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/stores/app-store";
import { populationStats, SCHOOL_POPULATION } from "@/lib/school-population";

const FEATURES: { name: string; href: string; check: () => string }[] = [
  { name: "Platform coverage", href: "/admin/coverage", check: () => "iSAMS · ManageBac · SOCS · Classroom" },
  { name: "Admissions", href: "/admin/admissions", check: () => "Enquiry → offer pipeline" },
  { name: "Attendance", href: "/staff/attendance", check: () => "Homeroom register" },
  { name: "Classroom", href: "/staff/classroom", check: () => "Stream + classwork" },
  { name: "IB Core", href: "/student/ib-core", check: () => "CAS · EE · TOK" },
  { name: "Fixtures / SOCS", href: "/staff/fixtures", check: () => "Teams + fixtures" },
  { name: "Fees", href: "/admin/fees", check: () => "Tuition ledger" },
  { name: "Pastoral", href: "/staff/pastoral", check: () => "Medical + merits" },
  { name: "Cover", href: "/staff/cover", check: () => "Staff absence gaps" },
  { name: "Trips", href: "/admin/trips", check: () => "Digital consent" },
  { name: "Quizzes", href: "/student/quizzes", check: () => "Formative checks" },
  { name: "Report cards", href: "/admin/reports", check: () => "Term publish cycle" },
  { name: "Directory", href: "/admin/directory", check: () => "1,284 / 142 / 968" },
  { name: "Course catalog", href: "/admin/courses", check: () => "351 pathways" },
];

export default function AdminHealthPage() {
  const setRole = useAppStore((s) => s.setRole);
  const pushNotification = useAppStore((s) => s.pushNotification);
  const [mounted, setMounted] = useState(false);
  const stats = useMemo(() => populationStats(), []);

  useEffect(() => {
    setRole("admin");
    setMounted(true);
  }, [setRole]);

  const populationOk =
    stats.students === SCHOOL_POPULATION.students &&
    stats.teachers === SCHOOL_POPULATION.teachers &&
    stats.parents === SCHOOL_POPULATION.parents;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Feature check</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Smoke links for the all-in-one school platform.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          onClick={() =>
            pushNotification({
              title: "Smoke test ping",
              body: "Notifications are working.",
              kind: "success",
            })
          }
        >
          Test notification
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Students" value={stats.students} ok={stats.students === SCHOOL_POPULATION.students} />
        <Stat label="Teachers" value={stats.teachers} ok={stats.teachers === SCHOOL_POPULATION.teachers} />
        <Stat label="Parents" value={stats.parents} ok={stats.parents === SCHOOL_POPULATION.parents} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {populationOk && mounted ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : (
              <CircleAlert className="h-4 w-4 text-traffic-yellow" />
            )}
            Runtime checks
          </CardTitle>
          <CardDescription>
            Client hydrated · {FEATURES.length} competitor-replacement routes linked
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm transition hover:border-primary/30 dark:border-white/10"
            >
              <div>
                <p className="font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.check()}</p>
              </div>
              <Badge className="bg-muted text-muted-foreground">Open</Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, ok }: { label: string; value: number; ok: boolean }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value.toLocaleString()}</p>
        <p className="mt-1 text-xs text-muted-foreground">{ok ? "Matches seed target" : "Mismatch"}</p>
      </CardContent>
    </Card>
  );
}
