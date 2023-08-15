import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "../ui/input";
import { useState } from "react";
import { jsonToXlsx } from "~/utils/jsonToXlsx";
import { useCourse } from "~/context/CourseContext";
import { useToast } from "../ui/use-toast";

export const ExportModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("Filtyp");

  const { selectedCourses } = useCourse();
  const { toast } = useToast();
  const submit = () => {
    console.log("download of type", fileType, "with name", fileName);
    jsonToXlsx(selectedCourses, fileName, fileType);
    toast({
      title: "Laddar ner",
      description: "Din masters plan laddas ner",
      variant: "success",
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="flex h-[400px] max-w-xl flex-col bg-slate-700 text-white"
        onClick={onClose}
      >
        <DialogHeader>
          <DialogTitle>Exportera</DialogTitle>
        </DialogHeader>
        <main className="flex h-[700px] flex-col justify-evenly">
          <section className="flex flex-row items-center gap-4">
            <p className="flex-1">Exportera som: </p>
            <div className="flex-grow-[1]">
              <Select
                onValueChange={(e: string) => {
                  setFileType(e);
                }}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filtyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xlsx">xlsx</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
          <section className="flex flex-row items-center gap-4">
            <p className="flex-1">Filnamn: </p>
            <div className="flex-grow-[1]">
              <Input
                className="w-[220px] bg-white text-black"
                value={fileName}
                onChange={({ target }) => setFileName(target.value)}
              />
            </div>
          </section>
          <Button className="w-[50%] self-center" onClick={submit}>
            Ladda ner
          </Button>
        </main>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
