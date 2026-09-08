import { AP_COURSES } from "./ap";
import {
  A_LEVEL_COURSES,
  AS_LEVEL_COURSES,
  CAMBRIDGE_LOWER_SECONDARY_COURSES,
  CAMBRIDGE_PRIMARY_COURSES,
  IGCSE_COURSES,
} from "./cambridge";
import { CP_COURSES, DP_COURSES, MYP_COURSES, PYP_COURSES } from "./ib";
import {
  EARLY_YEARS_COURSES,
  GCSE_COURSES,
  NATIONAL_COURSES,
} from "./national-gcse";
import {
  CatalogCourse,
  CURRICULUM_META,
  CurriculumCode,
  CurriculumMeta,
} from "./types";

export * from "./types";

export const ALL_CATALOG_COURSES: CatalogCourse[] = [
  ...PYP_COURSES,
  ...MYP_COURSES,
  ...DP_COURSES,
  ...CP_COURSES,
  ...AP_COURSES,
  ...CAMBRIDGE_PRIMARY_COURSES,
  ...CAMBRIDGE_LOWER_SECONDARY_COURSES,
  ...IGCSE_COURSES,
  ...AS_LEVEL_COURSES,
  ...A_LEVEL_COURSES,
  ...GCSE_COURSES,
  ...EARLY_YEARS_COURSES,
  ...NATIONAL_COURSES,
];

export function getCurriculumMeta(code: CurriculumCode): CurriculumMeta | undefined {
  return CURRICULUM_META.find((c) => c.code === code);
}

export function getCoursesByCurriculum(code: CurriculumCode): CatalogCourse[] {
  return ALL_CATALOG_COURSES.filter((c) => c.curriculum === code);
}

export function getCourseGroups(code: CurriculumCode): string[] {
  const groups = new Set(getCoursesByCurriculum(code).map((c) => c.groupName));
  return Array.from(groups);
}

export function searchCourses(query: string, curriculum?: CurriculumCode): CatalogCourse[] {
  const q = query.trim().toLowerCase();
  const pool = curriculum ? getCoursesByCurriculum(curriculum) : ALL_CATALOG_COURSES;
  if (!q) return pool;
  return pool.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.groupName.toLowerCase().includes(q)
  );
}

export function catalogStats() {
  const byCurriculum = CURRICULUM_META.map((meta) => ({
    ...meta,
    courseCount: getCoursesByCurriculum(meta.code).length,
  }));
  return {
    totalCourses: ALL_CATALOG_COURSES.length,
    curricula: byCurriculum.length,
    byCurriculum,
  };
}
