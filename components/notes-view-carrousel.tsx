"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { Button } from "./ui/button";
import { updateNote } from "@/utils/supabase/notes";
import { useToast } from "./hooks/use-toast";
import { Textarea } from "./ui/textarea";
interface Props {
  subject: string;
  notes: { id: string; title: string; content: string }[];
  onNoteUpdated: () => void;
}

export default function NotesViewCarousel({
  subject,
  notes,
  onNoteUpdated,
}: Props) {
  const [selectedNote, setSelectedNote] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const { toast } = useToast();
  const handleNoteClick = (note: {
    id: string;
    title: string;
    content: string;
  }) => {
    setSelectedNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsDialogOpen(true);
  };

  const handleNoteModification = async () => {
    if (!selectedNote) return;
    try {
      const noteModification = await updateNote({
        note_id: selectedNote.id,
        title: editedTitle,
        content: editedContent,
      });
      onNoteUpdated();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update note. Please try again.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="w-[calc(100%-1rem)]">
      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
          loop: true,
        }}
        className="w-[calc(100%-1rem)]"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between align-middle">
              <CardTitle className="inline-block">{subject}</CardTitle>
              <div className="flex gap-2">
                <CarouselPrevious className="static" />
                <CarouselNext className="static" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="mx-auto w-full overflow-hidden">
            <CarouselContent>
              {notes.map((note) => (
                <CarouselItem
                  key={note.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  onClick={() => handleNoteClick(note)}
                >
                  <Card className="cursor-pointer transition-all duration-200 hover:bg-primary/90 hover:text-black">
                    <CardContent className="flex aspect-square items-center justify-center p-4">
                      <span className="overflow-hidden text-sm font-semibold text-center">
                        {note.title}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </Carousel>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
