"use server";
import {
  SupabaseFilterRPCCall,
  SupabaseVectorStore,
} from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { createClient } from "@/utils/supabase/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text:v1.5",
  baseUrl: process.env.OLLAMA_BASEURL,
});
interface retrieveChunksProps {
  note_id?: string;
  query: string;
  subject_id?: string;
}

export const retrieveContentChunks = async ({
  note_id,
  query,
  subject_id,
}: retrieveChunksProps) => {
  const supabase = await createClient();

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "note_content_embeddings",
    queryName: "match_note_content_embeddings",
  });

  const funcFilter: SupabaseFilterRPCCall = (rpc) =>
    rpc.filter("metadata->>subject_id", "eq", subject_id);

  // Perform similarity search (retrieving 20 results initially)
  const resultsWithScore = await vectorStore.similaritySearchWithScore(
    query, // Query string
    30, // Retrieve top 20 for sorting
    subject_id ? funcFilter : undefined // Optional filter
  );

  // Sort results by descending similarity score and take the top 5
  const topResults = resultsWithScore
    .filter(([_, score]) => score > 0.7) // Keep only results with score > 0.5
    .sort((a, b) => b[1] - a[1]) // Sort by highest similarity score
    .slice(0, 5) // Take the top 5 results
    .map(([doc]) => doc); // Extract only Document instances

  // Log top 5 results
  for (const [doc, score] of resultsWithScore) {
    console.log(
      `* [SIM=${score.toFixed(6)}] [${JSON.stringify(doc.metadata, null, 2)}]`
    );
  }

  // ⬇️ Previous method using a retriever (commented out, in case needed later) ⬇️
  /*
  const retriever = vectorStore.asRetriever({
    filter: subject_id ? funcFilter : undefined,
    k: 20,
    verbose: true,
    searchType: "mmr",
  });
  const results = await retriever.invoke(query);
  return results;
  */

  return topResults;
};
