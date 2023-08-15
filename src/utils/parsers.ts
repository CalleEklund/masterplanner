import { Course } from "~/types/course";
export const parseCourseList = (courses: any): Course[] => {
  return courses.map((course: any) => {
    return {
      id: course.id,
      name: course.name,
      code: course.code,
      block: course.block,
      credit: course.credit,
      level: course.level,
      vof: course.vof,
      periodNum: course.periodNum,
      year: course.semester.year,
    };
  });
};
