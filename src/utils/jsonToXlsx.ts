import { CourseState, PeriodKey, YearKey } from "~/context/CourseContext";
import * as XLSX from "xlsx";
export const jsonToXlsx = (
  courses: CourseState,
  fileName: string,
  fileType: string
) => {
  const headers = ["Kurskod", "Kursnamn", "Hp", "Nivå", "Block", "VOF"];
  let rowIndex = 0;
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([], {
    header: [],
  });

  XLSX.utils.sheet_add_json(worksheet, [headers], {
    skipHeader: true,
    origin: { r: rowIndex, c: 1 },
  });
  rowIndex += 2;
  const years = Object.keys(courses) as YearKey[];
  years.map((year) => {
    const yearHeader = `Termin ${year.split("_")[1]}`;
    XLSX.utils.sheet_add_json(worksheet, [{ yearHeader }], {
      skipHeader: true,
      origin: `A${rowIndex}`,
    });
    rowIndex++;
    const periods = Object.keys(courses[year]) as PeriodKey[];
    periods.map((period) => {
      const periodHeader = `Period ${period.split("_")[1]}`;
      XLSX.utils.sheet_add_json(worksheet, [{ periodHeader }], {
        skipHeader: true,
        origin: `A${rowIndex}`,
      });

      const coursesInPeriod = courses[year][period];
      coursesInPeriod.map((course, index) => {
        const courseInfo = [
          {
            v: course.code,
            l: {
              Target: `https://studieinfo.liu.se/kurs/${course.code}`,
            },
          },
          course.name,
          course.credit,
          course.level,
          course.block,
          course.vof,
        ];
        XLSX.utils.sheet_add_json(worksheet, [courseInfo], {
          skipHeader: true,
          origin: { r: rowIndex, c: 1 },
        });
        rowIndex++;
      });
      rowIndex++;
    });
  });
  XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
  XLSX.writeFile(workbook, `${fileName}.${fileType}`);
};
