import { auth } from "@clerk/nextjs/server";
import type { AppRole } from "@/lib/demo-data";

export function roleHomePath(role: AppRole) {
  if (role === "support") return "/support";
  return `/${role}`;
}

const VALID_ROLES: AppRole[] = ["admin", "staff", "student", "parent", "support"];

/** Resolve Curriculym RBAC role from Clerk public metadata (or safe default). */
export function roleFromMetadata(metadata: unknown): AppRole {
  if (metadata && typeof metadata === "object" && "role" in metadata) {
    const role = String((metadata as { role?: unknown }).role).toLowerCase();
    if (VALID_ROLES.includes(role as AppRole)) return role as AppRole;
  }
  return "admin";
}

export async function requireAppSession() {
  const session = await auth();
  if (!session.userId) {
    return null;
  }
  return session;
}
