"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STORIES = [
  {
    title: "Sports day rehearsal",
    when: "Today · 14:00 · Field",
    body: "Secondary students should wear house colours. Early years parade begins at 13:30.",
    tag: "Today",
  },
  {
    title: "Library quiet hours",
    when: "This week · Media Center",
    body: "Exam quiet hours run 08:00–10:00. Chromebooks available for online borrowing.",
    tag: "Campus",
  },
  {
    title: "Robotics showcase",
    when: "Friday · 16:00 · Hall",
    body: "ECA teams demo competition robots. Families welcome — book seats via the portal.",
    tag: "ECA",
  },
  {
    title: "Parent evening reminders",
    when: "Tomorrow",
    body: "Slots close tonight at 21:00. Check Book Meeting for remaining times with subject teachers.",
    tag: "Family",
  },
];

export function DailyNewsFeed({
  title = "Daily news",
  description = "School updates for today and this week",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-3">
        {STORIES.map((story) => (
          <Card key={story.title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription>{story.when}</CardDescription>
                </div>
                <Badge className="bg-muted text-muted-foreground">{story.tag}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{story.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
