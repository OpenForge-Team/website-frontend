"use server";

import { Json } from "@/database.types";
import { createClient } from "./server";

interface logQueryProps {
  subject_id: string;
  api_key_id: string;
  query_data: Json;
  query_type: string;
  source: string;
}
export const logQuery = async ({
  subject_id,
  api_key_id,
  query_data,
  query_type,
  source,
}: logQueryProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("api_queries").insert({
    subject_id: subject_id,
    api_key_id: api_key_id,
    data: query_data,
    query_type: query_type,
    source: source,
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
    .select("created_at, api_key!inner(value)")
    .eq("api_key.value", api_key_value)
    .eq("query_type", query_type)
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }

  // Process the data to count queries per day
  const queriesPerDay = data.reduce((acc: { [key: string]: number }, query) => {
    const day = new Date(query.created_at).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  // Convert to array format
  return Object.entries(queriesPerDay).map(([day, messages]) => ({
    day,
    messages,
  }));
};
