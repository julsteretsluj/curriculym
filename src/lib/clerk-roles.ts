import type { AppRole } from "@/lib/demo-data";

export const ALL_APP_ROLES: AppRole[] = [
  "admin",
  "staff",
  "student",
  "parent",
  "support",
];

/** Accounts that can switch into every workspace view. */
export const SUPERUSER_EMAILS = new Set(["juleskittoastrop@gmail.com"]);

export function roleHomePath(role: AppRole) {
  if (role === "support") return "/support";
  return `/${role}`;
}

export function pathRole(pathname: string): AppRole | null {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "admin";
  if (pathname === "/staff" || pathname.startsWith("/staff/")) return "staff";
  if (pathname === "/student" || pathname.startsWith("/student/")) return "student";
  if (pathname === "/parent" || pathname.startsWith("/parent/")) return "parent";
  if (pathname === "/support" || pathname.startsWith("/support/")) return "support";
  return null;
}

function normalizeRole(value: unknown): AppRole | null {
  if (typeof value !== "string") return null;
  const role = value.toLowerCase() as AppRole;
  return ALL_APP_ROLES.includes(role) ? role : null;
}

function rolesFromMetadata(metadata: unknown): AppRole[] {
  if (!metadata || typeof metadata !== "object") return [];

  const meta = metadata as {
    role?: unknown;
    roles?: unknown;
    views?: unknown;
  };

  const found = new Set<AppRole>();

  const primary = normalizeRole(meta.role);
  if (primary) found.add(primary);

  const list = meta.roles ?? meta.views;
  if (Array.isArray(list)) {
    for (const item of list) {
      const role = normalizeRole(item);
      if (role) found.add(role);
    }
  }

  return Array.from(found);
}

export type AccountAccess = {
  email: string;
  name: string;
  /** Default / home role for redirects */
  primaryRole: AppRole;
  /** Views this account may open */
  allowedRoles: AppRole[];
  canAccessAll: boolean;
};

export function resolveAccountAccess(opts: {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  metadata?: unknown;
}): AccountAccess {
  const email = (opts.email ?? "").trim().toLowerCase();
  const name =
    opts.fullName?.trim() ||
    [opts.firstName, opts.lastName].filter(Boolean).join(" ").trim() ||
    email ||
    "Curriculym user";

  const canAccessAll = SUPERUSER_EMAILS.has(email);

  if (canAccessAll) {
    return {
      email,
      name,
      primaryRole: "admin",
      allowedRoles: [...ALL_APP_ROLES],
      canAccessAll: true,
    };
  }

  const fromMeta = rolesFromMetadata(opts.metadata);
  const allowedRoles = fromMeta.length > 0 ? fromMeta : (["admin"] as AppRole[]);
  const primaryRole = allowedRoles[0] ?? "admin";

  return {
    email,
    name,
    primaryRole,
    allowedRoles,
    canAccessAll: false,
  };
}

/** @deprecated use resolveAccountAccess().primaryRole */
export function roleFromMetadata(metadata: unknown): AppRole {
  return resolveAccountAccess({ metadata }).primaryRole;
}
