import { auth, currentUser } from "@clerk/nextjs/server";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { resolveAccountAccess } from "@/lib/clerk-roles";
import type { AppRole } from "@/lib/demo-data";

const TENANT_SLUG = "harbor";

const APP_ROLE_TO_DB: Record<AppRole, Role> = {
  admin: "ADMIN",
  staff: "STAFF",
  student: "STUDENT",
  parent: "PARENT",
  support: "SUPPORT",
};

export async function ensureHarborTenant() {
  return prisma.tenant.upsert({
    where: { slug: TENANT_SLUG },
    update: {},
    create: {
      name: "Harbor International School",
      slug: TENANT_SLUG,
      timezone: "Asia/Phnom_Penh",
      curricula: ["IB_MYP", "IB_DP", "IGCSE", "EARLY_YEARS"],
    },
  });
}

/** Upsert the signed-in Clerk user into Postgres for chat (and future features). */
export async function ensureDbUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    "";

  const access = resolveAccountAccess({
    email,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    fullName: clerkUser.fullName,
    metadata: clerkUser.publicMetadata,
  });

  const tenant = await ensureHarborTenant();
  const dbRole = APP_ROLE_TO_DB[access.primaryRole];

  const firstName = clerkUser.firstName?.trim() || access.name.split(" ")[0] || "User";
  const lastName =
    clerkUser.lastName?.trim() ||
    access.name.split(" ").slice(1).join(" ") ||
    "";

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email: access.email || email,
      role: dbRole,
      isActive: true,
    },
    create: {
      tenantId: tenant.id,
      email: access.email || email || `${userId}@users.clerk`,
      clerkId: userId,
      role: dbRole,
      profile: {
        create: {
          tenantId: tenant.id,
          firstName,
          lastName,
          displayName: access.name,
        },
      },
    },
    include: { profile: true },
  });

  if (!user.profile) {
    await prisma.profile.create({
      data: {
        tenantId: tenant.id,
        userId: user.id,
        firstName,
        lastName,
        displayName: access.name,
      },
    });
  }

  return prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    include: { profile: true },
  });
}
