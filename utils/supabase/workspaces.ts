"use server";

import { createClient } from "@/utils/supabase/server";
interface addWorkspaceProps {
  user_id: string;
  name: string;
}
export const getWorkspaces = async (user_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workspaces")
    .select("id, name")
    .eq("owner_user_id", user_id);
  if (error) {
    if (error.code === "23505") {
      // Postgres unique constraint violation code
      throw new Error("A workspace with this name already exists");
    }
    throw new Error(error.message);
  }
  return data;
};

export const addWorkspace = async ({ user_id, name }: addWorkspaceProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workspaces")
    .insert({ name: name, owner_user_id: user_id })
    .select()
    .single();

  if (error) {
    if (error.code == "23505")
      throw new Error("A workspace with this name already exists");
    throw new Error(error.message);
  }
  return data;
};
