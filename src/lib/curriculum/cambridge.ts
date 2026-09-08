import { CatalogCourse, course } from "./types";

const ALEVEL = ["AS", "A Level"] as const;

/** Cambridge Primary subject areas. */
export const CAMBRIDGE_PRIMARY_COURSES: CatalogCourse[] = [
  course("CAMBRIDGE_PRIMARY", "ENG", "English", "Core", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "MATH", "Mathematics", "Core", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "SCI", "Science", "Core", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "ICT", "Computing / ICT", "Core", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "ART", "Art & Design", "Foundation", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "MUS", "Music", "Foundation", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "PE", "Physical Education", "Foundation", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "WELL", "Wellbeing", "Foundation", { grades: "Stages 1–6" }),
  course("CAMBRIDGE_PRIMARY", "GLOBAL", "Global Perspectives", "Foundation", { grades: "Stages 1–6" }),
];

/** Cambridge Lower Secondary. */
export const CAMBRIDGE_LOWER_SECONDARY_COURSES: CatalogCourse[] = [
  course("CAMBRIDGE_LOWER_SECONDARY", "ENG", "English", "Core", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "MATH", "Mathematics", "Core", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "SCI", "Science", "Core", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "ICT", "Computing", "Core", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "HIST", "History", "Humanities", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "GEO", "Geography", "Humanities", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "ART", "Art & Design", "Creative", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "MUS", "Music", "Creative", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "DRA", "Drama", "Creative", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "PE", "Physical Education", "Wellbeing", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "GLOBAL", "Global Perspectives", "Skills", { grades: "Stages 7–9" }),
  course("CAMBRIDGE_LOWER_SECONDARY", "LANG", "Modern Foreign Language", "Languages", {
    grades: "Stages 7–9",
  }),
];

/**
 * Representative Cambridge IGCSE catalog (core + widely offered options).
 * Codes use common Cambridge syllabus numbers where well known.
 */
