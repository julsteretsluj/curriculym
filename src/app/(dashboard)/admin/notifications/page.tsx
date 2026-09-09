"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { NotificationsInbox } from "@/components/modules/notifications-inbox";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <NotificationsInbox />;
}
