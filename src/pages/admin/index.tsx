import { api } from "~/utils/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function Home() {
  const courses = api.course.getAll.useQuery();
  return (
    <main className="flex h-screen flex-col items-center ">
      <p className="py-4 text-4xl font-extrabold">Courses</p>
      <Table className="bg-slate-700">
        <TableHeader>
          <TableRow className="justify-between">
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Credit</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>block</TableHead>
            <TableHead>VOF</TableHead>
            <TableHead className="text-right">Semester Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-white">
          {courses.data?.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.credit}</TableCell>
              <TableCell>{course.level}</TableCell>
              <TableCell>{course.block}</TableCell>
              <TableCell>{course.vof}</TableCell>
              <TableCell className="text-right">{course.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
