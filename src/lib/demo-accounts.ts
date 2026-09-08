import type { AppRole } from "@/lib/demo-data";

/** Public demo account labels (safe for client bundles). */
export const DEMO_ACCOUNT_DIRECTORY: Array<{
  email: string;
  role: AppRole;
  name: string;
}> = [
  { email: "admin@harbor.edu", role: "admin", name: "Maya Chen" },
  { email: "staff@harbor.edu", role: "staff", name: "James Okonkwo" },
  { email: "student@harbor.edu", role: "student", name: "Aria Patel" },
  { email: "parent@harbor.edu", role: "parent", name: "Sam Rivera" },
  { email: "cpo@harbor.edu", role: "support", name: "Dr. Elena Vargas" },
];
