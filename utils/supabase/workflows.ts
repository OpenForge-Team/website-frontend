"use server";
import { Database } from "@/database.types";

import { createClient } from "@/utils/supabase/server";
export type Workflows = Database["public"]["Tables"]["workflows"]["Row"];

export const getWorkflows = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase.from("workflows").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
