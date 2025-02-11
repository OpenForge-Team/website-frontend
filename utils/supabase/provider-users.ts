"use server";
import { Database } from "@/database.types";

import { createClient } from "@/utils/supabase/server";
export type ProviderUsers =
  Database["public"]["Tables"]["provider_users"]["Row"];
export const getProviderUser = async (
  user_id: string,
  provider_name?: string
): Promise<ProviderUsers[] | null> => {
  const supabase = await createClient();
  if (!provider_name) {
    const { data, error } = await supabase
      .from("provider_users")
      .select("*")
      .eq("user_id", user_id);
    if (error) {
      throw new Error(error.message);
    }
    if (data.length < 1) return null;
    return data;
  } else {
    const { data, error } = await supabase
      .from("provider_users")
      .select("*")
      .eq("user_id", user_id)
      .eq("provider_name", provider_name);
    if (error) {
      throw new Error(error.message);
    }
    if (data.length < 1) return null;
    return data;
  }
};

export const deleteProviderUser = async (
  user_id: string,
  provider_name: string
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("provider_users")
    .delete()
    .eq("user_id", user_id)
    .eq("provider_name", provider_name);
  if (error) {
    throw new Error(error.message);
  }
};
