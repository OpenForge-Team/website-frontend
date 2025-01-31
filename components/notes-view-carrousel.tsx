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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { Button } from "./ui/button";
import { NoteEditDialog } from "./note-edit-dialog";
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
  const handleNoteClick = (note: {
    id: string;
    title: string;
    content: string;
  }) => {
    setSelectedNote(note);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          containScroll: "keepSnaps",
          dragFree: true,
          loop: false,
        }}
        className="w-1/2 max-w-full overflow-hidden"
      >
        <div className="flex items-center justify-between align-middle">
          <CardTitle className="inline-block">{subject}</CardTitle>
          {/* <div className="flex gap-2">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div> */}
        </div>
        <CarouselContent>
          {notes.map((note) => (
            <CarouselItem
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className="basis-1/5"
            >
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <span className="text-sm font-semibold text-center">
                    {note.title}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <NoteEditDialog
        selectedNote={selectedNote}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNoteUpdated={onNoteUpdated}
      />
    </div>
  );
}
