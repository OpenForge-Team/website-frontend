"use server";

import { createClient } from "@/utils/supabase/server";
import { generateTitleChunks } from "./rag/generate-title-embeddings";
import { generateContentChunks } from "./rag/generate-content-embeddings";
import { uploadVocalNoteR2 } from "../storage/r2";

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
  audioBuffer?: Blob;
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
  console.log(user_id, title, content, workspace_id, subject_id, audioBuffer);
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
    // await uploadVocalNoteR2({
    //   note_id: data.id,
    //   buffer: audioBuffer,
    // });
  }

  return data.id;
};

export const getNotesbySubjects = async (
  user_id: string,
  subject_id: string
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("id, subject_id, title, content, subjects!inner(name)")
    .eq("subjects.user_id", user_id)
    .eq("subject_id", subject_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const getNotebyId = async (user_id: string, note_id: string) => {
  const supabase = await createClient();
  console.log(user_id, " ", note_id);
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

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getNoteById = async (noteId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single();

  if (error) throw new Error(error.message);
  return data;
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
