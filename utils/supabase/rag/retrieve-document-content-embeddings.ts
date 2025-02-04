"use server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { createClient } from "@/utils/supabase/server";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text:v1.5",
  baseUrl: process.env.OLLAMA_BASEURL,
});
interface retrieveChunksProps {
  document_id?: string;
  query: string;
}

export const retrieveDocumentContentChunks = async ({
  document_id,
  query,
}: retrieveChunksProps) => {
  const supabase = await createClient();
  const retriever = new SupabaseHybridSearch(embeddings, {
    client: supabase,
    similarityK: 5,
    keywordK: 5,
    tableName: "document_content_embeddings",
    similarityQueryName: "match_document_content_embeddings",
    keywordQueryName: "kw_match_document_content_embeddings",
  });
  const results = await retriever.invoke(query);

  return results;
};
