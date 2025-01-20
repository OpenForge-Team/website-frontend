"use server";

import { createClient } from "./server";

interface addVocalNoteProps {
  note_id: string;
  user_id: string;
}
export const addVocalNote = async ({ note_id, user_id }: addVocalNoteProps) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("vocal_notes")
      .insert({ note_id: "", endpoint_url: "", user_id: user_id });
  } catch (error) {}
};
