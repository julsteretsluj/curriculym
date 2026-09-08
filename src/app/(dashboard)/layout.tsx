"use client";

import { MacOsWindowFrame } from "@/components/macos/mac-os-window-frame";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MacOsWindowFrame>{children}</MacOsWindowFrame>;
}
