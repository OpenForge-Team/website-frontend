"use server";
import {
  SupabaseFilterRPCCall,
  SupabaseVectorStore,
} from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { createClient } from "@/utils/supabase/server";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";
import { getDocumentsChunks } from "../document_content_embeddings";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { getDocumentBySubjectId, getDocuments } from "../documents";
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text:v1.5",
  baseUrl: process.env.OLLAMA_BASEURL,
});
interface retrieveChunksProps {
  document_id?: string;
  query: string;
  user_id: string;
  subject_id?: string;
}

export const retrieveDocumentContentChunks = async ({
  document_id,
  query,
  user_id,
  subject_id,
}: retrieveChunksProps) => {
  const supabase = await createClient();

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "document_content_embeddings",
    queryName: "match_document_content_embeddings",
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
