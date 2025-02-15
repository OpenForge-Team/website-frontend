"use server";

import { Json } from "@/database.types";
import { createClient } from "./server";

interface logQueryProps {
  subject_id: string;
  api_key_id: string;
  query_data: Json;
  query_type: Json;
}
export const logQuery = async ({
  subject_id,
  api_key_id,
  query_data,
  query_type,
}: logQueryProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("api_queries").insert({
    subject_id: subject_id,
    api_key_id: api_key_id,
    data: query_data,
    query_type: query_type,
  });

  if (error) {
    throw new Error(error.message);
  }
};
interface getQueriesbyDayProps {
  api_key_value: string;
  query_type: string;
}
export const getQueriesbyDay = async ({
  api_key_value,
  query_type,
}: getQueriesbyDayProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("api_queries")
    .select("date:created_at::date, count:created_at", { count: 'exact' })
    .eq("api_key.value", api_key_value)
    .eq("query_type", query_type)
    .group('created_at::date')
    .order('created_at::date');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
