import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { parseCourseList } from "~/utils/parsers";

export const courseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.course.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        block: true,
        credit: true,
        level: true,
        vof: true,
        periodNum: true,
        semester: {
          select: {
            year: true,
          },
        },
      },
    });
    return parseCourseList(res);
  }),
  getCourseByYear: publicProcedure
    .input(z.object({ year: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.prisma.course.findMany({
        where: {
          semester: {
            year: input.year,
          },
        },
        select: {
          id: true,
          name: true,
          code: true,
          block: true,
          credit: true,
          level: true,
          vof: true,
          semester: {
            select: {
              year: true,
              id: false,
            },
          },
        },
      });
      return parseCourseList(res);
    }),
  searchCourses: publicProcedure
    .input(z.object({ search: z.string(), year: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.prisma.course.findMany({
        where: {
          AND: [
            {
              semester: {
                year: input.year,
              },
            },
            {
              OR: [
                {
                  name: {
                    contains: input.search,
                  },
                },
                {
                  code: {
                    contains: input.search,
                  },
                },
              ],
            },
          ],
        },
        select: {
          id: true,
          name: true,
          code: true,
          block: true,
          credit: true,
          level: true,
          vof: true,
          periodNum: true,
          semester: {
            select: {
              year: true,
              id: false,
            },
          },
        },
      });
      return parseCourseList(res);
    }),
  getCourseByCode: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.prisma.course.findMany({
        where: {
          code: input.code,
        },
        select: {
          id: true,
          name: true,
          code: true,
          block: true,
          credit: true,
          level: true,
          vof: true,
          periodNum: true,
          semester: {
            select: {
              year: true,
              id: false,
            },
          },
        },
      });
      return parseCourseList(res);
    }),
});
