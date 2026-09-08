export type AppRole =
  | "admin"
  | "staff"
  | "student"
  | "parent"
  | "support";

export type GradeBand = "early_years" | "upper";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  title: string;
  schoolName: string;
  avatarInitials: string;
  gradeBand?: GradeBand;
  gradeLevel?: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
  roles?: AppRole[];
}

export const DEMO_SCHOOL = "Harbor International School";

export const DEMO_USERS: Record<AppRole, DemoUser> = {
  admin: {
    id: "u-admin",
    name: "Maya Chen",
    email: "maya.chen@harbor.edu",
    role: "admin",
    title: "Head of School",
    schoolName: DEMO_SCHOOL,
    avatarInitials: "MC",
  },
  staff: {
    id: "u-staff",
    name: "James Okonkwo",
    email: "j.okonkwo@harbor.edu",
    role: "staff",
    title: "MYP Sciences",
    schoolName: DEMO_SCHOOL,
    avatarInitials: "JO",
  },
  student: {
    id: "u-student",
    name: "Aria Patel",
    email: "aria.patel@harbor.edu",
    role: "student",
    title: "Grade 8 Student",
    schoolName: DEMO_SCHOOL,
    avatarInitials: "AP",
    gradeBand: "upper",
    gradeLevel: "G8",
  },
  parent: {
    id: "u-parent",
    name: "Sam Rivera",
    email: "sam.rivera@email.com",
    role: "parent",
    title: "Parent / Guardian",
    schoolName: DEMO_SCHOOL,
    avatarInitials: "SR",
  },
  support: {
    id: "u-cpo",
    name: "Dr. Elena Vargas",
    email: "e.vargas@harbor.edu",
    role: "support",
    title: "Designated Safeguarding Lead",
    schoolName: DEMO_SCHOOL,
    avatarInitials: "EV",
  },
};

export const EARLY_YEARS_STUDENT: DemoUser = {
  id: "u-ey",
  name: "Leo Kim",
  email: "leo.kim@harbor.edu",
  role: "student",
  title: "Year 1",
  schoolName: DEMO_SCHOOL,
  avatarInitials: "LK",
  gradeBand: "early_years",
  gradeLevel: "Y1",
};

export function roleDashboardLabel(role: AppRole, gradeBand?: GradeBand) {
  if (role === "student" && gradeBand === "early_years") return "Early Years";
  const map: Record<AppRole, string> = {
    admin: "Admin Dashboard",
    staff: "Staff Dashboard",
    student: "Student Dashboard",
    parent: "Parent Dashboard",
    support: "Safeguarding Desk",
  };
  return map[role];
}
