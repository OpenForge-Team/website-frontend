"use server";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createClient } from "@/utils/supabase/server";
import { Ollama } from "@langchain/ollama";
import { retrieveContentChunks } from "../retrieve-content-embeddings";
import { retrieveDocumentContentChunks } from "../retrieve-document-content-embeddings";

const llm = new Ollama({
  numGpu: 2,
  numCtx: 4096,
  baseUrl: process.env.OLLAMA_BASEURL,
  model: "phi4:14b-q4_K_M",
});
interface Ask {
  user_id: string;
  workspace_id: string;
  message: string;
}
export const AskAIChat = async ({ user_id, workspace_id, message }: Ask) => {
  if (!message) {
    throw new Error('Missing "message" in request body.');
  }

  if (!process.env.OLLAMA_BASEURL) {
    throw new Error("Missing OLLAMA_BASEURL environment variable");
  }

  console.log("AI Request:", {
    user_id,
    workspace_id,
    message,
    timestamp: new Date().toISOString(),
  });

  try {
    const SYSTEM_TEMPLATE = `Answer strictly using only the provided context. When referencing information:
- Cite sources inline with [Source: Note/Document Name]
- Only list sources that were actually used in your answer
- Omit sources that didn't contribute meaningful information

<context>
{context}
</context>

If no context is relevant, say "I don't have enough information to answer that."`;

    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_TEMPLATE],
      new MessagesPlaceholder("messages"),
    ]);

    const documentChain = await createStuffDocumentsChain({
      llm,
      prompt: questionAnsweringPrompt,
    });
    const notesContext = await retrieveContentChunks({
      query: message,
      filter: "content,metadata.note_id,metadata.document_id",
    });
    const documentsContext = await retrieveDocumentContentChunks({
      query: message,
      filter: "content,metadata.note_id,metadata.document_id",
    });
    console.log("Notes Context:", notesContext.length);
    console.log("Documents Context:", documentsContext.length);

    const context = [...notesContext, ...documentsContext];
    console.log("Combined Context:", context.length);

    if (!context || context.length === 0) {
      console.warn("No context found for query:", message);
      return "I couldn't find any relevant information to answer that question.";
    }
    // Build source variable with metadata (avoiding duplicates)
    let source = "## Information Sources\n\n";
    const uniqueSourceIds = new Set<string>();

    context.forEach((doc) => {
      // Only include sources that have content and are referenced in metadata
      if (doc.pageContent?.trim() && doc.metadata) {
        const sourceId = doc.metadata.note_id || doc.metadata.document_id;
        if (sourceId && !uniqueSourceIds.has(sourceId)) {
          uniqueSourceIds.add(sourceId);
          const sourceType = doc.metadata.note_id ? "Note" : "Document";
          source += `- ${sourceType}: [View Source](#source-${sourceId})\n`;
        }
      }
    });

    // Stream the response
    const responseStream = await documentChain.stream({
      messages: [new HumanMessage(message)],
      context: context,
    });

    let finalResponse = "";

    try {
      for await (const chunk of responseStream) {
        if (typeof chunk === "string") {
          finalResponse += chunk;
        } else {
          console.warn("Received non-string chunk:", chunk);
        }
      }
    } catch (streamError) {
      console.error("Stream Error:", streamError);
      throw new Error("Failed to process response stream");
    }

    // Add metadata markers to the response
    const sourceMetadata = context
      .filter(doc => doc.metadata && (doc.metadata.note_id || doc.metadata.document_id))
      .map((doc) => ({
        id: doc.metadata.note_id || doc.metadata.document_id,
        type: doc.metadata.note_id ? "note" : "document",
      }));

    finalResponse += `\n\n${source}`;
    finalResponse += `\n<!-- METADATA:${JSON.stringify(sourceMetadata)} -->`;

    return finalResponse;
    // const response = await ollama.chat({
    //   model: "llama3.1:8b-instruct-q6_K",
    //   messages: messages,
    //   stream: true,
    // });
  } catch (error) {
    console.error("AI Response Error:", error);
    throw new Error(
      `Error generating response: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
