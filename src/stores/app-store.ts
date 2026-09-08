"use client";

import { create } from "zustand";
import {
  AppRole,
  DEMO_USERS,
  DemoUser,
  EARLY_YEARS_STUDENT,
  GradeBand,
} from "@/lib/demo-data";

export interface MacNotification {
  id: string;
  title: string;
  body: string;
  kind: "info" | "warning" | "safeguarding" | "success";
  createdAt: number;
  href?: string;
}

interface AppState {
  role: AppRole;
  studentBand: GradeBand;
  sidebarCollapsed: boolean;
  notifications: MacNotification[];
  notificationOpen: boolean;
  setRole: (role: AppRole) => void;
  setStudentBand: (band: GradeBand) => void;
  toggleSidebar: () => void;
  setNotificationOpen: (open: boolean) => void;
  pushNotification: (n: Omit<MacNotification, "id" | "createdAt">) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
  currentUser: () => DemoUser;
}

export const useAppStore = create<AppState>((set, get) => ({
  role: "admin",
  studentBand: "upper",
  sidebarCollapsed: false,
  notificationOpen: false,
  notifications: [
    {
      id: "n1",
      title: "Parent evening slots",
      body: "12 new bookings opened for Thursday.",
      kind: "info",
      createdAt: Date.now() - 1000 * 60 * 12,
    },
    {
      id: "n2",
      title: "Room conflict",
      body: "Science Lab B double-booked at 14:00.",
      kind: "warning",
      createdAt: Date.now() - 1000 * 60 * 40,
    },
  ],
  setRole: (role) => set({ role }),
  setStudentBand: (studentBand) => set({ studentBand }),
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setNotificationOpen: (notificationOpen) => set({ notificationOpen }),
  pushNotification: (n) =>
    set((s) => ({
      notifications: [
        {
          ...n,
          id: `n-${Date.now()}`,
          createdAt: Date.now(),
        },
        ...s.notifications,
      ].slice(0, 8),
      notificationOpen: true,
    })),
  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
  currentUser: () => {
    const { role, studentBand } = get();
    if (role === "student" && studentBand === "early_years") {
      return EARLY_YEARS_STUDENT;
    }
    return DEMO_USERS[role];
  },
}));
