"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";
import { AvatarBubble } from "@/components/ui/avatar-emoji";

const CHILDREN = [
  { name: "Aria Patel", grade: "G8", status: "On track" },
  { name: "Leo Kim", grade: "Y1", status: "Early Years" },
];

export default function ParentHubPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("parent"), [setRole]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Family hub</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Multi-child desktop for reports, meetings, and school news.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {CHILDREN.map((c) => (
          <Card key={c.name}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <AvatarBubble seed={c.name} size={44} title={c.name} />
                <div>
                  <CardTitle>{c.name}</CardTitle>
                  <CardDescription>
                    {c.grade} · {c.status}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2 text-xs">
              <Link href="/parent/reports" className="rounded-full bg-muted px-3 py-1.5 font-medium">
                Reports
              </Link>
              <Link href="/parent/meetings" className="rounded-full bg-muted px-3 py-1.5 font-medium">
                Book meeting
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
