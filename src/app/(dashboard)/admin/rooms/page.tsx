"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";
import { RoomBookingTimeline } from "@/components/modules/room-booking-timeline";

export default function Page() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("admin"), [setRole]);
  return <RoomBookingTimeline />;
}
