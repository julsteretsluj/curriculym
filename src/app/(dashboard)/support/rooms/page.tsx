"use client";

import { RoomBookingTimeline } from "@/components/modules/room-booking-timeline";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function SupportRoomsPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("support"), [setRole]);
  return <RoomBookingTimeline />;
}
