"use client";

import { BookMarked, Headphones, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TITLES = [
  { title: "IB DP Biology Course Companion", kind: "eBook", available: true },
  { title: "Cambridge IGCSE Mathematics", kind: "eBook", available: true },
  { title: "MYP Individuals & Societies", kind: "eBook", available: false },
  { title: "AP Calculus AB Practice", kind: "Audio", available: true },
  { title: "World Literature Anthology", kind: "eBook", available: true },
  { title: "Safeguarding handbook (staff)", kind: "PDF", available: true },
];

export function OnlineLibrary() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Online library</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Borrow eBooks, audio, and course companions from Harbor Library.
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-2 p-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search catalog"
            className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TITLES.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="rounded-xl bg-accent p-2.5">
                  {item.kind === "Audio" ? (
                    <Headphones className="h-4 w-4 text-primary" />
                  ) : (
                    <BookMarked className="h-4 w-4 text-primary" />
                  )}
                </div>
                <Badge
                  className={
                    item.available
                      ? "bg-muted text-muted-foreground"
                      : "border border-black/10 bg-transparent text-muted-foreground dark:border-white/15"
                  }
                >
                  {item.available ? "Available" : "On loan"}
                </Badge>
              </div>
              <CardTitle className="text-[15px] leading-snug">{item.title}</CardTitle>
              <CardDescription>{item.kind}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="rounded-full" disabled={!item.available}>
                {item.available ? "Borrow" : "Join waitlist"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
