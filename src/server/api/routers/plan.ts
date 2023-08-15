import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { ZodCourse } from "~/types/course";
import { flattenPlan } from "~/utils";
import { parseCourseList } from "~/utils/parsers";
export const planRouter = createTRPCRouter({
  //not used
  savePlan: protectedProcedure
    .input(
      z.object({
        year_7: z.object({
          period_1: z.array(ZodCourse),
          period_2: z.array(ZodCourse),
        }),
        year_8: z.object({
          period_1: z.array(ZodCourse),
          period_2: z.array(ZodCourse),
        }),
        year_9: z.object({
          period_1: z.array(ZodCourse),
          period_2: z.array(ZodCourse),
        }),
        year_10: z.object({
          period_1: z.array(ZodCourse),
          period_2: z.array(ZodCourse),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const planCourses = flattenPlan(input);
      if (planCourses.length === 0) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "No courses in plan",
        });
      }

      const count = await ctx.prisma.plan.aggregate({
        where: {
          creator: {
            id: ctx.session.user.id,
          },
        },
        _count: true,
      });
      const defaultPlanName = `Plan-${count._count + 1}`;
      await ctx.prisma.plan.create({
        data: {
          name: defaultPlanName,

          creator: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          courses: {
            connect: planCourses.map((course) => ({
              id: course.id,
            })),
          },
        },
      });
    }),
  updatePlan: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        courses: z.object({
          year_7: z.object({
            period_1: z.array(ZodCourse),
            period_2: z.array(ZodCourse),
          }),
          year_8: z.object({
            period_1: z.array(ZodCourse),
            period_2: z.array(ZodCourse),
          }),
          year_9: z.object({
            period_1: z.array(ZodCourse),
            period_2: z.array(ZodCourse),
          }),
          year_10: z.object({
            period_1: z.array(ZodCourse),
            period_2: z.array(ZodCourse),
          }),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const planCourses = flattenPlan(input.courses);
      await ctx.prisma.plan.update({
        where: {
          id: input.id,
        },
        data: {
          courses: {
            set: planCourses.map((course) => ({
              id: course.id,
            })),
          },
        },
      });
    }),
  getCoursesByPlanId: publicProcedure
    .input(z.string().nullable())
    .query(async ({ ctx, input }) => {
      if (!input) return [];
      const res = await ctx.prisma.plan.findUnique({
        where: {
          id: input,
        },
        include: {
          courses: {
            include: {
              semester: true,
            },
          },
        },
      });
      console.log("res", res);
      return parseCourseList(res?.courses);
    }),
  createPlan: protectedProcedure.mutation(async ({ ctx }) => {
    const count = await ctx.prisma.plan.aggregate({
      where: {
        creator: {
          id: ctx.session.user.id,
        },
      },
      _count: true,
    });
    const defaultPlanName = `Plan-${count._count + 1}`;
    return ctx.prisma.plan.create({
      data: {
        name: defaultPlanName,

        creator: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
});
