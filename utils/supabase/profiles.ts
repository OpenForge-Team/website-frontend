"use server";
import { Database } from "@/database.types";

import { createClient } from "@/utils/supabase/server";
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export const getProfile = async (user_id: string): Promise<Profile | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
