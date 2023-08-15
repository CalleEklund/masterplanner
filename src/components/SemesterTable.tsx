import { useEffect, useState } from "react";
import { AddCourseModal } from "./modals/AddCourseModal";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useCourse } from "~/context/CourseContext";
import { Course } from "~/types/course";
import { CourseRow } from "./CourseRow";
import { SemesterSummary } from "./SemesterSummary";

type t = {
  period_1: Course[];
  period_2: Course[];
};
export const SemesterTable = ({ year }: { year: number }) => {
  const [courses, setCourses] = useState<t>({ period_1: [], period_2: [] });
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCourses, getCoursesByYear } = useCourse();
  useEffect(() => {
    (() => {
      if (selectedCourses) {
        const t = getCoursesByYear(year);
        if (!t) return;
        setCourses(t);
      }
    })();
  }, [selectedCourses]);

  return (
    <div>
      <p className="text-3xl font-extrabold">Termin: {year}</p>
      <Separator />
      <div>
        <p className="text-2xl font-semibold">Period 1</p>
        <div className="flex flex-col">
          <CourseRow courses={courses.period_1} />
        </div>
      </div>

      <div>
        <p className="text-2xl font-semibold">Period 2</p>
        <div className="flex flex-col">
          <CourseRow courses={courses.period_2} />
        </div>
      </div>
      <Button onClick={() => setIsOpen(true)}>Lägg till kurs</Button>
      {year !== 10 && <SemesterSummary year={year} />}
      <AddCourseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        year={year}
      />
    </div>
  );
};
