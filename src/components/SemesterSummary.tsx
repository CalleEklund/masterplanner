import { useCourse } from "~/context/CourseContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { blockCounts, levelCounts, sumHp } from "~/utils";

export const SemesterSummary = ({ year }: { year: number }) => {
  const { selectedCourses } = useCourse();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <p className="mb-4 text-xl font-bold">Sammanfattning</p>
        </AccordionTrigger>
        <AccordionContent>
          <TooltipProvider>
            <div className="flex gap-10 bg-slate-900 p-4 text-white">
              <span className="flex items-center justify-center">
                <Tooltip>
                  <TooltipTrigger className="mr-2 text-lg font-semibold underline">
                    Hp:
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Den total summan av Hp för terminen</p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-[18px]">{sumHp(year)}</p>
              </span>
              <span className="flex items-center justify-center">
                <Tooltip>
                  <TooltipTrigger className="mr-2 text-lg font-semibold underline">
                    Nivå:{" "}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Antalet kurser per kurs-nivå</p>
                  </TooltipContent>
                </Tooltip>
                {Object.entries(levelCounts(year)).map(([key, value]) => (
                  <p key={key} className="mr-2 text-[18px]">
                    {key}: {value}
                  </p>
                ))}
              </span>
              <span className="flex items-center justify-center">
                <Tooltip>
                  <TooltipTrigger className="mr-2 text-lg font-semibold underline">
                    Block:{" "}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Antalet kurser per block (blocknummer: antalet kurser)
                    </p>
                  </TooltipContent>
                </Tooltip>
                {Object.entries(blockCounts(year)).map(([key, value]) => (
                  <p key={key} className="mr-2 text-[18px]">
                    {key}: {value}
                  </p>
                ))}
              </span>
            </div>
          </TooltipProvider>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
