import { createTRPCRouter, publicProcedure } from "../trpc";

export const semesterRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.semester.findMany();
  }),
});
