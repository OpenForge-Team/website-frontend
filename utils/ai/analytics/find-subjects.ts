"use server";

import { createClient } from "@/utils/supabase/server";

export async function parseQueries(user_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("api_queries_message_analytics")
    .select(
      `
    api_queries_message_subject_id,
    api_queries!inner (
      data->>message,
      api_key!inner (
        user_id
      )
    ),
    api_queries_message_subjects!inner (
      id,
      name
    )
  `
    )
    .eq("api_queries.api_key.user_id", user_id)
    .not("api_queries_message_subject_id", "is", null);

  console.log(data);
  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  // Process data to group messages by subject_id
  const messageBySubject = data?.reduce((acc, x) => {
    // Create the subject object if it doesn't exist
    if (!acc[x.api_queries_message_subject_id]) {
      acc[x.api_queries_message_subject_id] = {
        subject_id: x.api_queries_message_subject_id,
        subject_name: x.api_queries_message_subjects.name,
        messages: [],
      };
    }

    // Add the message to the respective subject's messages array
    acc[x.api_queries_message_subject_id].messages.push(x.api_queries.message);

    return acc;
  }, {});

  // Convert the grouped data into an array
  const result = Object.values(messageBySubject);

  console.log(result);
  return result;
}
