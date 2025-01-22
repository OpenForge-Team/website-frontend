"use client";
import { useToast } from "@/components/hooks/use-toast";
import NotesViewCarousel from "@/components/notes-view-carrousel";
import { useWorkspace } from "@/providers/workspace-provider";
import { getUser } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import {
  addNote,
  getNotesbySubjects as fetchNotesBySubjects,
} from "@/utils/supabase/notes";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Note } from "@/utils/supabase/notes";

export default function ViewNotesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [groupedNotes, setGroupedNotes] = useState<Record<string, Note[]>>({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();
  const { activeWorkspace } = useWorkspace();
  useEffect(() => {
    const getUserCall = async () => {
      const user = await getUser(supabase);
      if (user) {
        setUser(user);
      } else {
        console.log("User not authenticated");
      }
    };
    getUserCall();
  }, [supabase]);
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user || !activeWorkspace) {
        return;
      }

      try {
        const notesbySubjects = await fetchNotesBySubjects();

        // Group notes by subject name
        const grouped = notesbySubjects.reduce(
          (acc: Record<string, Note[]>, note) => {
            const subjectName = note.subjects?.name ?? "Untitled Subject";
            if (!acc[subjectName]) {
              acc[subjectName] = [];
            }
            acc[subjectName].push(note);
            return acc;
          },
          {}
        );

        setGroupedNotes(grouped);
        setIsLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch notes. Please try again.",
        });
      }
    };
    fetchNotes();
  }, [user, activeWorkspace, toast, refreshTrigger]);

  // if (isLoading) {
  //   return <div className="m-auto">loading...</div>;
  // }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notes</h1>
      <div className="space-y-6">
        {Object.entries(groupedNotes).map(([subject, notes]) => (
          <NotesViewCarousel
            key={subject}
            subject={subject}
            notes={notes.map((note) => ({
              id: note.id,
              title: note.title,
              content: note.content,
            }))}
            onNoteUpdated={() => setRefreshTrigger((prev) => prev + 1)}
          />
        ))}
      </div>
    </div>
  );
}
