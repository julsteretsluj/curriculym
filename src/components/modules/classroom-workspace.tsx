"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const POSTS = [
  {
    author: "Mr. Okonkwo",
    when: "2h ago",
    body: "Lab coats required tomorrow. Safety quiz unlocks after Period 3.",
    attachments: ["Lab_safety.pdf"],
  },
  {
    author: "You",
    when: "Yesterday",
    body: "Uploaded photosynthesis diagrams for peer review.",
    attachments: ["diagrams.zip"],
  },
];

const MATERIALS = [
  { title: "Unit 3 slide deck", type: "Slides", updated: "Mon" },
  { title: "Criteria rubric A–D", type: "Rubric", updated: "Last week" },
  { title: "Field study brief", type: "Doc", updated: "Today" },
];

export function ClassroomWorkspace() {
  const [tab, setTab] = useState<"stream" | "classwork" | "people">("stream");
  const [draft, setDraft] = useState("");
  const [posts, setPosts] = useState(POSTS);
  const pushNotification = useAppStore((s) => s.pushNotification);

  function publish() {
    if (!draft.trim()) return;
    setPosts((p) => [
      { author: "You", when: "Just now", body: draft.trim(), attachments: [] },
      ...p,
    ]);
    setDraft("");
    pushNotification({
      title: "Posted to class stream",
      body: "MYP Sciences 8A notified.",
      kind: "success",
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Classroom</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Stream, classwork, and materials — Google Classroom replacement.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["stream", "Stream"],
            ["classwork", "Classwork"],
            ["people", "People"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              tab === id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "stream" && (
        <div className="space-y-3">
          <Card>
            <CardContent className="flex gap-2 p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Share with your class…"
                className="h-10 flex-1 rounded-full border border-black/10 bg-background px-4 text-sm outline-none dark:border-white/10"
              />
              <Button className="rounded-full" onClick={publish}>
                Post
              </Button>
            </CardContent>
          </Card>
          {posts.map((p, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-[15px]">{p.author}</CardTitle>
                <CardDescription>{p.when}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{p.body}</p>
                {p.attachments.map((a) => (
                  <Badge key={a} className="bg-muted text-muted-foreground">
                    {a}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "classwork" && (
        <Card>
          <CardHeader>
            <CardTitle>Materials & topics</CardTitle>
            <CardDescription>Unit resources students can open anytime</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {MATERIALS.map((m) => (
              <div
                key={m.title}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium">{m.title}</p>
                  <p className="text-xs text-muted-foreground">Updated {m.updated}</p>
                </div>
                <Badge className="bg-muted text-muted-foreground">{m.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "people" && (
        <Card>
          <CardHeader>
            <CardTitle>Teachers & students</CardTitle>
            <CardDescription>28 students · 1 co-teacher</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Guardians can be invited per class. Directory sync keeps rosters current from admissions.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
