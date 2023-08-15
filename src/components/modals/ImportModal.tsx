import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const ImportModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [file, setFile] = useState<File>();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="flex h-[400px] max-w-xl flex-col bg-slate-700 text-white"
        onClick={onClose}
      >
        <DialogHeader>
          <DialogTitle>Importera</DialogTitle>
        </DialogHeader>
        <main>
          <Input
            type="file"
            accept=".csv, .xlsx"
            multiple={false}
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }
            }}
          />
          <div>{file && `${file.name} - ${file.type}`}</div>
        </main>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
