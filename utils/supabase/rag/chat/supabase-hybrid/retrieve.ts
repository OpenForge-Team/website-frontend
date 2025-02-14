"use server";
import { createClient } from "@/utils/supabase/server";
import { retrieveContentChunks } from "../../retrieve-content-embeddings";
import { retrieveDocumentContentChunks } from "../../retrieve-document-content-embeddings";
import { ChatGroq } from "@langchain/groq";
import { LLMGraphTransformer } from "@langchain/community/experimental/graph_transformers/llm";
const getNoteTitle = async (noteId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notes")
    .select("title")
    .eq("id", noteId)
    .single();
  return data?.title || "Untitled Note";
};

const getDocumentTitle = async (documentId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("documents")
    .select("name")
    .eq("id", documentId)
    .single();
  return data?.name || "Untitled Document";
};

export interface RetrievedContext {
  context: any[];
  sourceList: string;
}

export async function retrieveContext(
  message: string,
  user_id: string,
  show_sources: boolean,
  subject_id?: string
): Promise<RetrievedContext> {
  const notesContext = await retrieveContentChunks({
    query: message,
    subject_id: subject_id,
  });
  const documentsContext = await retrieveDocumentContentChunks({
    query: message,
    subject_id: subject_id,
    user_id: user_id,
  });
  const context = [...notesContext, ...documentsContext];

  if (!context || context.length === 0) {
    return {
      context: [],
      sourceList: "",
    };
  }
  if (show_sources) {
    // Build source variable with metadata (avoiding duplicates)
    let sourceList = "## Information Sources\n\n";
    const uniqueSourceIds = new Set();
    const sourceDetails = [];

    // First collect all source metadata
    for (const doc of context) {
      const sourceId = doc.metadata.note_id || doc.metadata.document_id;
      if (sourceId && !uniqueSourceIds.has(sourceId)) {
        uniqueSourceIds.add(sourceId);
        sourceDetails.push({
          id: sourceId,
          type: doc.metadata.note_id ? "note" : "document",
        });
      }
    }

    // Then fetch titles in parallel
    const titlePromises = sourceDetails.map(async (src) => {
      if (src.type === "note") {
        return {
          ...src,
          title: await getNoteTitle(src.id),
        };
      }
      return {
        ...src,
        title: await getDocumentTitle(src.id),
      };
    });

    const sourcesWithTitles = await Promise.all(titlePromises);

    // Build the source list with actual titles
    sourcesWithTitles.forEach((src) => {
      sourceList += `- ${src.type === "note" ? "Note" : "Document"}: [${src.title}](#${src.type}-${src.id})\n`;
    });
    return {
      context,
      sourceList,
    };
  } else {
    return {
      context,
      sourceList: "",
    };
  }
}
