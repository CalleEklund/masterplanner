import { PrismaClient } from "@prisma/client";
import { T7P1, T7P2 } from "./data/termin_7";
import { T8P1, T8P2 } from "./data/termin_8";
import { T9P1, T9P2 } from "./data/termin_9";
import { T10 } from "./data/termin_10";
import { prisma } from "~/server/db";

//const prisma = new PrismaClient();

const main = async () => {
  //Inserta år
  const years = [7, 8, 9, 10];
  /* years.map(async (year) => {
    const res = await prisma.semester.upsert({
      where: { year: year },
      update: { year: year },
      create: {
        year: year,
      },
    });
  }); */
  // Inserta kurser

  T10.map(async (course) => {
    const res = await prisma.course.create({
      data: {
        code: course.CourseCode,
        name: course.CourseName,
        semester: {
          connect: { year: 10 },
        },
        credit: course.Credit + "",
        level: course.Level,
        block: course.Block + "",
        vof: course.VOF,
        periodNum: 2,
      },
    });
    console.log("done", res.code);
  });

  /*  T10.map(async (course) => {
    await prisma.course.upsert({
      where: {
        code_semesterId_periodNum: {
          code: course.CourseCode,
          semesterId: "cljphrgv80003v5n89z7heepa",
          periodNum: 2,
        },
      },
      update: {},
      create: {
        code: course.CourseCode,
        name: course.CourseName,
        semester: {
          connect: { year: 10 },
        },
        credit: course.Credit + "",
        level: course.Level,
        block: course.Block + "",
        vof: course.VOF,
        periodNum: 2,
      },
    });
  }); */
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
