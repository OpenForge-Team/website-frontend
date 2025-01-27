"use server";
import { Database } from "@/database.types";

import { createClient } from "@/utils/supabase/server";
export type Workflows = Database["public"]["Tables"]["workflows"]["Row"];

export const getWorkflows = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("user_id", user_id);

  if (data != null) {
    return data;
  } else {
    throw new Error(error.message);
  }
};
