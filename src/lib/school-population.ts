/**
 * Deterministic fake population for Harbor International School.
 * Sized like a mid-size international K–12 campus.
 */

export const SCHOOL_POPULATION = {
  students: 1284,
  teachers: 142,
  parents: 968,
  leadership: 12,
} as const;

const FIRST = [
  "Aria", "Noah", "Mia", "Leo", "Sofia", "Ethan", "Amara", "Kai", "Elena", "Omar",
  "Priya", "Jonas", "Yuki", "Lina", "Mateo", "Anika", "Hugo", "Zara", "Felix", "Nina",
  "Samir", "Chloe", "Diego", "Hana", "Theo", "Isla", "Ravi", "Maya", "Luca", "Aisha",
  "Kenji", "Freya", "Andre", "Sienna", "Ibrahim", "Nora", "Jasper", "Leila", "Owen", "Mei",
  "Daniel", "Fatima", "Ryan", "Ines", "Adam", "Sara", "Ben", "Layla", "Max", "Ava",
];

const LAST = [
  "Patel", "Berg", "Santos", "Kim", "Chen", "Okonkwo", "Nakamura", "Rivera", "Hassan",
  "Novak", "Silva", "Nguyen", "Andersen", "Garcia", "Singh", "Kowalski", "Dubois", "Ali",
  "Johansson", "Martinez", "Wong", "Petrov", "Costa", "Murphy", "Tanaka", "Fernandez",
  "Brooks", "Ibrahim", "Larsson", "Park", "Rossi", "Khan", "Müller", "Oliveira", "Cho",
  "Ahmed", "Weber", "Lopez", "Sato", "Ivanova",
];

const HOUSES = ["Coral", "Jade", "Azure", "Amber"] as const;
const DEPARTMENTS = [
  "Sciences",
  "Mathematics",
  "English",
  "Individuals & Societies",
  "Languages",
  "Arts",
  "PE & Health",
  "Design",
  "Early Years",
  "Learning Support",
  "Library",
  "Counseling",
] as const;

const TEACHER_TITLES = [
  "Teacher",
  "Subject Lead",
  "Coordinator",
  "Head of Department",
  "Homeroom Tutor",
] as const;

/** Grade bands with realistic headcounts totaling SCHOOL_POPULATION.students */
const GRADE_TARGETS: { grade: string; band: "early_years" | "upper"; count: number }[] = [
  { grade: "EY1", band: "early_years", count: 48 },
  { grade: "EY2", band: "early_years", count: 52 },
  { grade: "Y1", band: "early_years", count: 64 },
  { grade: "Y2", band: "early_years", count: 68 },
  { grade: "G3", band: "upper", count: 92 },
  { grade: "G4", band: "upper", count: 96 },
  { grade: "G5", band: "upper", count: 98 },
  { grade: "G6", band: "upper", count: 104 },
  { grade: "G7", band: "upper", count: 108 },
  { grade: "G8", band: "upper", count: 112 },
  { grade: "G9", band: "upper", count: 118 },
  { grade: "G10", band: "upper", count: 116 },
  { grade: "G11", band: "upper", count: 106 },
  { grade: "G12", band: "upper", count: 102 },
];

function mulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length)]!;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

function emailFor(name: string, domain: string, i: number) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, ".");
  return `${slug}.${i}@${domain}`;
}

export type DemoStudent = {
  id: string;
  name: string;
  email: string;
  grade: string;
  band: "early_years" | "upper";
  house: (typeof HOUSES)[number];
  formGroup: string;
  avatarInitials: string;
  parentIds: string[];
};

export type DemoTeacher = {
  id: string;
  name: string;
  email: string;
  department: (typeof DEPARTMENTS)[number];
  title: string;
  avatarInitials: string;
};

export type DemoParent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  childIds: string[];
  avatarInitials: string;
};

function buildStudents(rand: () => number): DemoStudent[] {
  const students: DemoStudent[] = [];
  let n = 0;
  for (const target of GRADE_TARGETS) {
    for (let i = 0; i < target.count; i++) {
      n += 1;
      const name = `${pick(rand, FIRST)} ${pick(rand, LAST)}`;
      const formLetter = String.fromCharCode(65 + (i % 4)); // A–D
      students.push({
        id: `stu-${String(n).padStart(4, "0")}`,
        name,
        email: emailFor(name, "students.harbor.edu", n),
        grade: target.grade,
        band: target.band,
        house: pick(rand, HOUSES),
        formGroup: `${target.grade}${formLetter}`,
        avatarInitials: initials(name),
        parentIds: [],
      });
    }
  }
  return students;
}

