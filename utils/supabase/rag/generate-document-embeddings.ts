"use server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { createClient } from "@/utils/supabase/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";
import { TextLoader } from "langchain/document_loaders/fs/text";
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text:v1.5",
  baseUrl: process.env.OLLAMA_BASEURL,
});
interface generateChunksProps {
  mime_type: string;
  document_id: string;
  document_buffer: Blob;
}

export const generateContentChunks = async ({
  mime_type,
  document_id,
  document_buffer,
}: generateChunksProps) => {
  const supabase = await createClient();
  //Check if chunks already exist --> delete first
  await supabase
    .from("document_content_embeddings")
    .delete()
    .eq("metadata->>document_id", document_id);
  var splitter;
  var documents;
  switch (mime_type) {
    case "pdf": {
      splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1024,
        chunkOverlap: 512,
        separators: ["\n\n", "\n", " ", ""],
      });
      const pdfLoader = new PDFLoader(document_buffer);
      const pdfDocs = await pdfLoader.load();
      documents = await splitter.splitDocuments(pdfDocs);
      break;
    }
    case "markdown": {
      splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1024,
        chunkOverlap: 512,
        separators: [
          "\n###### ", // Headers first (level 6)
          "\n##### ",
          "\n#### ",
          "\n### ",
          "\n## ",
          "\n# ", // Level 1 header
          "\n```\n", // Code blocks
          "\n- ", // List items
          "\n* ",
          "\n1. ",
          "\n\n", // Paragraphs
          "\n", // New lines
          " ", // Words
          "",
        ],
      });
      const textLoader = new TextLoader(document_buffer);
      const textDocs = await textLoader.load();
      documents = await splitter.splitDocuments(textDocs);
      break;
    }
  }
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "document_content_embeddings",
    queryName: "match_document_content_embeddings",
  });
  if (documents) {
    // Add note_id to each document object
    const documentWithNoteIds = documents.map((doc) => ({
      ...doc,
      metadata: { ...(doc.metadata || {}), document_id }, // Add document_id to metadata
    }));

    const res = await vectorStore.addDocuments(documentWithNoteIds);

    return res;
  } else {
    return [];
  }
};
