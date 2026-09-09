"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { SchoolChat } from "@/components/modules/school-chat";

export default function StudentChatPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("student"), [setRole]);
  return (
    <SchoolChat
      title="Chat"
      description="Class and club channels"
      audienceFilter={["Class", "Subject", "ECA"]}
    />
  );
}
