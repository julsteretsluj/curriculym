import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { DashboardShell } from "@/components/macos/dashboard-shell";
import {
  pathRole,
  resolveAccountAccess,
  roleHomePath,
} from "@/lib/clerk-roles";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    "";

  const access = resolveAccountAccess({
    email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    fullName: user?.fullName,
    metadata: user?.publicMetadata,
  });

  const pathname = (await headers()).get("x-pathname") ?? "";
  const routeRole = pathRole(pathname);

  if (routeRole && !access.allowedRoles.includes(routeRole)) {
    redirect(roleHomePath(access.primaryRole));
  }

  return <DashboardShell access={access}>{children}</DashboardShell>;
}
