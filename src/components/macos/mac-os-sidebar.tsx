"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Activity,
  Banknote,
  Bell,
  BookMarked,
  BookOpen,
  Bus,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  DoorOpen,
  FileSpreadsheet,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Map,
  MessageSquare,
  MonitorPlay,
  Newspaper,
  School,
  ShieldAlert,
  Stethoscope,
  Trophy,
  UserPlus,
  UserRound,
  Users,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/stores/app-store";
import { useShallow } from "zustand/react/shallow";
import type { AppRole } from "@/lib/demo-data";
import { BrandMark } from "@/components/brand-mark";
import { roleHomePath } from "@/lib/clerk-roles";
import { AvatarBubble } from "@/components/ui/avatar-emoji";

type IconKey =
  | "dashboard"
  | "classes"
  | "timetable"
  | "assignments"
  | "chat"
  | "news"
  | "directory"
  | "safeguarding"
  | "meetings"
  | "rooms"
  | "gradebook"
  | "school"
  | "ecas"
  | "library"
  | "notifications"
  | "profile"
  | "attendance"
  | "admissions"
  | "fees"
  | "pastoral"
  | "cover"
  | "reports"
  | "trips"
  | "fixtures"
  | "classroom"
  | "ib"
  | "coverage"
  | "quizzes";

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  classes: BookOpen,
  timetable: CalendarDays,
  assignments: ClipboardList,
  chat: MessageSquare,
  news: Newspaper,
  directory: Users,
  safeguarding: ShieldAlert,
  meetings: CalendarClock,
  rooms: DoorOpen,
  gradebook: GraduationCap,
  school: School,
  ecas: Trophy,
  library: BookMarked,
  notifications: Bell,
  profile: UserRound,
  attendance: ClipboardCheck,
  admissions: UserPlus,
  fees: Banknote,
  pastoral: HeartPulse,
  cover: Stethoscope,
  reports: FileSpreadsheet,
  trips: Bus,
  fixtures: Activity,
  classroom: MonitorPlay,
  ib: GraduationCap,
  coverage: Map,
  quizzes: ClipboardCheck,
};

interface NavItem {
  href: string;
  label: string;
  icon: IconKey;
  badge?: number;
}

interface NavGroup {
  id: string;
  label: string;
  roles: AppRole[];
  /** Flat item at top level (no accordion) when true and only one item with same label */
  pin?: boolean;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  // —— Admin ——
  {
    id: "admin-home",
    label: "Home",
    roles: ["admin"],
    items: [
      { href: "/admin", label: "Overview", icon: "dashboard" },
      { href: "/admin/coverage", label: "Platform coverage", icon: "coverage" },
      { href: "/admin/health", label: "Feature check", icon: "dashboard" },
      { href: "/admin/school", label: "School Setup", icon: "school" },
    ],
  },
  {
    id: "admin-ops",
    label: "School operations",
    roles: ["admin"],
    items: [
      { href: "/admin/admissions", label: "Admissions", icon: "admissions" },
      { href: "/admin/directory", label: "Directory", icon: "directory" },
      { href: "/admin/attendance", label: "Attendance", icon: "attendance" },
      { href: "/admin/fees", label: "Fees & billing", icon: "fees" },
      { href: "/admin/pastoral", label: "Pastoral & medical", icon: "pastoral" },
      { href: "/admin/cover", label: "Cover", icon: "cover" },
      { href: "/admin/safeguarding", label: "Safeguarding", icon: "safeguarding", badge: 2 },
    ],
  },
  {
    id: "admin-learn",
    label: "Teaching & learning",
    roles: ["admin"],
    items: [
      { href: "/admin/classes", label: "Classes", icon: "classes" },
      { href: "/admin/courses", label: "Course Catalog", icon: "gradebook" },
      { href: "/admin/classroom", label: "Classroom", icon: "classroom" },
      { href: "/admin/ib-core", label: "IB Core", icon: "ib" },
      { href: "/admin/reports", label: "Report cards", icon: "reports" },
      { href: "/admin/library", label: "Online Library", icon: "library" },
    ],
  },
  {
    id: "admin-activities",
    label: "Activities",
    roles: ["admin"],
    items: [
      { href: "/admin/ecas", label: "ECAs", icon: "ecas" },
      { href: "/admin/fixtures", label: "Fixtures", icon: "fixtures" },
      { href: "/admin/trips", label: "Trips & consent", icon: "trips" },
      { href: "/admin/rooms", label: "Room Booking", icon: "rooms" },
      { href: "/admin/meetings", label: "Meeting Booking", icon: "meetings" },
    ],
  },
  {
    id: "admin-comms",
    label: "Communication",
    roles: ["admin"],
    items: [
      { href: "/admin/chat", label: "Chat", icon: "chat" },
      { href: "/admin/news", label: "Daily News", icon: "news" },
      { href: "/admin/newsletters", label: "Newsletters", icon: "news" },
      { href: "/admin/notifications", label: "Notifications", icon: "notifications", badge: 2 },
    ],
  },
  {
    id: "admin-account",
    label: "Account",
    roles: ["admin"],
    items: [{ href: "/admin/profile", label: "Profile", icon: "profile" }],
  },

