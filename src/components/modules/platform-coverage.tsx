"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COVERAGE: {
  product: string;
  replaces: string;
  modules: { name: string; href: string }[];
}[] = [
  {
    product: "School operations",
    replaces: "MIS / SMS",
    modules: [
      { name: "Admissions", href: "/admin/admissions" },
      { name: "Attendance", href: "/staff/attendance" },
      { name: "Directory", href: "/admin/directory" },
      { name: "Fees & billing", href: "/admin/fees" },
      { name: "Pastoral & medical", href: "/staff/pastoral" },
      { name: "Cover management", href: "/staff/cover" },
      { name: "Report cards", href: "/admin/reports" },
      { name: "Trips & consent", href: "/admin/trips" },
      { name: "Timetable", href: "/staff/timetable" },
      { name: "Safeguarding", href: "/admin/safeguarding" },
    ],
  },
  {
    product: "Curriculum & assessment",
    replaces: "IB / curriculum LMS",
    modules: [
      { name: "Course catalog", href: "/admin/courses" },
      { name: "Unit / academic hub", href: "/staff/classes" },
      { name: "Gradebook", href: "/staff/gradebook" },
      { name: "IB Core (CAS/EE/TOK)", href: "/student/ib-core" },
      { name: "Quizzes", href: "/student/quizzes" },
      { name: "Homework", href: "/staff/assignments" },
      { name: "Report cards", href: "/admin/reports" },
    ],
  },
  {
    product: "Sport & co-curricular",
    replaces: "Activities hub",
    modules: [
      { name: "Fixtures & squads", href: "/staff/fixtures" },
      { name: "ECAs / clubs", href: "/admin/ecas" },
      { name: "Trips", href: "/admin/trips" },
      { name: "Room booking", href: "/admin/rooms" },
    ],
  },
  {
    product: "Teaching & learning",
    replaces: "Class LMS",
    modules: [
      { name: "Classroom stream", href: "/staff/classroom" },
      { name: "Homework & assignments", href: "/student/assignments" },
      { name: "Quizzes", href: "/student/quizzes" },
      { name: "Chat", href: "/staff/chat" },
      { name: "Grades", href: "/student/grades" },
      { name: "Library materials", href: "/staff/library" },
    ],
  },
];

export function PlatformCoverage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Platform coverage</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything your school runs day to day — operations, curriculum, activities, and class
          learning — in one Curriculym workspace.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {COVERAGE.map((block) => (
          <Card key={block.product}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{block.product}</CardTitle>
                <Badge className="bg-primary/15 text-primary">{block.replaces}</Badge>
              </div>
              <CardDescription>{block.modules.length} linked modules</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {block.modules.map((m) => (
                <Link
                  key={m.href + m.name}
                  href={m.href}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium transition hover:border-primary/40 dark:border-white/10 dark:bg-[#2C2C2E]"
                >
                  {m.name}
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