export const IGCSE_COURSES: CatalogCourse[] = [
  // Group I — Languages
  course("IGCSE", "0500", "First Language English", "Group I · Languages"),
  course("IGCSE", "0510", "English as a Second Language", "Group I · Languages"),
  course("IGCSE", "0475", "Literature in English", "Group I · Languages"),
  course("IGCSE", "0520", "French", "Group I · Languages"),
  course("IGCSE", "0530", "Spanish", "Group I · Languages"),
  course("IGCSE", "0525", "German", "Group I · Languages"),
  course("IGCSE", "0547", "Mandarin Chinese", "Group I · Languages"),
  course("IGCSE", "0509", "First Language Chinese", "Group I · Languages"),
  course("IGCSE", "0544", "Arabic", "Group I · Languages"),
  course("IGCSE", "0535", "Italian", "Group I · Languages"),
  course("IGCSE", "0513", "Dutch", "Group I · Languages"),
  course("IGCSE", "0493", "IsiZulu as a Second Language", "Group I · Languages"),
  course("IGCSE", "0531", "Thai", "Group I · Languages"),
  course("IGCSE", "0549", "Hindi as a Second Language", "Group I · Languages"),
  course("IGCSE", "0523", "Chinese as a Second Language", "Group I · Languages"),
  course("IGCSE", "0501", "First Language French", "Group I · Languages"),
  course("IGCSE", "0505", "First Language German", "Group I · Languages"),
  course("IGCSE", "0502", "First Language Spanish", "Group I · Languages"),
  course("IGCSE", "0515", "Dutch as a Foreign Language", "Group I · Languages"),
  course("IGCSE", "0540", "Portuguese", "Group I · Languages"),
  course("IGCSE", "0518", "Marathi as a Second Language", "Group I · Languages"),
  course("IGCSE", "0537", "Bahasa Indonesia", "Group I · Languages"),
  course("IGCSE", "0546", "Malay", "Group I · Languages"),
  course("IGCSE", "0538", "Bahasa Melayu", "Group I · Languages"),
  course("IGCSE", "0514", "First Language Czech", "Group I · Languages"),
  course("IGCSE", "0504", "First Language Portuguese", "Group I · Languages"),
  course("IGCSE", "0503", "First Language Afrikaans", "Group I · Languages"),
  course("IGCSE", "0512", "First Language Russian", "Group I · Languages"),
  course("IGCSE", "0516", "First Language Urdu", "Group I · Languages"),
  course("IGCSE", "0539", "Urdu as a Second Language", "Group I · Languages"),
  course("IGCSE", "0522", "First Language Kazakh", "Group I · Languages"),
  // Group II — Humanities & Social Sciences
  course("IGCSE", "0470", "History", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0460", "Geography", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0457", "Global Perspectives", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0455", "Economics", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0450", "Business Studies", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0452", "Accounting", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0495", "Sociology", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0490", "Religious Studies", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0448", "Pakistan Studies", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0447", "India Studies", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0449", "Bangladesh Studies", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "2147", "History (Modern World Affairs)", "Group II · Humanities & Social Sciences"),
  // Group III — Sciences
  course("IGCSE", "0610", "Biology", "Group III · Sciences"),
  course("IGCSE", "0620", "Chemistry", "Group III · Sciences"),
  course("IGCSE", "0625", "Physics", "Group III · Sciences"),
  course("IGCSE", "0653", "Combined Science", "Group III · Sciences"),
  course("IGCSE", "0654", "Co-ordinated Sciences (Double Award)", "Group III · Sciences"),
  course("IGCSE", "0680", "Environmental Management", "Group III · Sciences"),
  course("IGCSE", "0606", "Additional Mathematics", "Group III · Sciences", {
    description: "Often grouped with maths pathway; listed for school offering maps.",
  }),
  // Group IV — Mathematics
  course("IGCSE", "0580", "Mathematics", "Group IV · Mathematics"),
  course("IGCSE", "0607", "Cambridge International Mathematics", "Group IV · Mathematics"),
  course("IGCSE", "0980", "Mathematics (9–1)", "Group IV · Mathematics"),
  // Group V — Creative, Technical & Vocational
  course("IGCSE", "0400", "Art & Design", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0410", "Music", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0411", "Drama", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0413", "Physical Education", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0417", "Information & Communication Technology", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0478", "Computer Science", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0445", "Design & Technology", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0454", "Enterprise", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0471", "Travel & Tourism", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0648", "Food & Nutrition", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0459", "Cambridge IGCSE (9–1) English as a Second Language", "Group I · Languages"),
  course("IGCSE", "0984", "Computer Science (9–1)", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0985", "Drama (9–1)", "Group V · Creative, Technical & Vocational"),
  course("IGCSE", "0986", "Geography (9–1)", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0987", "History (9–1)", "Group II · Humanities & Social Sciences"),
  course("IGCSE", "0989", "Literature in English (9–1)", "Group I · Languages"),
  course("IGCSE", "0990", "First Language English (9–1)", "Group I · Languages"),
  course("IGCSE", "0992", "Literature (English) 9–1", "Group I · Languages"),
  course("IGCSE", "0993", "English as a Second Language (9–1) Count-in Speaking", "Group I · Languages"),
];

/** Cambridge International AS & A Level subjects (shared catalog; levels distinguish AS vs full A). */
export const A_LEVEL_COURSES: CatalogCourse[] = [
  course("A_LEVEL", "9702", "Physics", "Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9701", "Chemistry", "Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9700", "Biology", "Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9618", "Computer Science", "Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9709", "Mathematics", "Mathematics", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9231", "Further Mathematics", "Mathematics", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9708", "Economics", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9609", "Business", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9696", "Geography", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9489", "History", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9990", "Psychology", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9699", "Sociology", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9239", "Global Perspectives & Research", "Humanities & Social Sciences", {
    levels: [...ALEVEL],
  }),
  course("A_LEVEL", "9274", "Classical Studies", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9011", "Divinity", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9488", "Islamic Studies", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9487", "Hinduism", "Humanities & Social Sciences", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9093", "English Language", "English Language & Literature", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9695", "English Literature", "English Language & Literature", { levels: [...ALEVEL] }),
  course("A_LEVEL", "8695", "English Language and Literature", "English Language & Literature", {
    levels: ["AS"],
  }),
  course("A_LEVEL", "8021", "English General Paper", "English Language & Literature", {
    levels: ["AS"],
  }),
  course("A_LEVEL", "9479", "Art & Design", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9481", "Digital Media & Design", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9482", "Drama", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9483", "Music", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9607", "Media Studies", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9705", "Design & Technology", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9631", "Design & Textiles", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9626", "Information Technology", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9396", "Physical Education", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9395", "Travel & Tourism", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9694", "Thinking Skills", "Creative & Professional", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9716", "French", "Languages", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9719", "Spanish", "Languages", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9717", "German", "Languages", { levels: [...ALEVEL] }),
  course("A_LEVEL", "9718", "Portuguese", "Languages", { levels: [...ALEVEL] }),
  course("A_LEVEL", "8687", "Hindi Language", "Languages", { levels: ["AS"] }),
  course("A_LEVEL", "8281", "Japanese Language", "Languages", { levels: ["A Level"] }),
  course("A_LEVEL", "8673", "Chinese Language", "Languages", { levels: ["AS"] }),
];

/** Mirror AS Level entries for curriculum filter (same subjects, AS-first framing). */
export const AS_LEVEL_COURSES: CatalogCourse[] = A_LEVEL_COURSES.map((c) => ({
  ...c,
  id: c.id.replace("a_level-", "as_level-"),
  curriculum: "AS_LEVEL" as const,
  levels: c.levels?.includes("AS") ? ["AS"] : c.levels,
}));