  // —— Staff ——
  {
    id: "staff-home",
    label: "Home",
    roles: ["staff"],
    items: [{ href: "/staff", label: "Overview", icon: "dashboard" }],
  },
  {
    id: "staff-learn",
    label: "Teaching & learning",
    roles: ["staff"],
    items: [
      { href: "/staff/attendance", label: "Attendance", icon: "attendance" },
      { href: "/staff/classes", label: "Classes", icon: "classes" },
      { href: "/staff/classroom", label: "Classroom", icon: "classroom" },
      { href: "/staff/timetable", label: "Schedules", icon: "timetable" },
      { href: "/staff/assignments", label: "Homework", icon: "assignments" },
      { href: "/staff/quizzes", label: "Quizzes", icon: "quizzes" },
      { href: "/staff/gradebook", label: "Grades", icon: "gradebook" },
      { href: "/staff/ib-core", label: "IB Core", icon: "ib" },
      { href: "/staff/reports", label: "Report cards", icon: "reports" },
      { href: "/staff/courses", label: "Courses", icon: "classes" },
      { href: "/staff/library", label: "Online Library", icon: "library" },
    ],
  },
  {
    id: "staff-ops",
    label: "School operations",
    roles: ["staff"],
    items: [
      { href: "/staff/pastoral", label: "Pastoral", icon: "pastoral" },
      { href: "/staff/cover", label: "Cover", icon: "cover" },
      { href: "/staff/directory", label: "Directory", icon: "directory" },
      { href: "/staff/rooms", label: "Room Booking", icon: "rooms" },
      { href: "/staff/meetings", label: "Meeting Booking", icon: "meetings" },
    ],
  },
  {
    id: "staff-activities",
    label: "Activities",
    roles: ["staff"],
    items: [
      { href: "/staff/ecas", label: "ECAs", icon: "ecas" },
      { href: "/staff/fixtures", label: "Fixtures", icon: "fixtures" },
      { href: "/staff/trips", label: "Trips", icon: "trips" },
    ],
  },
  {
    id: "staff-comms",
    label: "Communication",
    roles: ["staff"],
    items: [
      { href: "/staff/chat", label: "Chat", icon: "chat" },
      { href: "/staff/news", label: "Daily News", icon: "news" },
      { href: "/staff/notifications", label: "Notifications", icon: "notifications", badge: 2 },
    ],
  },
  {
    id: "staff-account",
    label: "Account",
    roles: ["staff"],
    items: [{ href: "/staff/profile", label: "Profile", icon: "profile" }],
  },

