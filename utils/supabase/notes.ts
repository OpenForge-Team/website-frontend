"use server";

import { createClient } from "@/utils/supabase/server";
import { generateTitleChunks } from "./rag/generate-title-embeddings";
import { generateContentChunks } from "./rag/generate-content-embeddings";
import { uploadVocalNote } from "../storage/r2";

export interface Note {
  id: string;
  subject_id: string | null;
  title: string;
  content: string;
  subjects: {
    name: string;
  } | null;
}

interface addNoteprops {
  user_id: string;
  title: string;
  content: string;
  workspace_id: string;
  subject_id: string;
  audioBuffer?: Buffer;
}
interface updateNoteprops {
  note_id: string;
  title: string;
  content: string;
}
export const addNote = async ({
  user_id,
  title,
  content,
  workspace_id,
  subject_id,
  audioBuffer,
}: addNoteprops) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .insert({
      title: title,
      content: content,
      workspace_id: workspace_id,
      subject_id: subject_id,
      user_id: user_id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  generateTitleChunks({
    note_id: data.id,
    content: title,
  });
  generateContentChunks({
    note_id: data.id,
    content: content,
  });

  if (audioBuffer) {
    await uploadVocalNote({
      note_id: data.id,
      buffer: audioBuffer
    });
  }
  
  return data.id;
};

export const getNotesbySubjects = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("id, subject_id, title, content, subjects!inner(name)")
    .eq("subjects.user_id", "68723abd-6fda-48d5-86b6-0d9badcae0e8")
    .eq("subjects.workspace_id", "cf010514-ef06-4f05-8a92-f0f79ac5ae15");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const getNotebyId = async (user_id: string, note_id: string) => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("title, content, subjects!inner(name)")
      .eq("subjects.user_id", user_id)
      .eq("id", note_id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    await uploadVocalNote({ note_id: note_id });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateNote = async ({
  note_id,
  title,
  content,
}: updateNoteprops) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .update({
      title: title,
      content: content,
    })
    .eq("id", note_id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  generateTitleChunks({
    note_id: data.id,
    content: title,
  });
  generateContentChunks({
    note_id: data.id,
    content: content,
  });
  return data;
};
