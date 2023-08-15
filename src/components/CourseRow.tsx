import { DeleteIcon, RemoveFormatting, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCourseDispatch } from "~/context/CourseContext";
import { Course } from "~/types/course";
import { useToast } from "./ui/use-toast";

export const CourseRow = ({ courses }: { courses: Course[] }) => {
  const dispatch = useCourseDispatch();
  const { toast } = useToast();

  return (
    <>
      {courses.map((course: Course) => (
        <div
          className="flex w-full flex-1 justify-between border-b bg-slate-700 p-4 text-white"
          key={course.id}
        >
          <p className="flex-1 underline">
            <Link
              href={`https://studieinfo.liu.se/kurs/${course.code}`}
              target="_blank"
            >
              {course.name}
            </Link>
          </p>
          <p className="flex-1">{course.code}</p>
          <p className="flex-1">{course.credit}</p>
          <p className="flex-1">{course.level}</p>
          <p className="flex-1">{course.block}</p>
          <p className="flex-1">{course.vof}</p>
          <Trash2
            color="red"
            className="transition-all duration-200 ease-in-out hover:scale-110 hover:cursor-pointer"
            onClick={() => {
              dispatch({
                type: "REMOVE_COURSE",
                payload: course,
                year: course.year,
                period: course.periodNum,
              });
              /*  toast({
                title: "Kurs borttagen",
                description: "Kursen har tagits bort från din plan",
                variant: "success",
              }); */
            }}
          />
        </div>
      ))}
    </>
  );
};
