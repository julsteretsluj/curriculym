import { CatalogCourse, course } from "./types";

/** PYP subject areas + transdisciplinary themes (framework, not discrete exam courses). */
export const PYP_COURSES: CatalogCourse[] = [
  course("IB_PYP", "LANG", "Language", "Subject areas", {
    description: "Oral, visual, and written language; mother tongue and additional languages.",
  }),
  course("IB_PYP", "MATH", "Mathematics", "Subject areas"),
  course("IB_PYP", "SCI", "Science", "Subject areas"),
  course("IB_PYP", "SS", "Social Studies", "Subject areas"),
  course("IB_PYP", "ARTS", "Arts", "Subject areas", {
    description: "Visual arts, music, dance, and drama.",
  }),
  course("IB_PYP", "PSPE", "Personal, Social and Physical Education", "Subject areas"),
  course("IB_PYP", "THEME-WHO", "Who We Are", "Transdisciplinary themes"),
  course("IB_PYP", "THEME-WHERE", "Where We Are in Place and Time", "Transdisciplinary themes"),
  course("IB_PYP", "THEME-EXPRESS", "How We Express Ourselves", "Transdisciplinary themes"),
  course("IB_PYP", "THEME-WORK", "How the World Works", "Transdisciplinary themes"),
  course("IB_PYP", "THEME-ORGANIZE", "How We Organize Ourselves", "Transdisciplinary themes"),
  course("IB_PYP", "THEME-SHARE", "Sharing the Planet", "Transdisciplinary themes"),
];

/** MYP eight subject groups with common course offerings. */
export const MYP_COURSES: CatalogCourse[] = [
  course("IB_MYP", "LAL-ENG", "Language and Literature — English", "Language and Literature"),
  course("IB_MYP", "LAL-CHI", "Language and Literature — Chinese", "Language and Literature"),
  course("IB_MYP", "LAL-SPA", "Language and Literature — Spanish", "Language and Literature"),
  course("IB_MYP", "LAL-FRE", "Language and Literature — French", "Language and Literature"),
  course("IB_MYP", "LA-ENG", "Language Acquisition — English", "Language Acquisition"),
  course("IB_MYP", "LA-FRE", "Language Acquisition — French", "Language Acquisition"),
  course("IB_MYP", "LA-SPA", "Language Acquisition — Spanish", "Language Acquisition"),
  course("IB_MYP", "LA-CHI", "Language Acquisition — Mandarin Chinese", "Language Acquisition"),
  course("IB_MYP", "LA-GER", "Language Acquisition — German", "Language Acquisition"),
  course("IB_MYP", "LA-JPN", "Language Acquisition — Japanese", "Language Acquisition"),
  course("IB_MYP", "IAS-HIST", "Individuals and Societies — History", "Individuals and Societies"),
  course("IB_MYP", "IAS-GEO", "Individuals and Societies — Geography", "Individuals and Societies"),
  course("IB_MYP", "IAS-ECON", "Individuals and Societies — Economics", "Individuals and Societies"),
  course("IB_MYP", "IAS-BUS", "Individuals and Societies — Business", "Individuals and Societies"),
  course("IB_MYP", "IAS-INT", "Integrated Humanities", "Individuals and Societies"),
  course("IB_MYP", "SCI-INT", "Integrated Sciences", "Sciences"),
  course("IB_MYP", "SCI-BIO", "Biology", "Sciences"),
  course("IB_MYP", "SCI-CHEM", "Chemistry", "Sciences"),
  course("IB_MYP", "SCI-PHY", "Physics", "Sciences"),
  course("IB_MYP", "MATH-STD", "Mathematics", "Mathematics"),
  course("IB_MYP", "MATH-EXT", "Mathematics Extended", "Mathematics"),
  course("IB_MYP", "ART-VIS", "Visual Arts", "Arts"),
  course("IB_MYP", "ART-MUS", "Music", "Arts"),
  course("IB_MYP", "ART-DRA", "Drama", "Arts"),
  course("IB_MYP", "ART-DAN", "Dance", "Arts"),
  course("IB_MYP", "ART-MED", "Media Arts", "Arts"),
  course("IB_MYP", "PHE", "Physical and Health Education", "Physical and Health Education"),
  course("IB_MYP", "DES-DT", "Design — Digital / Product", "Design"),
  course("IB_MYP", "DES-PROD", "Design — Product Design", "Design"),
  course("IB_MYP", "IDU", "Interdisciplinary Unit", "Interdisciplinary"),
  course("IB_MYP", "PP", "Personal Project", "Core", {
    description: "Culminating independent project in MYP Year 5.",
  }),
  course("IB_MYP", "SA", "Service as Action", "Core"),
];

const DP_LEVELS = ["SL", "HL"];

