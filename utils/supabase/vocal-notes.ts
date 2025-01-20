"use server";

import { error } from "console";
import { createClient } from "./server";

interface addVocalNoteProps {
  note_id: string;
  user_id: string;
}
export const addVocalNote = async ({ note_id, user_id }: addVocalNoteProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vocal_notes")
    .insert({ note_id: note_id, user_id: user_id });
  if (error) {
    throw new Error(error.message);
  }
};
