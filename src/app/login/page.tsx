import { redirect } from "next/navigation";

/** Legacy demo login URL — Clerk owns auth now. */
export default function LoginRedirectPage() {
  redirect("/sign-in");
}
