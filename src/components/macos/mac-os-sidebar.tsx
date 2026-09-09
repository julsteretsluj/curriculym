"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Bell,
  BookMarked,
  BookOpen,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  DoorOpen,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  School,
  ShieldAlert,
  Trophy,
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
  | "profile";

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
};

interface NavDef {
  href: string;
  label: string;
  icon: IconKey;
  badge?: number;
  roles: AppRole[];
}

const NAV: NavDef[] = [
  // Admin
  { href: "/admin", label: "Overview", icon: "dashboard", roles: ["admin"] },
  { href: "/admin/health", label: "Feature check", icon: "dashboard", roles: ["admin"] },
  { href: "/admin/classes", label: "Classes", icon: "classes", roles: ["admin"] },
  { href: "/admin/courses", label: "Course Catalog", icon: "gradebook", roles: ["admin"] },
  { href: "/admin/ecas", label: "ECAs", icon: "ecas", roles: ["admin"] },
  { href: "/admin/library", label: "Online Library", icon: "library", roles: ["admin"] },
  { href: "/admin/chat", label: "Chat", icon: "chat", roles: ["admin"] },
  { href: "/admin/news", label: "Daily News", icon: "news", roles: ["admin"] },
  { href: "/admin/newsletters", label: "Newsletters", icon: "news", roles: ["admin"] },
  { href: "/admin/meetings", label: "Meeting Booking", icon: "meetings", roles: ["admin"] },
  { href: "/admin/rooms", label: "Room Booking", icon: "rooms", roles: ["admin"] },
  { href: "/admin/notifications", label: "Notifications", icon: "notifications", badge: 2, roles: ["admin"] },
  { href: "/admin/directory", label: "Directory", icon: "directory", roles: ["admin"] },
  { href: "/admin/school", label: "School Setup", icon: "school", roles: ["admin"] },
  { href: "/admin/safeguarding", label: "Safeguarding", icon: "safeguarding", badge: 2, roles: ["admin"] },
  { href: "/admin/profile", label: "Profile", icon: "profile", roles: ["admin"] },

  // Staff
  { href: "/staff", label: "Overview", icon: "dashboard", roles: ["staff"] },
  { href: "/staff/classes", label: "Classes", icon: "classes", roles: ["staff"] },
  { href: "/staff/directory", label: "Directory", icon: "directory", roles: ["staff"] },
  { href: "/staff/timetable", label: "Schedules", icon: "timetable", roles: ["staff"] },
  { href: "/staff/assignments", label: "Homework", icon: "assignments", roles: ["staff"] },
  { href: "/staff/gradebook", label: "Grades", icon: "gradebook", roles: ["staff"] },
  { href: "/staff/ecas", label: "ECAs", icon: "ecas", roles: ["staff"] },
  { href: "/staff/library", label: "Online Library", icon: "library", roles: ["staff"] },
  { href: "/staff/chat", label: "Chat", icon: "chat", roles: ["staff"] },
  { href: "/staff/news", label: "Daily News", icon: "news", roles: ["staff"] },
  { href: "/staff/meetings", label: "Meeting Booking", icon: "meetings", roles: ["staff"] },
  { href: "/staff/rooms", label: "Room Booking", icon: "rooms", roles: ["staff"] },
  { href: "/staff/notifications", label: "Notifications", icon: "notifications", badge: 2, roles: ["staff"] },
  { href: "/staff/courses", label: "Courses", icon: "classes", roles: ["staff"] },
  { href: "/staff/profile", label: "Profile", icon: "profile", roles: ["staff"] },

  // Student
  { href: "/student", label: "Home", icon: "dashboard", roles: ["student"] },
  { href: "/student/classes", label: "Classes", icon: "classes", roles: ["student"] },
  { href: "/student/timetable", label: "Schedules", icon: "timetable", roles: ["student"] },
  { href: "/student/assignments", label: "Homework", icon: "assignments", badge: 3, roles: ["student"] },
  { href: "/student/grades", label: "Grades", icon: "gradebook", roles: ["student"] },
  { href: "/student/ecas", label: "ECAs", icon: "ecas", roles: ["student"] },
  { href: "/student/library", label: "Online Library", icon: "library", roles: ["student"] },
  { href: "/student/chat", label: "Chat", icon: "chat", badge: 5, roles: ["student"] },
  { href: "/student/news", label: "Daily News", icon: "news", roles: ["student"] },
  { href: "/student/notifications", label: "Notifications", icon: "notifications", badge: 2, roles: ["student"] },
  { href: "/student/profile", label: "Profile", icon: "profile", roles: ["student"] },

  // Parent
  { href: "/parent", label: "Family Hub", icon: "dashboard", roles: ["parent"] },
  { href: "/parent/classes", label: "Classes", icon: "classes", roles: ["parent"] },
  { href: "/parent/timetable", label: "Schedules", icon: "timetable", roles: ["parent"] },
  { href: "/parent/homework", label: "Homework", icon: "assignments", roles: ["parent"] },
  { href: "/parent/grades", label: "Grades", icon: "gradebook", roles: ["parent"] },
  { href: "/parent/ecas", label: "ECAs", icon: "ecas", roles: ["parent"] },
  { href: "/parent/library", label: "Online Library", icon: "library", roles: ["parent"] },
  { href: "/parent/chat", label: "Chat", icon: "chat", roles: ["parent"] },
  { href: "/parent/news", label: "Daily News", icon: "news", roles: ["parent"] },
  { href: "/parent/meetings", label: "Meeting Booking", icon: "meetings", roles: ["parent"] },
  { href: "/parent/notifications", label: "Notifications", icon: "notifications", badge: 2, roles: ["parent"] },
  { href: "/parent/reports", label: "Reports", icon: "gradebook", roles: ["parent"] },
  { href: "/parent/profile", label: "Profile", icon: "profile", roles: ["parent"] },

  // Support / CPO
  { href: "/support", label: "Safeguarding Desk", icon: "safeguarding", badge: 2, roles: ["support"] },
  { href: "/support/directory", label: "Student Directory", icon: "directory", roles: ["support"] },
  { href: "/support/rooms", label: "Room Booking", icon: "rooms", roles: ["support"] },
  { href: "/support/news", label: "Daily News", icon: "news", roles: ["support"] },
  { href: "/support/notifications", label: "Notifications", icon: "notifications", badge: 2, roles: ["support"] },
  { href: "/support/profile", label: "Profile", icon: "profile", roles: ["support"] },
];

export function MacOsSidebar() {
  const pathname = usePathname();
  const role = useAppStore((s) => s.role);
  const user = useAppStore(
    useShallow((s) => {
      const u = s.currentUser();
      return {
        name: u.name,
        title: u.title,
        avatarInitials: u.avatarInitials,
      };
    })
  );
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const unread = useAppStore((s) => s.notifications.length);
  const setNotificationOpen = useAppStore((s) => s.setNotificationOpen);
  const { theme, setTheme } = useTheme();

  const items = NAV.filter((n) => n.roles.includes(role));

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

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-3">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const active =
            item.href === `/${role}` ||
            item.href === "/support" ||
            item.href === "/admin" ||
            item.href === "/staff" ||
            item.href === "/student" ||
            item.href === "/parent"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge ? (
                <Badge className="ml-auto">{item.badge}</Badge>
              ) : null}
            </Link>
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
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
            {user.avatarInitials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold leading-tight">
                {user.name}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                {user.title}
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
