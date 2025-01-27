"use server";
import { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/server";

export type WorkflowTasks =
  Database["public"]["Tables"]["workflow_tasks"]["Row"];

export const getWorkflowsTasks = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("workflows").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
