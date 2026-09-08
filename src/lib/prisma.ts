import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Multi-tenant guard — every query must scope by tenantId.
 * Pass the authenticated user's tenant into helpers below.
 */
export function tenantWhere(tenantId: string) {
  return { tenantId } as const;
}

export function assertTenantMatch(recordTenantId: string, currentTenantId: string) {
  if (recordTenantId !== currentTenantId) {
    throw new Error("TENANT_ISOLATION_VIOLATION");
  }
}

/** Roles permitted to read/write safeguarding logs */
export const SAFEGUARDING_ROLES = ["ADMIN", "LEADERSHIP", "COUNSELOR", "CPO"] as const;

export function canAccessSafeguarding(role: string) {
  return (SAFEGUARDING_ROLES as readonly string[]).includes(role);
}
