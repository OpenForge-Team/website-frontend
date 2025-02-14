"use server";
import type { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
interface GetDocumentsChunksProps {
  user_id: string;
  subject_id?: string;
}
export const getDocumentsChunks = async ({
  user_id,
  subject_id,
}: GetDocumentsChunksProps) => {
  const supabase = await createClient();

  if (!user_id) {
    throw new Error("No user id provided!");
  }
  if (subject_id) {
    const { data: document_data, error: document_error } = await supabase
      .from("documents")
      .select("id")
      .eq("subject_id", subject_id)
      .eq("user_id", user_id);
    if (document_error) {
      throw new Error(document_error.message);
    }
    const { data: document_embeddings_data, error: document_embeddings_error } =
      await supabase
        .from("document_content_embeddings")
        .select("*")
        .in(
          "metadata->>document_id",
          document_data.map((x) => x.id)
        )
        .eq("user_id", user_id);

    if (document_embeddings_error) {
      throw new Error(document_embeddings_error.message);
    }

    return document_embeddings_data || [];
  } else {
    const { data: document_data, error: document_error } = await supabase
      .from("documents")
      .select("id")
      .eq("user_id", user_id);
    if (document_error) {
      throw new Error(document_error.message);
    }
    const { data: document_embeddings_data, error: document_embeddings_error } =
      await supabase
        .from("document_content_embeddings")
        .select("*")
        .in(
          "metadata->>document_id",
          document_data.map((x) => x.id)
        )
        .eq("user_id", user_id);

    if (document_embeddings_error) {
      throw new Error(document_embeddings_error.message);
    }

    return document_embeddings_data || [];
  }
};
