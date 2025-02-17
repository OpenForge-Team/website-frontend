"use server";
import { createClient } from "./server";

export async function getEmbeddings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("api_queries_message_analytics")
    .select("message_embedding,api_queries!inner(data->>message)");

  if (error) {
    console.error("Error fetching embeddings:", error);
    return [];
  }

  return (
    data?.map((x) => ({
      word: x.api_queries.message,
      // Parse if stored as JSON string, otherwise use directly
      embedding:
        typeof x.message_embedding === "string"
          ? JSON.parse(x.message_embedding)
          : x.message_embedding,
    })) || []
  );
}
