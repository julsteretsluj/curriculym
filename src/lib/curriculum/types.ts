export type CurriculumCode =
  | "IB_PYP"
  | "IB_MYP"
  | "IB_DP"
  | "IB_CP"
  | "AP"
  | "A_LEVEL"
  | "AS_LEVEL"
  | "IGCSE"
  | "GCSE"
  | "CAMBRIDGE_PRIMARY"
  | "CAMBRIDGE_LOWER_SECONDARY"
  | "NATIONAL"
  | "EARLY_YEARS";

export interface CurriculumMeta {
  code: CurriculumCode;
  name: string;
  shortName: string;
  board: string;
  ages: string;
  grades: string;
  description: string;
}

export interface CatalogCourse {
  id: string;
  curriculum: CurriculumCode;
  code: string;
  name: string;
  groupName: string;
  levels?: string[];
  description?: string;
  ages?: string;
  grades?: string;
}

export const CURRICULUM_META: CurriculumMeta[] = [
  {
    code: "IB_PYP",
    name: "IB Primary Years Programme",
    shortName: "PYP",
    board: "International Baccalaureate",
    ages: "3–12",
    grades: "Pre-K–G5",
    description: "Inquiry-based primary framework with transdisciplinary themes and subject areas.",
  },
  {
    code: "IB_MYP",
    name: "IB Middle Years Programme",
    shortName: "MYP",
    board: "International Baccalaureate",
    ages: "11–16",
    grades: "G6–G10",
    description: "Eight subject groups plus Personal Project and Service as Action.",
  },
  {
    code: "IB_DP",
    name: "IB Diploma Programme",
    shortName: "DP",
    board: "International Baccalaureate",
    ages: "16–19",
    grades: "G11–G12",
    description: "Six subject groups with TOK, Extended Essay, and CAS core.",
  },
  {
    code: "IB_CP",
    name: "IB Career-related Programme",
    shortName: "CP",
    board: "International Baccalaureate",
    ages: "16–19",
    grades: "G11–G12",
    description: "Career-related study plus DP courses and CP core (PPS, Language Development, Service Learning, Reflective Project).",
  },
  {
    code: "AP",
    name: "Advanced Placement",
    shortName: "AP",
    board: "College Board",
    ages: "15–19",
    grades: "G9–G12",
    description: "College-level modular courses and exams; students choose any combination.",
  },
  {
    code: "AS_LEVEL",
    name: "Cambridge International AS Level",
    shortName: "AS Level",
    board: "Cambridge International",
    ages: "16–17",
    grades: "G11",
    description: "First half of the A Level pathway; can stand alone or lead to full A Level.",
  },
  {
    code: "A_LEVEL",
    name: "Cambridge International A Level",
    shortName: "A Level",
    board: "Cambridge International",
    ages: "16–19",
    grades: "G11–G12",
    description: "Specialist depth in typically 3–4 subjects for university entry.",
  },
  {
    code: "IGCSE",
    name: "Cambridge IGCSE",
    shortName: "IGCSE",
    board: "Cambridge International",
    ages: "14–16",
    grades: "G9–G10",
    description: "International secondary qualifications across 70+ subjects and five ICE groups.",
  },
  {
    code: "GCSE",
    name: "GCSE (UK)",
    shortName: "GCSE",
    board: "AQA / Edexcel / OCR / WJEC",
    ages: "14–16",
    grades: "Y10–Y11",
    description: "UK Key Stage 4 qualifications (9–1 grading) across core and optional subjects.",
  },
  {
    code: "CAMBRIDGE_PRIMARY",
    name: "Cambridge Primary",
    shortName: "Primary",
    board: "Cambridge International",
    ages: "5–11",
    grades: "Stages 1–6",
    description: "Primary curriculum pathway feeding into Cambridge Lower Secondary.",
  },
  {
    code: "CAMBRIDGE_LOWER_SECONDARY",
    name: "Cambridge Lower Secondary",
    shortName: "Lower Sec",
    board: "Cambridge International",
    ages: "11–14",
    grades: "Stages 7–9",
    description: "Lower secondary pathway preparing for IGCSE.",
  },
  {
    code: "EARLY_YEARS",
    name: "Early Years",
    shortName: "EY",
    board: "School / National",
    ages: "2–5",
    grades: "Nursery–Reception",
    description: "Play-based early childhood areas of learning.",
  },
  {
    code: "NATIONAL",
    name: "National / Local Curriculum",
    shortName: "National",
    board: "Ministry / State",
    ages: "5–18",
    grades: "Varies",
    description: "Placeholder pathway for country-specific national curricula.",
  },
];

export function course(
  curriculum: CurriculumCode,
  code: string,
  name: string,
  groupName: string,
  opts?: Partial<Pick<CatalogCourse, "levels" | "description" | "ages" | "grades">>
): CatalogCourse {
  return {
    id: `${curriculum.toLowerCase()}-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    curriculum,
    code,
    name,
    groupName,
    levels: opts?.levels,
    description: opts?.description,
    ages: opts?.ages,
    grades: opts?.grades,
  };
}
