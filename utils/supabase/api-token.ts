"use server";

import { createClient } from "./server";

interface checkKeyExistsProps {
  value: string;
}
export const checkKeyExists = async ({
  value,
}: checkKeyExistsProps): Promise<string | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("api_key")
    .select("user_id")
    .eq("value", value)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data ? data.user_id : null;
};
