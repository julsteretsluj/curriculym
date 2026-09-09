"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { DailyNewsFeed } from "@/components/modules/daily-news-feed";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return <DailyNewsFeed />;
}
