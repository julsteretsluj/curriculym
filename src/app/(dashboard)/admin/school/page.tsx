"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { catalogStats } from "@/lib/curriculum";
import { useAppStore } from "@/stores/app-store";
import { useCurriculumStore } from "@/stores/curriculum-store";

export default function AdminSchoolPage() {
  const setRole = useAppStore((s) => s.setRole);
  const activeCurricula = useCurriculumStore((s) => s.activeCurricula);
  const enabledCount = useCurriculumStore((s) => s.enabledCourseIds.length);
  useEffect(() => setRole("admin"), [setRole]);

  const stats = catalogStats();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">School setup</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tenant configuration, curricula, and campus course offerings.
          </p>
        </div>
        <Link href="/admin/courses">
          <Button>Manage course catalog</Button>
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Curricula in catalog</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{stats.curricula}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Courses worldwide</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{stats.totalCourses}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Enabled at Harbor</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{enabledCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Curricula matrix</CardTitle>
            <CardDescription>
              Harbor International School · full course lists live in the catalog
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {stats.byCurriculum.map((c) => {
            const active = activeCurricula.includes(c.code);
            return (
              <Link
                key={c.code}
                href={`/admin/courses`}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-4 py-3 transition hover:border-primary/30 dark:border-white/10"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {c.shortName}{" "}
                    <span className="font-normal text-muted-foreground">· {c.name}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.grades} · Ages {c.ages} · {c.courseCount} courses · {c.board}
                  </p>
                </div>
                <span
                  className={
                    active
                      ? "rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                      : "rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  }
                >
                  {active ? "Active" : "Available"}
                </span>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
