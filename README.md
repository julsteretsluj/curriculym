# Curriculym

Multi-tenant all-in-one school management system (SMS/LMS) with a **macOS desktop** UI — timetable, assignments, chat, safeguarding, parent meetings, gradebooks, and room bookings in one window.

## Stack

- Next.js App Router · React 19 · Tailwind CSS 4
- Prisma · PostgreSQL (multi-tenant `tenantId` on all school data)
- Framer Motion · Lucide · next-themes
- **Clerk** authentication (session + RBAC via `publicMetadata.role`)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up / sign in at `/sign-up` and `/sign-in`.

Auth keys are in `.env.local` from `npx clerk@latest init`. To claim the app under your Clerk account:

```bash
npx clerk@latest auth login
```

### Roles

Set a user’s **Public metadata** in the [Clerk Dashboard](https://dashboard.clerk.com/) to control the workspace role:

```json
{ "role": "admin" }
```

Allowed values: `admin` · `staff` · `student` · `parent` · `support`  
(Default if unset: `admin`.)

### Database (optional for UI demo)

```bash
cp .env.example .env
npm run db:generate
npm run db:push
```

## Deploy

Production URL: **https://curriculym.vercel.app**

GitHub `main` is connected to the Vercel project `curriculym`. Every push to `origin/main` deploys there automatically.

```bash
git push -u origin main
# or force a production redeploy:
vercel --prod
```


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
