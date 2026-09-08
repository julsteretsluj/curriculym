import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { DashboardShell } from "@/components/macos/dashboard-shell";
import { roleFromMetadata } from "@/lib/clerk-roles";

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
  const role = roleFromMetadata(user?.publicMetadata);

  return <DashboardShell role={role}>{children}</DashboardShell>;
}
