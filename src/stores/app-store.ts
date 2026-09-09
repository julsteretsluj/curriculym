"use client";

import { create } from "zustand";
import {
  AppRole,
  DEMO_USERS,
  DemoUser,
  EARLY_YEARS_STUDENT,
  GradeBand,
} from "@/lib/demo-data";
import { ALL_APP_ROLES } from "@/lib/clerk-roles";

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
  allowedRoles: AppRole[];
  accountEmail: string;
  accountName: string;
  canAccessAll: boolean;
  studentBand: GradeBand;
  sidebarCollapsed: boolean;
  notifications: MacNotification[];
  notificationOpen: boolean;
  hydrateAccess: (access: {
    role: AppRole;
    allowedRoles: AppRole[];
    email: string;
    name: string;
    canAccessAll: boolean;
  }) => void;
  setRole: (role: AppRole) => void;
  setStudentBand: (band: GradeBand) => void;
  toggleSidebar: () => void;
  setNotificationOpen: (open: boolean) => void;
  pushNotification: (n: Omit<MacNotification, "id" | "createdAt">) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
  currentUser: () => DemoUser;
  canViewRole: (role: AppRole) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  role: "admin",
  allowedRoles: [...ALL_APP_ROLES],
  accountEmail: "",
  accountName: "",
  canAccessAll: false,
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
  hydrateAccess: (access) =>
    set({
      role: access.role,
      allowedRoles: access.allowedRoles,
      accountEmail: access.email,
      accountName: access.name,
      canAccessAll: access.canAccessAll,
    }),
  setRole: (role) => {
    const { allowedRoles, canAccessAll } = get();
    if (canAccessAll || allowedRoles.includes(role)) {
      set({ role });
    }
  },
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
  canViewRole: (role) => {
    const { allowedRoles, canAccessAll } = get();
    return canAccessAll || allowedRoles.includes(role);
  },
  currentUser: () => {
    const { role, studentBand, accountName, accountEmail } = get();
    if (role === "student" && studentBand === "early_years") {
      return {
        ...EARLY_YEARS_STUDENT,
        name: accountName || EARLY_YEARS_STUDENT.name,
        email: accountEmail || EARLY_YEARS_STUDENT.email,
      };
    }
    const base = DEMO_USERS[role];
    return {
      ...base,
      name: accountName || base.name,
      email: accountEmail || base.email,
      avatarInitials:
        accountName
          ?.split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((p) => p[0]?.toUpperCase() ?? "")
          .join("") || base.avatarInitials,
    };
  },
}));
