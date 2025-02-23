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
import { Label } from "../ui/label";

interface ProcessEditDialogProps {
  label: string;
  description?: string;
  onSave: (data: { label: string; description: string }) => void;
}

export function ProcessEditDialog({
  label,
  description = "",
  onSave,
}: ProcessEditDialogProps) {
  const [value, setValue] = React.useState(label);
  const [desc, setDesc] = React.useState(description);

  const handleSave = () => {
    if (value.trim()) {
      onSave({ label: value, description: desc });
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
          <DialogTitle className="text-primary">Edit Process Name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Process name"
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Process description"
            />
          </div>
          <Button onClick={handleSave} className="mt-2">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
