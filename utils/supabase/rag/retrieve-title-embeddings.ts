"use server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
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
  note_id: string;
  query: string;
}

export const retrieveTitleChunks = async ({
  note_id,
  query,
}: retrieveChunksProps) => {
  const supabase = await createClient();
  const retriever = new SupabaseHybridSearch(embeddings, {
    client: supabase,
    similarityK: 5,
    keywordK: 5,
    tableName: "note_title_embeddings",
    similarityQueryName: "match_note_title_embeddings",
    keywordQueryName: "kw_match_note_title_embeddings",
  });
  const results = await retriever.invoke(query);

  return results;
};
