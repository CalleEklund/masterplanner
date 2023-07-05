import { PrismaClient } from "@prisma/client";
import { T7P1 } from "./data/termin_7";

const prisma = new PrismaClient();

const main = async () => {
  //Inserta år
  /* const years = [7, 8, 9, 10];
  years.map(async (year) => {
    const res = await prisma.semester.upsert({
      where: { year: year },
      update: {},
      create: {
        year: year,
      },
    });
  }); */
  // Inserta kurser
  T7P1.map(async (course) => {
    await prisma.course.upsert({
      where: { code: course.CourseCode },
      update: {},
      create: {
        code: course.CourseCode,
        name: course.CourseName,
        semester: {
          connect: { year: 7 },
        },
        credit: course.Credit + "",
        level: course.Level,
        block: course.Block,
        vof: course.VOF,
        periodNum: 1,
      },
    });
    /*  const res = await prisma.course.create({
      data: {
        code: course.CourseCode,
        name: course.CourseName,
        semester: {
          connect: { year: 7 },
        },
        credit: course.Credit + "",
        level: course.Level,
        block: course.Block,
        vof: course.VOF,
        periodNum: 1,
      },
    }); */
    console.log("inserted: " + course.CourseCode);
  });
};
main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
/* main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); */
