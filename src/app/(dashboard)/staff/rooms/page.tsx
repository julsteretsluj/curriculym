"use client";

import { RoomBookingTimeline } from "@/components/modules/room-booking-timeline";
import { useAppStore } from "@/stores/app-store";
import { useEffect } from "react";

export default function StaffRoomsPage() {
  const setRole = useAppStore((s) => s.setRole);
  useEffect(() => setRole("staff"), [setRole]);
  return <RoomBookingTimeline />;
}