/** IB Diploma Programme subjects (2025–26 typical offering). */
export const DP_COURSES: CatalogCourse[] = [
  // Group 1
  course("IB_DP", "G1-LIT", "Literature", "Group 1 · Studies in Language and Literature", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G1-LAL", "Language and Literature", "Group 1 · Studies in Language and Literature", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G1-LITPERF", "Literature and Performance", "Group 1 · Studies in Language and Literature", {
    levels: ["SL"],
    description: "Interdisciplinary; may count toward Group 1 or Group 6.",
  }),
  // Group 2
  course("IB_DP", "G2-LANGB", "Language B", "Group 2 · Language Acquisition", {
    levels: DP_LEVELS,
    description: "Offered in many languages (e.g. French B, Spanish B, Mandarin B).",
  }),
  course("IB_DP", "G2-ABINITIO", "Language ab initio", "Group 2 · Language Acquisition", {
    levels: ["SL"],
  }),
  course("IB_DP", "G2-CLASS", "Classical Languages", "Group 2 · Language Acquisition", {
    levels: DP_LEVELS,
    description: "Latin or Classical Greek.",
  }),
  // Group 3
  course("IB_DP", "G3-BUS", "Business Management", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-ECON", "Economics", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-GEO", "Geography", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-GPOL", "Global Politics", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-HIST", "History", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-PHIL", "Philosophy", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-PSY", "Psychology", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-ANTH", "Social and Cultural Anthropology", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G3-WREL", "World Religions", "Group 3 · Individuals and Societies", {
    levels: ["SL"],
  }),
  course("IB_DP", "G3-DIGSOC", "Digital Society", "Group 3 · Individuals and Societies", {
    levels: DP_LEVELS,
  }),
  // Group 4
  course("IB_DP", "G4-BIO", "Biology", "Group 4 · Sciences", { levels: DP_LEVELS }),
  course("IB_DP", "G4-CHEM", "Chemistry", "Group 4 · Sciences", { levels: DP_LEVELS }),
  course("IB_DP", "G4-PHY", "Physics", "Group 4 · Sciences", { levels: DP_LEVELS }),
  course("IB_DP", "G4-CS", "Computer Science", "Group 4 · Sciences", { levels: DP_LEVELS }),
  course("IB_DP", "G4-DT", "Design Technology", "Group 4 · Sciences", { levels: DP_LEVELS }),
  course("IB_DP", "G4-SEHS", "Sports, Exercise and Health Science", "Group 4 · Sciences", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G34-ESS", "Environmental Systems and Societies", "Interdisciplinary · Groups 3/4", {
    levels: ["SL"],
    description: "May count as Group 3 or Group 4.",
  }),
  // Group 5
  course("IB_DP", "G5-AA", "Mathematics: Analysis and Approaches", "Group 5 · Mathematics", {
    levels: DP_LEVELS,
  }),
  course("IB_DP", "G5-AI", "Mathematics: Applications and Interpretation", "Group 5 · Mathematics", {
    levels: DP_LEVELS,
  }),
  // Group 6
  course("IB_DP", "G6-DANCE", "Dance", "Group 6 · The Arts", { levels: DP_LEVELS }),
  course("IB_DP", "G6-FILM", "Film", "Group 6 · The Arts", { levels: DP_LEVELS }),
  course("IB_DP", "G6-MUS", "Music", "Group 6 · The Arts", { levels: DP_LEVELS }),
  course("IB_DP", "G6-THEA", "Theatre", "Group 6 · The Arts", { levels: DP_LEVELS }),
  course("IB_DP", "G6-VA", "Visual Arts", "Group 6 · The Arts", { levels: DP_LEVELS }),
  // Core
  course("IB_DP", "CORE-TOK", "Theory of Knowledge", "DP Core"),
  course("IB_DP", "CORE-EE", "Extended Essay", "DP Core"),
  course("IB_DP", "CORE-CAS", "Creativity, Activity, Service", "DP Core"),
];

/** IB Career-related Programme framework + typical CRS areas. */
export const CP_COURSES: CatalogCourse[] = [
  course("IB_CP", "CORE-PPS", "Personal and Professional Skills", "CP Core"),
  course("IB_CP", "CORE-LD", "Language Development", "CP Core"),
  course("IB_CP", "CORE-SL", "Service Learning", "CP Core"),
  course("IB_CP", "CORE-RP", "Reflective Project", "CP Core"),
  course("IB_CP", "CRS-BUS", "Career-related Study — Business", "Career-related Studies"),
  course("IB_CP", "CRS-ENG", "Career-related Study — Engineering", "Career-related Studies"),
  course("IB_CP", "CRS-IT", "Career-related Study — IT / Computing", "Career-related Studies"),
  course("IB_CP", "CRS-HEALTH", "Career-related Study — Health Sciences", "Career-related Studies"),
  course("IB_CP", "CRS-ARTS", "Career-related Study — Creative Arts", "Career-related Studies"),
  course("IB_CP", "CRS-HOSP", "Career-related Study — Hospitality & Tourism", "Career-related Studies"),
  course("IB_CP", "CRS-SPORT", "Career-related Study — Sports", "Career-related Studies"),
  course("IB_CP", "DP-LINK", "DP Subject Courses (2–4)", "DP Courses", {
    description: "CP students study selected DP courses alongside CRS and CP core.",
  }),
];
