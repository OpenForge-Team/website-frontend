"use server";
import type { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
interface GetNotesChunksProps {
  user_id: string;
  subject_id?: string;
}
export const getNoteContentChunks = async ({
  user_id,
  subject_id,
}: GetNotesChunksProps) => {
  const supabase = await createClient();

  if (!user_id) {
    throw new Error("No user id provided!");
  }
  if (subject_id) {
    const { data: note_data, error: note_error } = await supabase
      .from("notes")
      .select("id")
      .eq("subject_id", subject_id)
      .eq("user_id", user_id);
    if (note_error) {
      throw new Error(note_error.message);
    }
    const { data: note_embeddings_data, error: note_embeddings_error } =
      await supabase
        .from("note_content_embeddings")
        .select("*")
        .in(
          "metadata->>note_id",
          note_data.map((x) => x.id)
        )
        .eq("user_id", user_id);

    if (note_embeddings_error) {
      throw new Error(note_embeddings_error.message);
    }

    return note_embeddings_data || [];
  } else {
    const { data: note_data, error: note_error } = await supabase
      .from("notes")
      .select("id")
      .eq("user_id", user_id);
    if (note_error) {
      throw new Error(note_error.message);
    }
    const { data: note_embeddings_data, error: note_embeddings_error } =
      await supabase
        .from("note_content_embeddings")
        .select("*")
        .in(
          "metadata->>note_id",
          note_data.map((x) => x.id)
        )
        .eq("user_id", user_id);

    if (note_embeddings_error) {
      throw new Error(note_embeddings_error.message);
    }

    return note_embeddings_data || [];
  }
};
