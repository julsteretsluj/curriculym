"use client";

import Link from "next/link";
import {
  Building2,
  Newspaper,
  ShieldAlert,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";
import { SCHOOL_POPULATION } from "@/lib/school-population";

const STATS = [
  {
    label: "Active students",
    value: SCHOOL_POPULATION.students.toLocaleString(),
    hint: "EY–G12 enrolled",
  },
  {
    label: "Teachers",
    value: SCHOOL_POPULATION.teachers.toLocaleString(),
    hint: "12 departments",
  },
  {
    label: "Parents / guardians",
    value: SCHOOL_POPULATION.parents.toLocaleString(),
    hint: "Linked family contacts",
  },
  { label: "Unread chats", value: "56", hint: "Across campuses" },
];

export default function AdminOverviewPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Leadership overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          School-wide controls for Harbor International — multi-curriculum ready.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            href: "/admin/coverage",
            title: "Platform coverage",
            desc: "Map of iSAMS, ManageBac, SOCS, and Classroom replacements.",
            icon: Building2,
          },
          {
            href: "/admin/courses",
            title: "Multi-curriculum courses",
            desc: "PYP, MYP, DP, CP, AP, A Level, IGCSE, GCSE catalogs.",
            icon: Building2,
          },
          {
            href: "/admin/directory",
            title: "School directory",
            desc: "1,284 students · 142 teachers · 968 parents.",
            icon: Users,
          },
          {
            href: "/admin/newsletters",
            title: "Global newsletter",
            desc: "Publish school-wide updates to families.",
            icon: Newspaper,
          },
          {
            href: "/admin/safeguarding",
            title: "Safeguarding logs",
            desc: "CPO-restricted encrypted incident desk.",
            icon: ShieldAlert,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-accent p-2.5">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-1">
                        {item.title}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </CardTitle>
                      <CardDescription>{item.desc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
