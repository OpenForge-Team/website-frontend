"use server";
import { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/server";

export type WorkflowFavorites =
  Database["public"]["Tables"]["workflow_favorites"]["Row"];

export const addWorkflowToFavorites = async (workflow_id: number) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("workflow_favorites")
    .insert({ user_id: user.id, workflow_id: workflow_id });

  if (error) {
    throw new Error(error.message);
  }
};

export const removeWorkflowFromFavorites = async (workflow_id: number) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("workflow_favorites")
    .delete()
    .match({ user_id: user.id, workflow_id });

  if (error) {
    throw new Error(error.message);
  }
};

export const getUserFavoriteWorkflows = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("workflow_favorites")
    .select("workflow_id")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return new Set(
    data
      ?.map((fav) => fav.workflow_id)
      .filter((id): id is number => id !== null) || []
  );
};
