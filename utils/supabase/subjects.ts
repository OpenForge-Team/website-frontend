"use server";

import { createClient } from "@/utils/supabase/server";
interface addSubjectProps {
  user_id: string;
  name: string;
  workspace_id: string;
}
export const getSubjects = async (user_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subjects")
    .select("id, name")
    .eq("user_id", user_id);

  if (data != null) {
    return data;
  } else {
    throw new Error(error.message);
  }
};
export const addSubject = async ({
  user_id,
  name,
  workspace_id,
}: addSubjectProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subjects")
    .insert({
      name: name,
      workspace_id: workspace_id,
      user_id: user_id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteSubject = async (subject_id: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("subjects")
    .delete()
    .eq("id", subject_id);

  if (error) {
    throw new Error(error.message);
  }
};
