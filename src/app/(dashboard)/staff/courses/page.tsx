"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { ALL_CATALOG_COURSES, CURRICULUM_META, getCoursesByCurriculum } from "@/lib/curriculum";
import { useAppStore } from "@/stores/app-store";
import { useCurriculumStore } from "@/stores/curriculum-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";

export default function StaffCoursesPage() {
  const setRole = useAppStore((s) => s.setRole);
  const enabledCourseIds = useCurriculumStore((s) => s.enabledCourseIds);
  const activeCurricula = useCurriculumStore((s) => s.activeCurricula);
  const [curriculum, setCurriculum] = useState(activeCurricula[0] ?? "IB_DP");

  useEffect(() => setRole("staff"), [setRole]);

  const offered = useMemo(() => {
    return ALL_CATALOG_COURSES.filter(
      (c) => c.curriculum === curriculum && enabledCourseIds.includes(c.id)
    );
  }, [curriculum, enabledCourseIds]);

  const options = CURRICULUM_META.filter((c) => activeCurricula.includes(c.code)).map((c) => ({
    value: c.code,
    label: c.shortName,
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">School courses</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Courses enabled for Harbor by curriculum pathway.
          </p>
        </div>
        {options.length > 0 && (
          <SegmentedControl
            value={curriculum}
            onChange={(v) => setCurriculum(v as typeof curriculum)}
            options={options.slice(0, 6)}
          />
        )}
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>
              {CURRICULUM_META.find((c) => c.code === curriculum)?.name ?? curriculum}
            </CardTitle>
            <CardDescription>
              {offered.length} offered ·{" "}
              {getCoursesByCurriculum(curriculum).length} in full catalog
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {offered.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-black/5 bg-muted/30 px-3 py-3 dark:border-white/10"
              >
                <p className="text-sm font-medium">{c.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {c.code} · {c.groupName}
                  {c.levels?.length ? ` · ${c.levels.join(" / ")}` : ""}
                </p>
              </div>
            ))}
            {offered.length === 0 && (
              <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
                No courses enabled for this pathway yet. Ask an admin to enable them in Course
                Catalog.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
