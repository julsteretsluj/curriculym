import { CatalogCourse, course } from "./types";

/**
 * Common UK GCSE subjects (board-agnostic names).
 * Schools map to AQA / Edexcel / OCR / WJEC specifications.
 */
export const GCSE_COURSES: CatalogCourse[] = [
  course("GCSE", "ENG-LANG", "English Language", "Core", { levels: ["9–1"] }),
  course("GCSE", "ENG-LIT", "English Literature", "Core", { levels: ["9–1"] }),
  course("GCSE", "MATH", "Mathematics", "Core", { levels: ["Foundation", "Higher"] }),
  course("GCSE", "BIO", "Biology", "Sciences", { levels: ["Foundation", "Higher"] }),
  course("GCSE", "CHEM", "Chemistry", "Sciences", { levels: ["Foundation", "Higher"] }),
  course("GCSE", "PHY", "Physics", "Sciences", { levels: ["Foundation", "Higher"] }),
  course("GCSE", "SCI-COMB", "Combined Science (Trilogy / Synergy)", "Sciences", {
    levels: ["Foundation", "Higher"],
  }),
  course("GCSE", "HIST", "History", "Humanities"),
  course("GCSE", "GEO", "Geography", "Humanities"),
  course("GCSE", "RS", "Religious Studies", "Humanities"),
  course("GCSE", "CITIZ", "Citizenship Studies", "Humanities"),
  course("GCSE", "SOC", "Sociology", "Humanities"),
  course("GCSE", "PSY", "Psychology", "Humanities"),
  course("GCSE", "BUS", "Business", "Humanities"),
  course("GCSE", "ECON", "Economics", "Humanities"),
  course("GCSE", "FRE", "French", "Languages"),
  course("GCSE", "SPA", "Spanish", "Languages"),
  course("GCSE", "GER", "German", "Languages"),
  course("GCSE", "ITA", "Italian", "Languages"),
  course("GCSE", "MAN", "Mandarin Chinese", "Languages"),
  course("GCSE", "LAT", "Latin", "Languages"),
  course("GCSE", "ART", "Art and Design", "Arts & Technology"),
  course("GCSE", "PHOTO", "Photography", "Arts & Technology"),
  course("GCSE", "MUS", "Music", "Arts & Technology"),
  course("GCSE", "DRA", "Drama", "Arts & Technology"),
  course("GCSE", "DANCE", "Dance", "Arts & Technology"),
  course("GCSE", "DT", "Design and Technology", "Arts & Technology"),
  course("GCSE", "FOOD", "Food Preparation and Nutrition", "Arts & Technology"),
  course("GCSE", "TEXT", "Textile Design", "Arts & Technology"),
  course("GCSE", "MEDIA", "Media Studies", "Arts & Technology"),
  course("GCSE", "FILM", "Film Studies", "Arts & Technology"),
  course("GCSE", "CS", "Computer Science", "Computing"),
  course("GCSE", "IT", "Information Technology / Creative iMedia", "Computing"),
  course("GCSE", "PE", "Physical Education", "Physical Education"),
  course("GCSE", "STAT", "Statistics", "Mathematics"),
  course("GCSE", "FURMATH", "Further Mathematics (Level 2)", "Mathematics"),
];

export const EARLY_YEARS_COURSES: CatalogCourse[] = [
  course("EARLY_YEARS", "CL", "Communication and Language", "Areas of learning"),
  course("EARLY_YEARS", "PSED", "Personal, Social and Emotional Development", "Areas of learning"),
  course("EARLY_YEARS", "PD", "Physical Development", "Areas of learning"),
  course("EARLY_YEARS", "LIT", "Literacy", "Areas of learning"),
  course("EARLY_YEARS", "MATH", "Mathematics", "Areas of learning"),
  course("EARLY_YEARS", "UTW", "Understanding the World", "Areas of learning"),
  course("EARLY_YEARS", "EAD", "Expressive Arts and Design", "Areas of learning"),
];

export const NATIONAL_COURSES: CatalogCourse[] = [
  course("NATIONAL", "CORE-LANG", "National Language / Literacy", "Core"),
  course("NATIONAL", "CORE-MATH", "National Mathematics", "Core"),
  course("NATIONAL", "CORE-SCI", "National Science", "Core"),
  course("NATIONAL", "CORE-SS", "National Social Studies / Civics", "Core"),
  course("NATIONAL", "CORE-ARTS", "National Arts", "Foundation"),
  course("NATIONAL", "CORE-PE", "National Physical Education", "Foundation"),
  course("NATIONAL", "CORE-TECH", "National Technology / Computing", "Foundation"),
  course("NATIONAL", "ELECTIVE", "National Elective / Local Studies", "Electives", {
    description: "Configure country-specific electives per tenant.",
  }),
];
