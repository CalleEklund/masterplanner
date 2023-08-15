import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { semesterRouter } from "./routers/semester";
import { courseRouter } from "./routers/course";
import { planRouter } from "./routers/plan";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  semester: semesterRouter,
  course: courseRouter,
  plan: planRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
