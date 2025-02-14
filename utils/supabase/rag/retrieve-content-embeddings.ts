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

  const retriever = vectorStore.asRetriever({
    filter: subject_id ? funcFilter : undefined,
    k: 20,
    verbose: true,
    searchType: "mmr",
  });
  const results = await retriever.invoke(query);
  return results;
};