function buildTeachers(rand: () => number): DemoTeacher[] {
  const teachers: DemoTeacher[] = [];
  for (let i = 1; i <= SCHOOL_POPULATION.teachers; i++) {
    const name = `${pick(rand, FIRST)} ${pick(rand, LAST)}`;
    const department = DEPARTMENTS[(i - 1) % DEPARTMENTS.length]!;
    const title =
      i <= 12
        ? "Head of Department"
        : i <= 36
          ? "Coordinator"
          : pick(rand, TEACHER_TITLES);
    teachers.push({
      id: `tch-${String(i).padStart(3, "0")}`,
      name,
      email: emailFor(name, "harbor.edu", i),
      department,
      title: `${title} · ${department}`,
      avatarInitials: initials(name),
    });
  }
  // Keep known demo faces at the front for continuity
  teachers[0] = {
    id: "tch-001",
    name: "James Okonkwo",
    email: "j.okonkwo@harbor.edu",
    department: "Sciences",
    title: "Teacher · MYP Sciences",
    avatarInitials: "JO",
  };
  teachers[1] = {
    id: "tch-002",
    name: "Priya Shah",
    email: "p.shah@harbor.edu",
    department: "Mathematics",
    title: "Coordinator · Mathematics",
    avatarInitials: "PS",
  };
  return teachers;
}

function buildParents(rand: () => number, students: DemoStudent[]): DemoParent[] {
  const parents: DemoParent[] = [];
  let p = 0;
  let s = 0;

  while (parents.length < SCHOOL_POPULATION.parents && s < students.length) {
    // ~35% of families have 2 children at the school
    const siblings = rand() < 0.35 && s + 1 < students.length ? 2 : 1;
    const childIds: string[] = [];
    for (let c = 0; c < siblings; c++) {
      childIds.push(students[s]!.id);
      s += 1;
    }

    // 1 or 2 guardians per family
    const guardians = rand() < 0.72 ? 2 : 1;
    const familyLast = pick(rand, LAST);
    for (let g = 0; g < guardians && parents.length < SCHOOL_POPULATION.parents; g++) {
      p += 1;
      const name = `${pick(rand, FIRST)} ${familyLast}`;
      const parent: DemoParent = {
        id: `par-${String(p).padStart(4, "0")}`,
        name,
        email: emailFor(name, "email.com", p),
        phone: `+66 8${Math.floor(10000000 + rand() * 89999999)}`,
        childIds: [...childIds],
        avatarInitials: initials(name),
      };
      parents.push(parent);
      for (const childId of childIds) {
        const child = students.find((st) => st.id === childId);
        if (child) child.parentIds.push(parent.id);
      }
    }
  }

  // Attach remaining students to existing parents if any left
  while (s < students.length) {
    const parent = parents[Math.floor(rand() * parents.length)]!;
    const child = students[s]!;
    parent.childIds.push(child.id);
    child.parentIds.push(parent.id);
    s += 1;
  }

  // Ensure Aria Patel / Sam Rivera continuity with the demo personas
  const aria =
    students.find((st) => st.grade === "G8" && st.formGroup.endsWith("A")) ??
    students.find((st) => st.grade === "G8")!;
  aria.name = "Aria Patel";
  aria.email = "aria.patel@harbor.edu";
  aria.avatarInitials = "AP";
  aria.formGroup = "G8A";
  aria.house = "Coral";

  const guardianId = aria.parentIds[0] ?? parents[0]!.id;
  const sam = parents.find((p) => p.id === guardianId) ?? parents[0]!;
  // Detach Sam from any previous children, then link only Aria for the demo family
  for (const childId of [...sam.childIds]) {
    if (childId === aria.id) continue;
    const other = students.find((st) => st.id === childId);
    if (other) other.parentIds = other.parentIds.filter((id) => id !== sam.id);
  }
  sam.name = "Sam Rivera";
  sam.email = "sam.rivera@email.com";
  sam.phone = "+66 812345678";
  sam.avatarInitials = "SR";
  sam.childIds = [aria.id];
  if (!aria.parentIds.includes(sam.id)) aria.parentIds.unshift(sam.id);

  return parents;
}

const rand = mulberry32(20260909);
export const DEMO_STUDENTS: DemoStudent[] = buildStudents(rand);
export const DEMO_TEACHERS: DemoTeacher[] = buildTeachers(mulberry32(20260910));
export const DEMO_PARENTS: DemoParent[] = buildParents(mulberry32(20260911), DEMO_STUDENTS);

export function populationStats() {
  const byGrade = GRADE_TARGETS.map((g) => ({
    grade: g.grade,
    count: DEMO_STUDENTS.filter((s) => s.grade === g.grade).length,
  }));
  const byDepartment = DEPARTMENTS.map((d) => ({
    department: d,
    count: DEMO_TEACHERS.filter((t) => t.department === d).length,
  }));
  return {
    students: DEMO_STUDENTS.length,
    teachers: DEMO_TEACHERS.length,
    parents: DEMO_PARENTS.length,
    byGrade,
    byDepartment,
  };
}

export function studentsByGrade(grade: string) {
  return DEMO_STUDENTS.filter((s) => s.grade === grade);
}

export function teachersByDepartment(department: string) {
  return DEMO_TEACHERS.filter((t) => t.department === department);
}
