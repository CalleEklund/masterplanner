import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CourseState, useCourse } from "./context/CourseContext";
import { Course } from "./types/course";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sumHp = (year: number) => {
  const { getCoursesByYear } = useCourse();
  const courses = getCoursesByYear(year);
  const uniqueCodes = new Set();
  if (!courses) return 0;
  const sum = Object.values(courses)
    .flat()
    .reduce((acc, course) => {
      const code = course.code;
      if (!uniqueCodes.has(code)) {
        uniqueCodes.add(code);
        const credit = parseInt(course.credit);
        return isNaN(credit) ? acc : acc + credit;
      }
      return acc;
    }, 0);
  return sum;
};

export const levelCounts = (year: number) => {
  const { getCoursesByYear } = useCourse();
  const courses = getCoursesByYear(year);
  if (!courses) return {};
  const uniqueCourses: {
    [key: string]: Set<string>;
  } = {};

  Object.values(courses)
    .flatMap((courses) => courses)
    .forEach(({ level, code }) =>
      (uniqueCourses[level] ||= new Set()).add(code)
    );

  const counts = Object.fromEntries(
    Object.entries(uniqueCourses).map(([level, codes]) => [level, codes?.size])
  );

  return counts as { [key: string]: number };
};

export const blockCounts = (year: number) => {
  const { getCoursesByYear } = useCourse();
  const courses = getCoursesByYear(year);
  if (!courses) return {};
  const uniqueCourses: {
    [key: string]: Set<string>;
  } = {};

  Object.values(courses)
    .flatMap((courses) => courses)
    .forEach(({ block, code }) =>
      (uniqueCourses[block] ||= new Set()).add(code)
    );

  const counts = Object.fromEntries(
    Object.entries(uniqueCourses).map(([block, codes]) => [block, codes?.size])
  );

  return counts as { [key: string]: number };
};

export const flattenPlan = (data: CourseState): Course[] =>
  Object.values(data).flatMap(Object.values).flat();