  // —— Student ——
  {
    id: "student-home",
    label: "Home",
    roles: ["student"],
    items: [{ href: "/student", label: "Home", icon: "dashboard" }],
  },
  {
    id: "student-learn",
    label: "My learning",
    roles: ["student"],
    items: [
      { href: "/student/classroom", label: "Classroom", icon: "classroom" },
      { href: "/student/classes", label: "Classes", icon: "classes" },
      { href: "/student/timetable", label: "Schedules", icon: "timetable" },
      { href: "/student/attendance", label: "Attendance", icon: "attendance" },
      { href: "/student/assignments", label: "Homework", icon: "assignments", badge: 3 },
      { href: "/student/quizzes", label: "Quizzes", icon: "quizzes" },
      { href: "/student/grades", label: "Grades", icon: "gradebook" },
      { href: "/student/ib-core", label: "IB Core", icon: "ib" },
      { href: "/student/library", label: "Online Library", icon: "library" },
    ],
  },
  {
    id: "student-activities",
    label: "Activities",
    roles: ["student"],
    items: [
      { href: "/student/ecas", label: "ECAs", icon: "ecas" },
      { href: "/student/fixtures", label: "Fixtures", icon: "fixtures" },
      { href: "/student/trips", label: "Trips", icon: "trips" },
    ],
  },
  {
    id: "student-comms",
    label: "Communication",
    roles: ["student"],
    items: [
      { href: "/student/chat", label: "Chat", icon: "chat", badge: 5 },
      { href: "/student/news", label: "Daily News", icon: "news" },
      { href: "/student/notifications", label: "Notifications", icon: "notifications", badge: 2 },
    ],
  },
  {
    id: "student-account",
    label: "Account",
    roles: ["student"],
    items: [{ href: "/student/profile", label: "Profile", icon: "profile" }],
  },

  // —— Parent ——
  {
    id: "parent-home",
    label: "Home",
    roles: ["parent"],
    items: [{ href: "/parent", label: "Family Hub", icon: "dashboard" }],
  },
  {
    id: "parent-learn",
    label: "Learning",
    roles: ["parent"],
    items: [
      { href: "/parent/classes", label: "Classes", icon: "classes" },
      { href: "/parent/classroom", label: "Classroom", icon: "classroom" },
      { href: "/parent/timetable", label: "Schedules", icon: "timetable" },
      { href: "/parent/attendance", label: "Attendance", icon: "attendance" },
      { href: "/parent/homework", label: "Homework", icon: "assignments" },
      { href: "/parent/grades", label: "Grades", icon: "gradebook" },
      { href: "/parent/report-cards", label: "Report cards", icon: "reports" },
      { href: "/parent/reports", label: "Legacy reports", icon: "gradebook" },
    ],
  },
  {
    id: "parent-family",
    label: "Family & school",
    roles: ["parent"],
    items: [
      { href: "/parent/fees", label: "Fees", icon: "fees" },
      { href: "/parent/meetings", label: "Meeting Booking", icon: "meetings" },
      { href: "/parent/trips", label: "Trips & consent", icon: "trips" },
      { href: "/parent/ecas", label: "ECAs", icon: "ecas" },
      { href: "/parent/fixtures", label: "Fixtures", icon: "fixtures" },
      { href: "/parent/library", label: "Online Library", icon: "library" },
    ],
  },
  {
    id: "parent-comms",
    label: "Communication",
    roles: ["parent"],
    items: [
      { href: "/parent/chat", label: "Chat", icon: "chat" },
      { href: "/parent/news", label: "Daily News", icon: "news" },
      { href: "/parent/notifications", label: "Notifications", icon: "notifications", badge: 2 },
    ],
  },
  {
    id: "parent-account",
    label: "Account",
    roles: ["parent"],
    items: [{ href: "/parent/profile", label: "Profile", icon: "profile" }],
  },

  // —— Support ——
  {
    id: "support-care",
    label: "Student care",
    roles: ["support"],
    items: [
      { href: "/support", label: "Safeguarding Desk", icon: "safeguarding", badge: 2 },
      { href: "/support/pastoral", label: "Pastoral & medical", icon: "pastoral" },
      { href: "/support/attendance", label: "Attendance", icon: "attendance" },
      { href: "/support/directory", label: "Student Directory", icon: "directory" },
    ],
  },
  {
    id: "support-ops",
    label: "Operations",
    roles: ["support"],
    items: [
      { href: "/support/trips", label: "Trips", icon: "trips" },
      { href: "/support/rooms", label: "Room Booking", icon: "rooms" },
    ],
  },
  {
    id: "support-comms",
    label: "Communication",
    roles: ["support"],
    items: [
      { href: "/support/news", label: "Daily News", icon: "news" },
      { href: "/support/notifications", label: "Notifications", icon: "notifications", badge: 2 },
    ],
  },
  {
    id: "support-account",
    label: "Account",
    roles: ["support"],
    items: [{ href: "/support/profile", label: "Profile", icon: "profile" }],
  },
];

