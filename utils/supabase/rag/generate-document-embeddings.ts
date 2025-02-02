"use server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { createClient } from "@/utils/supabase/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text:v1.5",
  baseUrl: process.env.OLLAMA_BASEURL,
});
interface generateChunksProps {
  document_id: string;
  document_buffer: Blob;
}

export const generateContentChunks = async ({
  document_id,
  document_buffer,
}: generateChunksProps) => {
  const supabase = await createClient();
  //Check if chunks already exist --> delete first
  await supabase
    .from("document_content_embeddings")
    .delete()
    .eq("metadata->>document_id", document_id);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024,
    chunkOverlap: 512,
    separators: ["\n\n", "\n", " ", ""],
  });
  const pdfLoader = new PDFLoader(document_buffer);
  const pdfDocs = await pdfLoader.load();
  const documents = await splitter.splitDocuments(pdfDocs);
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "document_content_embeddings",
    queryName: "match_document_content_embeddings",
  });
  // Add note_id to each document object
  const documentWithNoteIds = documents.map((doc) => ({
    ...doc,
    metadata: { ...(doc.metadata || {}), document_id }, // Add document_id to metadata
  }));

  const res = await vectorStore.addDocuments(documentWithNoteIds);

  return res;
};
