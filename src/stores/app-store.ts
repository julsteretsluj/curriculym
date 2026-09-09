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

export const PRONOUN_OPTIONS = [
  "she/her",
  "he/him",
  "they/them",
  "she/they",
  "he/they",
  "any pronouns",
  "prefer not to say",
] as const;

export const INTEREST_OPTIONS = [
  "Science",
  "Math",
  "Reading",
  "Writing",
  "Art",
  "Music",
  "Drama",
  "Coding",
  "Design",
  "Languages",
  "History",
  "Environment",
  "Debate",
  "Photography",
  "Cooking",
  "Volunteering",
] as const;

export const CLUB_SPORT_OPTIONS = [
  "Football",
  "Basketball",
  "Swimming",
  "Athletics",
  "Tennis",
  "Volleyball",
  "Robotics Club",
  "Chamber Choir",
  "Debate Society",
  "Model United Nations",
  "Art Studio",
  "Jazz Ensemble",
  "Drama Club",
  "Coding Club",
  "Eco Club",
  "Student Council",
] as const;

export type PronounOption = (typeof PRONOUN_OPTIONS)[number];

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
  /** Editable profile fields */
  profileDisplayName: string;
  profilePronouns: PronounOption | "";
  profileInterests: string[];
  profileClubsSports: string[];
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
  setProfileDisplayName: (name: string) => void;
  setProfilePronouns: (pronouns: PronounOption | "") => void;
  toggleProfileInterest: (interest: string) => void;
  toggleProfileClubSport: (item: string) => void;
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
  profileDisplayName: "",
  profilePronouns: "",
  profileInterests: ["Science", "Reading", "Coding"],
  profileClubsSports: ["Robotics Club", "Football"],
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
    set((s) => ({
      role: access.role,
      allowedRoles: access.allowedRoles,
      accountEmail: access.email,
      accountName: access.name,
      canAccessAll: access.canAccessAll,
      profileDisplayName: s.profileDisplayName || access.name,
    })),
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
  setProfileDisplayName: (profileDisplayName) => set({ profileDisplayName }),
  setProfilePronouns: (profilePronouns) => set({ profilePronouns }),
  toggleProfileInterest: (interest) =>
    set((s) => ({
      profileInterests: s.profileInterests.includes(interest)
        ? s.profileInterests.filter((i) => i !== interest)
        : [...s.profileInterests, interest],
    })),
  toggleProfileClubSport: (item) =>
    set((s) => ({
      profileClubsSports: s.profileClubsSports.includes(item)
        ? s.profileClubsSports.filter((i) => i !== item)
        : [...s.profileClubsSports, item],
    })),
  canViewRole: (role) => {
    const { allowedRoles, canAccessAll } = get();
    return canAccessAll || allowedRoles.includes(role);
  },
  currentUser: () => {
    const {
      role,
      studentBand,
      accountName,
      accountEmail,
      profileDisplayName,
    } = get();
    const displayName = profileDisplayName || accountName;
    if (role === "student" && studentBand === "early_years") {
      return {
        ...EARLY_YEARS_STUDENT,
        name: displayName || EARLY_YEARS_STUDENT.name,
        email: accountEmail || EARLY_YEARS_STUDENT.email,
      };
    }
    const base = DEMO_USERS[role];
    return {
      ...base,
      name: displayName || base.name,
      email: accountEmail || base.email,
      avatarInitials:
        displayName
          ?.split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((p) => p[0]?.toUpperCase() ?? "")
          .join("") || base.avatarInitials,
    };
  },
}));
