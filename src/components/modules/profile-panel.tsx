"use client";

import { Mail, School, Shield, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/stores/app-store";
import { useShallow } from "zustand/react/shallow";

export function ProfilePanel() {
  const user = useAppStore(
    useShallow((s) => {
      const u = s.currentUser();
      return {
        name: u.name,
        email: u.email,
        title: u.title,
        role: u.role,
        schoolName: u.schoolName,
        avatarInitials: u.avatarInitials,
      };
    })
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your Curriculym account and school identity.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            {user.avatarInitials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight">{user.name}</h2>
              <Badge className="capitalize">{user.role === "support" ? "CPO" : user.role}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{user.title}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="h-4 w-4 text-primary" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>{user.email}</p>
            <CardDescription>Verified via Clerk</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <School className="h-4 w-4 text-primary" />
              School
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>{user.schoolName}</p>
            <CardDescription>Primary campus tenant</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserRound className="h-4 w-4 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Theme follows system. Notification digests at 07:30 and 16:00.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-primary" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Safeguarding notes stay encrypted and role-gated to CPO / designated leads.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
