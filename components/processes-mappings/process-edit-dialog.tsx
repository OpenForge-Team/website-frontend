import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ProcessEditDialogProps {
  label: string;
  onLabelChange: (newLabel: string) => void;
}

export function ProcessEditDialog({ label, onLabelChange }: ProcessEditDialogProps) {
  const [value, setValue] = React.useState(label);
  
  const handleSave = () => {
    if (value.trim()) {
      onLabelChange(value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Process Name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="Process name"
            autoFocus
          />
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
