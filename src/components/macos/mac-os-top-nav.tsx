"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useAppStore } from "@/stores/app-store";
import type { AppRole } from "@/lib/demo-data";

const ROLE_OPTIONS: { value: AppRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Staff" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
  { value: "support", label: "CPO" },
];

interface MacOsTopNavProps {
  title: string;
}

export function MacOsTopNav({ title }: MacOsTopNavProps) {
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const studentBand = useAppStore((s) => s.studentBand);
  const setStudentBand = useAppStore((s) => s.setStudentBand);
  const router = useRouter();

  return (
    <header className="macos-glass sticky top-0 z-20 flex h-12 shrink-0 items-center gap-3 border-b border-black/5 px-4 dark:border-white/10">
      <div className="hidden items-center gap-1.5 md:flex lg:hidden">
        <span className="h-3 w-3 rounded-full bg-traffic-red" />
        <span className="h-3 w-3 rounded-full bg-traffic-yellow" />
        <span className="h-3 w-3 rounded-full bg-traffic-green" />
      </div>

      <p className="min-w-0 flex-1 truncate text-center text-[13px] font-medium text-muted-foreground md:text-left">
        {title}
      </p>

      <div className="hidden items-center gap-2 lg:flex">
        {role === "student" && (
          <SegmentedControl
            value={studentBand}
            onChange={(v) => setStudentBand(v as "early_years" | "upper")}
            options={[
              { value: "early_years", label: "Early Years" },
              { value: "upper", label: "G3–12" },
            ]}
          />
        )}
        <SegmentedControl
          value={role}
          onChange={(v) => {
            const next = v as AppRole;
            setRole(next);
            router.push(`/${next === "support" ? "support" : next}`);
          }}
          options={ROLE_OPTIONS}
        />
      </div>

      <label className="relative hidden sm:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search Curriculym"
          className="h-8 w-44 rounded-lg border border-black/5 bg-muted/60 pl-8 pr-3 text-xs outline-none backdrop-blur-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 dark:border-white/10"
        />
      </label>
    </header>
  );
}
