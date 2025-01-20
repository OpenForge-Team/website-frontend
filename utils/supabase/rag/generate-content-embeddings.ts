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
interface generateChunksProps {
  note_id: string;
  content: string;
}

export const generateContentChunks = async ({
  note_id,
  content,
}: generateChunksProps) => {
  const supabase = await createClient();
  //Check if chunks already exist --> delete first
  await supabase
    .from("note_content_embeddings")
    .delete()
    .eq("note_id", note_id);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024,
    chunkOverlap: 512,
    separators: ["\n\n", "\n", " ", ""],
  });
  const documents = await splitter.splitDocuments([
    new Document({ pageContent: content }),
  ]);
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "note_content_embeddings",
    queryName: "match_note_content_embeddings",
  });
  // Add note_id to each document object
  const documentWithNoteIds = documents.map((doc) => ({
    ...doc,
    metadata: { ...(doc.metadata || {}), note_id }, // Add note_id to metadata
  }));

  const res = await vectorStore.addDocuments(documentWithNoteIds);

  return res;
};
