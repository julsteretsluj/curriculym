"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DEMO_PARENTS,
  DEMO_STUDENTS,
  DEMO_TEACHERS,
  SCHOOL_POPULATION,
  type DemoParent,
  type DemoStudent,
  type DemoTeacher,
} from "@/lib/school-population";
import { AvatarBubble } from "@/components/ui/avatar-emoji";

type Tab = "students" | "teachers" | "parents";

const PAGE_SIZE = 24;

export function SchoolDirectory({
  title = "School directory",
  description = "Students, teachers, and parents across Harbor International.",
  defaultTab = "students",
  tabs = ["students", "teachers", "parents"] as Tab[],
}: {
  title?: string;
  description?: string;
  defaultTab?: Tab;
  tabs?: Tab[];
}) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (tab === "students") {
      return DEMO_STUDENTS.filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.grade.toLowerCase().includes(q) ||
          s.formGroup.toLowerCase().includes(q) ||
          s.house.toLowerCase().includes(q)
      );
    }
    if (tab === "teachers") {
      return DEMO_TEACHERS.filter(
        (t) =>
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.department.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q)
      );
    }
    return DEMO_PARENTS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.includes(q)
    );
  }, [tab, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const slice = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const counts: Record<Tab, number> = {
    students: SCHOOL_POPULATION.students,
    teachers: SCHOOL_POPULATION.teachers,
    parents: SCHOOL_POPULATION.parents,
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {(
          [
            ["students", "Students"],
            ["teachers", "Teachers"],
            ["parents", "Parents"],
          ] as const
        )
          .filter(([key]) => tabs.includes(key))
          .map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setTab(key);
                setPage(0);
              }}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                tab === key
                  ? "border-primary/30 bg-primary/10"
                  : "border-black/5 bg-white dark:border-white/10 dark:bg-[#1C1C1E]"
              }`}
            >
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {counts[key].toLocaleString()}
              </p>
            </button>
          ))}
      </div>

      <Card>
        <CardContent className="flex items-center gap-2 p-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder={`Search ${tab}…`}
            className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          Showing {slice.length} of {filtered.length.toLocaleString()} {tab}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full px-3 py-1 hover:bg-muted disabled:opacity-40"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </button>
          <span>
            {safePage + 1} / {pageCount}
          </span>
          <button
            type="button"
            className="rounded-full px-3 py-1 hover:bg-muted disabled:opacity-40"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tab === "students" &&
          (slice as DemoStudent[]).map((s) => (
            <Card key={s.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AvatarBubble seed={s.id} size={40} title={s.name} />
                  <div className="min-w-0">
                    <CardTitle className="truncate text-[15px]">{s.name}</CardTitle>
                    <CardDescription>
                      {s.formGroup} · House {s.house}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                <Badge className="bg-muted text-muted-foreground">{s.grade}</Badge>
                <Badge className="bg-muted text-muted-foreground">
                  {s.parentIds.length} guardian{s.parentIds.length === 1 ? "" : "s"}
                </Badge>
              </CardContent>
            </Card>
          ))}

        {tab === "teachers" &&
          (slice as DemoTeacher[]).map((t) => (
            <Card key={t.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AvatarBubble seed={t.id} size={40} title={t.name} />
                  <div className="min-w-0">
                    <CardTitle className="truncate text-[15px]">{t.name}</CardTitle>
                    <CardDescription className="truncate">{t.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge className="bg-muted text-muted-foreground">{t.department}</Badge>
              </CardContent>
            </Card>
          ))}

        {tab === "parents" &&
          (slice as DemoParent[]).map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AvatarBubble seed={p.id} size={40} title={p.name} />
                  <div className="min-w-0">
                    <CardTitle className="truncate text-[15px]">{p.name}</CardTitle>
                    <CardDescription className="truncate">{p.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 text-xs text-muted-foreground">
                <p>{p.phone}</p>
                <p>
                  {p.childIds.length} child{p.childIds.length === 1 ? "" : "ren"} enrolled
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

