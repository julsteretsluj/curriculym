import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LandingNav, ProductWindowPreview } from "@/components/landing/landing-chrome";
import { BrandMark } from "@/components/brand-mark";
import { roleFromMetadata, roleHomePath } from "@/lib/clerk-roles";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) {
    const user = await currentUser();
    redirect(roleHomePath(roleFromMetadata(user?.publicMetadata)));
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1D1D1F]">
      <LandingNav />

      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,122,255,0.14), transparent 55%), linear-gradient(180deg, #E8EEF8 0%, #F2F2F7 48%, #F2F2F7 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <BrandMark
              href={null}
              size={56}
              variant="wordmark"
              priority
              className="mx-auto"
            />
            <h1 className="mt-6 text-[34px] font-semibold leading-[1.05] tracking-tight text-[#1D1D1F] md:text-[48px]">
              One school system.
              <br />
              Every curriculum.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#6E6E73]">
              Timetable, assignments, gradebooks, parent meetings, safeguarding, and 350+ courses
              from IB to A Level — in a calm macOS workspace.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/sign-in"
                className="rounded-full bg-[#007AFF] px-6 py-3 text-[15px] font-medium text-white transition hover:bg-[#0077ED]"
              >
                Sign in to your school
              </Link>
              <a
                href="#product"
                className="rounded-full border border-[rgba(60,60,67,0.18)] bg-white/70 px-6 py-3 text-[15px] font-medium text-[#1D1D1F] backdrop-blur-sm transition hover:bg-white"
              >
                See the workspace
              </a>
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <ProductWindowPreview />
          </div>
        </div>
      </section>

      <section id="product" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <h2 className="text-[28px] font-semibold tracking-tight md:text-[34px]">
              Built like a desktop app for schools
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-[#6E6E73]">
              Frosted sidebars, notification center, and role-aware views for leadership, teachers,
              students, parents, and safeguarding teams.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="md:pt-8">
              <h3 className="text-[21px] font-semibold tracking-tight">Replace the patchwork</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6E6E73]">
                Unify what schools usually split across iSAMS, ManageBac, and Google Classroom —
                attendance to unit planning, rooms to report cards.
              </p>
            </div>
            <div className="rounded-[20px] border border-black/5 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:p-8">
              <ul className="space-y-4 text-[15px]">
                {[
                  "Academic hub with criterion gradebooks",
                  "Parent–teacher booking calendar",
                  "Encrypted safeguarding desk for CPOs",
                  "Room & resource timeline",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="curricula" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="md:ml-auto md:max-w-xl md:text-right">
            <h2 className="text-[28px] font-semibold tracking-tight md:text-[34px]">
              Curricula the school actually teaches
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-[#6E6E73]">
              Enable PYP, MYP, DP, CP, AP, IGCSE, GCSE, AS & A Level — then turn courses on per campus.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-2 md:justify-end">
            {[
              "PYP",
              "MYP",
              "DP",
              "CP",
              "AP",
              "IGCSE",
              "GCSE",
              "AS Level",
              "A Level",
              "Cambridge Primary",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/5 bg-white px-4 py-2 text-[13px] font-medium text-[#1D1D1F] shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-black/5 bg-white px-8 py-14 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:px-16">
          <h2 className="text-[28px] font-semibold tracking-tight md:text-[34px]">
            Ready for your school day?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-[#6E6E73]">
            Create a free account or sign in to open the Curriculym workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="inline-flex rounded-full bg-[#007AFF] px-6 py-3 text-[15px] font-medium text-white transition hover:bg-[#0077ED]"
            >
              Create account
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex rounded-full border border-[rgba(60,60,67,0.18)] bg-white px-6 py-3 text-[15px] font-medium transition hover:bg-[#F2F2F7]"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-[13px] text-[#6E6E73]">
          <div className="flex items-center gap-2 font-medium text-[#1D1D1F]">
            <BrandMark href={null} size={22} variant="wordmark" />
          </div>
          <p>Multi-tenant school management · Secured with Clerk</p>
        </div>
      </footer>
    </div>
  );
}
