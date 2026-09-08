"use client";

import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import {
  ALL_CATALOG_COURSES,
  CURRICULUM_META,
  CatalogCourse,
  CurriculumCode,
  catalogStats,
  getCourseGroups,
  getCoursesByCurriculum,
} from "@/lib/curriculum";
import { useCurriculumStore } from "@/stores/curriculum-store";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CurriculumCourseBrowser({
  initialCurriculum = "IB_DP",
}: {
  initialCurriculum?: CurriculumCode;
}) {
  const [curriculum, setCurriculum] = useState<CurriculumCode>(initialCurriculum);
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [view, setView] = useState<"offered" | "catalog">("catalog");

  const enabledCourseIds = useCurriculumStore((s) => s.enabledCourseIds);
  const activeCurricula = useCurriculumStore((s) => s.activeCurricula);
  const toggleCourse = useCurriculumStore((s) => s.toggleCourse);
  const setCurriculumActive = useCurriculumStore((s) => s.setCurriculumActive);
  const enableAll = useCurriculumStore((s) => s.enableAllInCurriculum);
  const disableAll = useCurriculumStore((s) => s.disableAllInCurriculum);

  const stats = catalogStats();
  const meta = CURRICULUM_META.find((c) => c.code === curriculum)!;
  const groups = getCourseGroups(curriculum);

  const courses = useMemo(() => {
    let list: CatalogCourse[] = getCoursesByCurriculum(curriculum);
    if (view === "offered") {
      list = list.filter((c) => enabledCourseIds.includes(c.id));
    }
    if (groupFilter !== "all") {
      list = list.filter((c) => c.groupName === groupFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.groupName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [curriculum, enabledCourseIds, groupFilter, query, view]);

  const enabledInCurriculum = getCoursesByCurriculum(curriculum).filter((c) =>
    enabledCourseIds.includes(c.id)
  ).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Course catalog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {stats.totalCourses} courses across {stats.curricula} curricula — enable what this
            school offers.
          </p>
        </div>
        <SegmentedControl
          value={view}
          onChange={(v) => setView(v as "offered" | "catalog")}
          options={[
            { value: "catalog", label: "Full catalog" },
            { value: "offered", label: `Offered (${enabledCourseIds.length})` },
          ]}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {CURRICULUM_META.filter((c) =>
          [
            "IB_PYP",
            "IB_MYP",
            "IB_DP",
            "IB_CP",
            "AP",
            "IGCSE",
            "A_LEVEL",
            "GCSE",
          ].includes(c.code)
        ).map((c) => {
          const count = getCoursesByCurriculum(c.code).length;
          const active = activeCurricula.includes(c.code);
          const selected = curriculum === c.code;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setCurriculum(c.code);
                setGroupFilter("all");
              }}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left transition",
                selected
                  ? "border-primary bg-accent shadow-sm"
                  : "border-black/5 bg-card/90 hover:border-primary/30 dark:border-white/10"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold tracking-tight">{c.shortName}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    active ? "bg-traffic-green/20 text-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {active ? "Active" : "Off"}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">{c.name}</p>
              <p className="mt-2 text-xs tabular-nums text-muted-foreground">{count} courses</p>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="min-w-0">
            <CardTitle>{meta.name}</CardTitle>
            <CardDescription>
              {meta.board} · Ages {meta.ages} · {meta.grades} · {enabledInCurriculum} of{" "}
              {getCoursesByCurriculum(curriculum).length} enabled
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setCurriculumActive(curriculum, !activeCurricula.includes(curriculum))
              }
            >
              {activeCurricula.includes(curriculum) ? "Deactivate pathway" : "Activate pathway"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => enableAll(curriculum)}>
              Enable all
            </Button>
            <Button variant="ghost" size="sm" onClick={() => disableAll(curriculum)}>
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{meta.description}</p>

          <div className="flex flex-wrap items-center gap-2">
            <label className="relative min-w-[200px] flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, codes, groups…"
                className="h-9 w-full rounded-xl border border-black/10 bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
              />
            </label>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="h-9 rounded-xl border border-black/10 bg-background px-3 text-sm dark:border-white/10"
            >
              <option value="all">All groups</option>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Secondary curricula picker */}
          <div className="flex flex-wrap gap-1.5">
            {CURRICULUM_META.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurriculum(c.code);
                  setGroupFilter("all");
                }}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium transition",
                  curriculum === c.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {c.shortName}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground">
                <tr>
                  <th className="w-12 px-3 py-2.5 font-medium" />
                  <th className="px-3 py-2.5 font-medium">Course</th>
                  <th className="hidden px-3 py-2.5 font-medium md:table-cell">Code</th>
                  <th className="hidden px-3 py-2.5 font-medium lg:table-cell">Group</th>
                  <th className="hidden px-3 py-2.5 font-medium sm:table-cell">Levels</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-10 text-center text-muted-foreground">
                      No courses match this filter.
                    </td>
                  </tr>
                )}
                {courses.map((c) => {
                  const on = enabledCourseIds.includes(c.id);
                  return (
                    <tr
                      key={c.id}
                      className="border-t border-black/5 dark:border-white/10"
                    >
                      <td className="px-3 py-2.5">
                        <button
                          type="button"
                          onClick={() => toggleCourse(c.id)}
                          aria-label={on ? `Disable ${c.name}` : `Enable ${c.name}`}
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md border transition",
                            on
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-black/15 bg-background dark:border-white/15"
                          )}
                        >
                          {on && <Check className="h-3.5 w-3.5" />}
                        </button>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="font-medium">{c.name}</p>
                        {c.description && (
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                            {c.description}
                          </p>
                        )}
                      </td>
                      <td className="hidden px-3 py-2.5 font-mono text-xs text-muted-foreground md:table-cell">
                        {c.code}
                      </td>
                      <td className="hidden px-3 py-2.5 text-xs text-muted-foreground lg:table-cell">
                        {c.groupName}
                      </td>
                      <td className="hidden px-3 py-2.5 sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {(c.levels ?? []).map((l) => (
                            <span
                              key={l}
                              className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium"
                            >
                              {l}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-muted-foreground">
            Catalog size: {ALL_CATALOG_COURSES.length} courses total. Offerings are stored locally
            for this demo tenant; Prisma `CatalogCourse` / `TenantCourse` models support persistence.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
