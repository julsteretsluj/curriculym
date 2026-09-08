# Curriculym

Multi-tenant all-in-one school management system (SMS/LMS) with a **macOS desktop** UI — timetable, assignments, chat, safeguarding, parent meetings, gradebooks, and room bookings in one window.

## Stack

- Next.js App Router · React 19 · Tailwind CSS 4
- Prisma · PostgreSQL (multi-tenant `tenantId` on all school data)
- Framer Motion · Lucide · next-themes
- Demo RBAC via in-app role switcher (Clerk/Supabase ready)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to the Admin dashboard inside the macOS window shell.

Use the top-bar segmented control to switch **Admin / Staff / Student / Parent / CPO**. On Student, toggle **Early Years** vs **G3–12**.

### Database (optional for UI demo)

```bash
# Configure DATABASE_URL in .env
cp .env.example .env
npm run db:generate
npm run db:push
```

## App routes

| Area | Path |
|------|------|
| Admin | `/admin/*` |
| Staff | `/staff/*` |
| Student | `/student/*` |
| Parent | `/parent/*` |
| Support / CPO | `/support/*` |

## Security notes

- Every Prisma model that holds school data includes `tenantId` — use `tenantWhere()` from `src/lib/prisma.ts`.
- Safeguarding UI and helpers restrict access to admin/CPO (`canAccessSafeguarding`). Do not expose `SafeguardingLog` payloads to students, parents, or standard teachers.
