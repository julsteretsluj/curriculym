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

const STATS = [
  { label: "Active students", value: "1,284", hint: "+18 this term" },
  { label: "Staff accounts", value: "142", hint: "12 departments" },
  { label: "Open rooms today", value: "27", hint: "3 conflicts" },
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
            href: "/admin/school",
            title: "Multi-curriculum setup",
            desc: "IB, Cambridge, AP, and national pathways.",
            icon: Building2,
          },
          {
            href: "/admin/directory",
            title: "Role access matrix",
            desc: "Directory, permissions, and profile pills.",
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
