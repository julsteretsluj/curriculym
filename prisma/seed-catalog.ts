/**
 * Seed CatalogCourse rows from the TypeScript curriculum catalog.
 * Run: npx tsx prisma/seed-catalog.ts  (requires DATABASE_URL)
 */
import { PrismaClient, Curriculum } from "@prisma/client";
import { ALL_CATALOG_COURSES } from "../src/lib/curriculum";

const prisma = new PrismaClient();

async function main() {
  for (const c of ALL_CATALOG_COURSES) {
    await prisma.catalogCourse.upsert({
      where: { id: c.id },
      create: {
        id: c.id,
        curriculum: c.curriculum as Curriculum,
        code: c.code,
        name: c.name,
        groupName: c.groupName,
        levels: c.levels ?? [],
        description: c.description,
        ages: c.ages,
        grades: c.grades,
      },
      update: {
        name: c.name,
        groupName: c.groupName,
        levels: c.levels ?? [],
        description: c.description,
        ages: c.ages,
        grades: c.grades,
      },
    });
  }
  console.log(`Seeded ${ALL_CATALOG_COURSES.length} catalog courses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
