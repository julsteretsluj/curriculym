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

Open [http://localhost:3000](http://localhost:3000) for the public landing page. The school workspace requires sign-in at `/login`.

**Demo password:** `curriculym`  
Accounts: `admin@harbor.edu`, `staff@harbor.edu`, `student@harbor.edu`, `parent@harbor.edu`, `cpo@harbor.edu`

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

## Course catalog

Curriculym ships a built-in catalog of **300+ courses** across:

- IB PYP, MYP, DP, CP
- College Board AP
- Cambridge Primary, Lower Secondary, IGCSE, AS & A Level
- UK GCSE
- Early Years & National placeholders

Browse and enable offerings at `/admin/courses`. Persist to Postgres with:

```bash
npm run db:push
npm run db:seed:catalog
```


- Every Prisma model that holds school data includes `tenantId` — use `tenantWhere()` from `src/lib/prisma.ts`.
- Safeguarding UI and helpers restrict access to admin/CPO (`canAccessSafeguarding`). Do not expose `SafeguardingLog` payloads to students, parents, or standard teachers.
