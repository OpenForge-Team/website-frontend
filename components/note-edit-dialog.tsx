"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateNote } from "@/utils/supabase/notes";
import { useToast } from "./hooks/use-toast";

interface NoteEditDialogProps {
  selectedNote: {
    id: string;
    title: string;
    content: string;
  } | null;
  subjectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNoteUpdated: () => void;
}

export function NoteEditDialog({
  selectedNote,
  subjectId,
  open,
  onOpenChange,
  onNoteUpdated,
}: NoteEditDialogProps) {
  const { toast } = useToast();
  const [editedTitle, setEditedTitle] = useState(selectedNote?.title || "");
  const [editedContent, setEditedContent] = useState(
    selectedNote?.content || ""
  );

  useEffect(() => {
    if (selectedNote) {
      setEditedTitle(selectedNote.title);
      setEditedContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleNoteModification = async () => {
    if (!selectedNote) return;
    try {
      await updateNote({
        note_id: selectedNote.id,
        subject_id: subjectId,
        title: editedTitle,
        content: editedContent,
      });
      onNoteUpdated();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update note. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Make changes to your note here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Label htmlFor="title" className="min-w-20">
              Title
            </Label>
            <Input
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Label htmlFor="content" className="min-w-20 mt-2">
              Content
            </Label>
            <Textarea
              id="content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
          <Button onClick={handleNoteModification}>Save changes</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
