"use client";

import { Heart, Mail, School, Shield, Trophy, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CLUB_SPORT_OPTIONS,
  INTEREST_OPTIONS,
  PRONOUN_OPTIONS,
  useAppStore,
  type PronounOption,
} from "@/stores/app-store";
import { useShallow } from "zustand/react/shallow";
import { AvatarBubble } from "@/components/ui/avatar-emoji";
import { cn } from "@/lib/utils";

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
        id: u.id,
      };
    })
  );

  const displayName = useAppStore((s) => s.profileDisplayName);
  const pronouns = useAppStore((s) => s.profilePronouns);
  const interests = useAppStore((s) => s.profileInterests);
  const clubsSports = useAppStore((s) => s.profileClubsSports);
  const setProfileDisplayName = useAppStore((s) => s.setProfileDisplayName);
  const setProfilePronouns = useAppStore((s) => s.setProfilePronouns);
  const toggleProfileInterest = useAppStore((s) => s.toggleProfileInterest);
  const toggleProfileClubSport = useAppStore((s) => s.toggleProfileClubSport);
  const pushNotification = useAppStore((s) => s.pushNotification);

  const nameValue = displayName || user.name;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Name, pronouns, interests, and clubs for your Harbor identity.
          </p>
        </div>
        <Button
          className="rounded-full"
          onClick={() =>
            pushNotification({
              title: "Profile saved",
              body: "Your name, pronouns, interests, and clubs were updated.",
              kind: "success",
            })
          }
        >
          Save profile
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <AvatarBubble seed={user.email || user.id || nameValue} size={64} title={nameValue} />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight">{nameValue}</h2>
              {pronouns ? (
                <Badge className="bg-muted text-muted-foreground">{pronouns}</Badge>
              ) : null}
              <Badge className="capitalize">{user.role === "support" ? "CPO" : user.role}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.title}</p>
            {(interests.length > 0 || clubsSports.length > 0) && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {interests.slice(0, 4).map((i) => (
                  <Badge key={i} className="bg-primary/10 text-primary">
                    {i}
                  </Badge>
                ))}
                {clubsSports.slice(0, 3).map((c) => (
                  <Badge key={c} className="bg-muted text-muted-foreground">
                    {c}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserRound className="h-4 w-4 text-primary" />
              Name
            </CardTitle>
            <CardDescription>How you appear across Curriculym</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              value={nameValue}
              onChange={(e) => setProfileDisplayName(e.target.value)}
              className="h-10 w-full rounded-xl border border-black/10 bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
              placeholder="Display name"
              autoComplete="name"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserRound className="h-4 w-4 text-primary" />
              Pronouns
            </CardTitle>
            <CardDescription>Optional · shown on your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {PRONOUN_OPTIONS.map((option) => {
                const selected = pronouns === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setProfilePronouns(selected ? "" : (option as PronounOption))
                    }
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition",
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="h-4 w-4 text-primary" />
            Interests
          </CardTitle>
          <CardDescription>Pick from the school interest list</CardDescription>
        </CardHeader>
        <CardContent>
          <ChipGrid
            options={INTEREST_OPTIONS}
            selected={interests}
            onToggle={toggleProfileInterest}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-4 w-4 text-primary" />
            Clubs & sports
          </CardTitle>
          <CardDescription>Teams and co-curriculars you take part in</CardDescription>
        </CardHeader>
        <CardContent>
          <ChipGrid
            options={CLUB_SPORT_OPTIONS}
            selected={clubsSports}
            onToggle={toggleProfileClubSport}
          />
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
              <Shield className="h-4 w-4 text-primary" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Pronouns and interests are visible to staff. Safeguarding notes stay role-gated.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChipGrid({
  options,
  selected,
  onToggle,
}: {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const on = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition",
              on
                ? "bg-primary text-primary-foreground"
                : "border border-black/10 bg-white text-muted-foreground hover:border-primary/40 dark:border-white/10 dark:bg-[#2C2C2E]"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
