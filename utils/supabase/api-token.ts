"use server";

import { createClient } from "./server";

interface checkKeyExistsProps {
  value: string;
}
interface checkKeyExistsReturn {
  user_id: string;
  api_key_id: string;
}
export const checkKeyExists = async ({
  value,
}: checkKeyExistsProps): Promise<checkKeyExistsReturn> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("api_key")
    .select("id, user_id")
    .eq("value", value)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data
    ? { api_key_id: data.id, user_id: data.user_id }
    : { api_key_id: "", user_id: "" };
};

interface getApiKeyProps {
  user_id: string;
}
export const getApiKey = async ({
  user_id,
}: getApiKeyProps): Promise<string | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("api_key")
    .select("value")
    .eq("user_id", user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data ? data.value : null;
};
