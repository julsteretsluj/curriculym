import { SignJWT, jwtVerify } from "jose";
import type { AppRole } from "@/lib/demo-data";
import { DEMO_ACCOUNT_DIRECTORY } from "@/lib/demo-accounts";

export const SESSION_COOKIE = "curriculym_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionUser = {
  email: string;
  name: string;
  role: AppRole;
  schoolName: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET ?? "curriculym-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export function roleHomePath(role: AppRole) {
  if (role === "support") return "/support";
  return `/${role}`;
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
    schoolName: user.schoolName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.role !== "string" ||
      typeof payload.schoolName !== "string"
    ) {
      return null;
    }
    return {
      email: payload.email,
      name: payload.name,
      role: payload.role as AppRole,
      schoolName: payload.schoolName,
    };
  } catch {
    return null;
  }
}

/** Server-only credential check. Demo password is identical for Harbor accounts. */
export function authenticateDemo(email: string, password: string): SessionUser | null {
  const normalized = email.trim().toLowerCase();
  const account = DEMO_ACCOUNT_DIRECTORY.find((a) => a.email === normalized);
  if (!account || password !== "curriculym") return null;
  return {
    email: account.email,
    name: account.name,
    role: account.role,
    schoolName: "Harbor International School",
  };
}
