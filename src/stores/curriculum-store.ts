"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ALL_CATALOG_COURSES, CurriculumCode } from "@/lib/curriculum";

/** Default: enable IB continuum + a sample of AP / IGCSE for Harbor demo. */
function defaultEnabledIds(): string[] {
  const preferred: CurriculumCode[] = ["IB_PYP", "IB_MYP", "IB_DP", "IB_CP"];
  const ids = ALL_CATALOG_COURSES.filter((c) => preferred.includes(c.curriculum)).map(
    (c) => c.id
  );
  // Sample AP + IGCSE offerings
  const samples = [
    "ap-calc-ab",
    "ap-bio",
    "ap-eng-lang",
    "ap-csa",
    "igcse-0580",
    "igcse-0610",
    "igcse-0620",
    "igcse-0625",
    "igcse-0500",
    "a_level-9700",
    "a_level-9701",
    "a_level-9702",
    "a_level-9709",
  ];
  for (const id of samples) {
    if (ALL_CATALOG_COURSES.some((c) => c.id === id)) ids.push(id);
  }
  return Array.from(new Set(ids));
}

interface CurriculumStore {
  enabledCourseIds: string[];
  activeCurricula: CurriculumCode[];
  toggleCourse: (id: string) => void;
  setCurriculumActive: (code: CurriculumCode, active: boolean) => void;
  enableAllInCurriculum: (code: CurriculumCode) => void;
  disableAllInCurriculum: (code: CurriculumCode) => void;
  isCourseEnabled: (id: string) => boolean;
}

export const useCurriculumStore = create<CurriculumStore>()(
  persist(
    (set, get) => ({
      enabledCourseIds: defaultEnabledIds(),
      activeCurricula: ["IB_PYP", "IB_MYP", "IB_DP", "IB_CP", "AP", "IGCSE", "A_LEVEL"],
      toggleCourse: (id) =>
        set((s) => ({
          enabledCourseIds: s.enabledCourseIds.includes(id)
            ? s.enabledCourseIds.filter((x) => x !== id)
            : [...s.enabledCourseIds, id],
        })),
      setCurriculumActive: (code, active) =>
        set((s) => ({
          activeCurricula: active
            ? Array.from(new Set([...s.activeCurricula, code]))
            : s.activeCurricula.filter((c) => c !== code),
        })),
      enableAllInCurriculum: (code) =>
        set((s) => {
          const ids = ALL_CATALOG_COURSES.filter((c) => c.curriculum === code).map(
            (c) => c.id
          );
          return {
            enabledCourseIds: Array.from(new Set([...s.enabledCourseIds, ...ids])),
            activeCurricula: Array.from(new Set([...s.activeCurricula, code])),
          };
        }),
      disableAllInCurriculum: (code) =>
        set((s) => ({
          enabledCourseIds: s.enabledCourseIds.filter((id) => {
            const course = ALL_CATALOG_COURSES.find((c) => c.id === id);
            return course?.curriculum !== code;
          }),
        })),
      isCourseEnabled: (id) => get().enabledCourseIds.includes(id),
    }),
    { name: "curriculym-courses" }
  )
);
