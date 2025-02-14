"use server";

import { createClient } from "./server";

interface checkKeyExistsProps {
  value: string;
}
export const checkKeyExists = async ({
  value,
}: checkKeyExistsProps): Promise<string> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("api_key")
    .select("user_id")
    .eq("value", value);

  if (error) {
    throw new Error(error.message);
  }

  return data ? data[0].user_id : null;
};
