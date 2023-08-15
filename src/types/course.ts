import { z } from "zod";
export type Course = {
  id: string;
  name: string;
  code: string;
  credit: string;
  level: string;
  block: string;
  vof: string;
  year: number;
  periodNum: number;
};
export const ZodCourse = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  credit: z.string(),
  level: z.string(),

  block: z.string(),
  vof: z.string(),
  year: z.number(),
  periodNum: z.number(),
});