function isItemActive(pathname: string, href: string, role: AppRole) {
  const roots = [`/${role}`, "/admin", "/staff", "/student", "/parent", "/support"];
  if (roots.includes(href)) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MacOsSidebar() {
  const pathname = usePathname();
  const role = useAppStore((s) => s.role);
  const user = useAppStore(
    useShallow((s) => {
      const u = s.currentUser();
      return {
        name: u.name,
        title: u.title,
        email: u.email,
        id: u.id,
      };
    })
  );
  const pronouns = useAppStore((s) => s.profilePronouns);
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const unread = useAppStore((s) => s.notifications.length);
  const setNotificationOpen = useAppStore((s) => s.setNotificationOpen);
  const { theme, setTheme } = useTheme();

  const groups = useMemo(
    () => NAV_GROUPS.filter((g) => g.roles.includes(role)),
    [role]
  );

  const activeGroupId = useMemo(() => {
    for (const group of groups) {
      if (group.items.some((item) => isItemActive(pathname, item.href, role))) {
        return group.id;
      }
    }
    return groups[0]?.id ?? "";
  }, [groups, pathname, role]);

  const [openIds, setOpenIds] = useState<string[]>([]);

  useEffect(() => {
    setOpenIds((prev) =>
      prev.includes(activeGroupId) ? prev : [...prev, activeGroupId]
    );
  }, [activeGroupId]);

  function toggleGroup(id: string) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-black/5 bg-sidebar/80 backdrop-blur-xl transition-[width] duration-300 dark:border-white/10",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="flex h-12 items-center gap-2 px-3">
        <div className="flex shrink-0 items-center gap-1.5 pl-1">
          <span className="h-3 w-3 rounded-full bg-traffic-red" />
          <span className="h-3 w-3 rounded-full bg-traffic-yellow" />
          <span className="h-3 w-3 rounded-full bg-traffic-green" />
        </div>
        {!collapsed ? (
          <BrandMark href={null} size={22} variant="wordmark" className="ml-1 min-w-0" />
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-3">
        {collapsed
          ? groups.flatMap((group) =>
              group.items.map((item) => {
                const Icon = ICONS[item.icon];
                const active = isItemActive(pathname, item.href, role);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    className={cn(
                      "relative flex items-center justify-center rounded-[10px] p-2.5 transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/8"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.badge ? (
                      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    ) : null}
                  </Link>
                );
              })
            )
          : groups.map((group) => {
              const open = openIds.includes(group.id);
              const groupActive = group.id === activeGroupId;
              return (
                <div key={group.id} className="mb-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-left transition-colors",
                      groupActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/8"
                    )}
                  >
                    <span className="flex-1 text-[11px] font-semibold uppercase tracking-wide">
                      {group.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                        open ? "rotate-0" : "-rotate-90"
                      )}
                    />
                  </button>

                  {open ? (
                    <div className="mt-0.5 space-y-0.5 pl-0.5">
                      {group.items.map((item) => {
                        const Icon = ICONS[item.icon];
                        const active = isItemActive(pathname, item.href, role);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "group flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[13px] font-medium transition-colors",
                              active
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/8"
                            )}
                            title={item.label}
                          >
                            <Icon className="h-[18px] w-[18px] shrink-0" />
                            <span className="truncate">{item.label}</span>
                            {item.badge ? (
                              <Badge className="ml-auto">{item.badge}</Badge>
                            ) : null}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
      </nav>

      <div className="space-y-2 border-t border-black/5 p-2 dark:border-white/10">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setNotificationOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </button>
          <button
            type="button"
            onClick={toggleSidebar}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Collapse sidebar"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <Link
          href={`${roleHomePath(role)}/profile`}
          className={cn(
            "flex items-center gap-2.5 rounded-[12px] bg-black/[0.03] p-2 transition hover:bg-black/[0.06] dark:bg-white/[0.05] dark:hover:bg-white/[0.08]",
            collapsed && "justify-center"
          )}
        >
          <AvatarBubble seed={user.email || user.id || user.name} size={32} />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold leading-tight">
                {user.name}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                {pronouns ? `${pronouns} · ${user.title}` : user.title}
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
