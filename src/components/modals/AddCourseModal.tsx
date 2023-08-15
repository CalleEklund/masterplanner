import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { api } from "~/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useToast } from "../ui/use-toast";
import { YearKey, useCourse, useCourseDispatch } from "~/context/CourseContext";
import { Course } from "~/types/course";
import { DataTable } from "../coursedatatable/data-table";
import { columns } from "../coursedatatable/columns";

export const AddCourseModal = ({
  isOpen,
  onClose,
  year,
}: {
  isOpen: boolean;
  onClose: () => void;
  year: number;
}) => {
  const results = api.course.searchCourses.useQuery({
    search: "",
    year: year,
  });
  const { selectedCourses } = useCourse();
  const [courses, setCourses] = useState<any>();

  useEffect(() => {
    const filteredCourses = results.data?.filter((course) => {
      if (!selectedCourses) return [];
      return !Object.values(selectedCourses[`year_${year}` as YearKey]).some(
        (periodCourse) => {
          return periodCourse.some((c: Course) => c.code === course.code);
        }
      );
    });
    setCourses(filteredCourses);
  }, [selectedCourses, results.data]);
  const dispatch = useCourseDispatch();
  const { toast } = useToast();

  const addCourse = (course: Course) => {
    //Checks if there existing a course that is overlapping in periods

    const dups = courses.filter((c: Course) => c.code === course.code);
    dups.map((c: Course) => {
      dispatch({
        type: "ADD_COURSE",
        payload: c,
        year: year,
        period: c.periodNum,
      });
    });
    toast({
      title: "Kurs Tillagd",
      description: "Kursen har lagts till i planeringen",
      variant: "success",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="flex max-h-[800px] min-h-[800px] max-w-4xl flex-col  bg-slate-700 text-white"
        onClick={onClose}
      >
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
        </DialogHeader>
        <DataTable columns={columns} data={courses} addCourse={addCourse} />
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  {
  }
};
