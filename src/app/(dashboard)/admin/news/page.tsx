"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { DailyNewsFeed } from "@/components/modules/daily-news-feed";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <DailyNewsFeed title="Daily news" description="Published campus updates." />;
}
