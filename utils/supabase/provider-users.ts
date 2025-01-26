"use server";
import { Database } from "@/database.types";

import { createClient } from "@/utils/supabase/server";
export type ProviderUsers =
  Database["public"]["Tables"]["provider_users"]["Row"];
export const getProviderUser = async (
  user_id: string,
  provider_name: string
): Promise<ProviderUsers | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("provider_users")
    .select("*")
    .eq("id", user_id)
    .eq("provider_name", provider_name)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
