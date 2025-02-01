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
  baseUrl: process.env.OLLAMA_BASEURL,
  model: "llama3.1:8b-instruct-q6_K",
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

  try {
    const SYSTEM_TEMPLATE = `Answer the user's questions based on the below context, if documents are relevant, return the metadata of each chunk as a listicle. 
If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know":

<context>
{context}
</context>
`;

    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_TEMPLATE],
      new MessagesPlaceholder("messages"),
    ]);

    const documentChain = await createStuffDocumentsChain({
      llm,
      prompt: questionAnsweringPrompt,
    });
    const notesContext = await retrieveContentChunks({ query: message });
    const documentsContext = await retrieveDocumentContentChunks({
      query: message,
    });
    const context = [...notesContext, ...documentsContext];
    // Build source variable with metadata (avoiding duplicates)
    let source = "## Information Sources\n\n";
    const uniqueSourceIds = new Set();
    context.forEach((doc) => {
      const sourceId =
        doc.metadata.note_id || doc.metadata.document_id || "Unknown";
      if (!uniqueSourceIds.has(sourceId)) {
        uniqueSourceIds.add(sourceId);
        const sourceType = doc.metadata.note_id ? "Note" : "Document";
        source += `- ${sourceType}: [View Source](#source-${sourceId})\n`;
      }
    });

    // Stream the response
    const responseStream = await documentChain.stream({
      messages: [new HumanMessage(message)],
      context: context,
    });

    let finalResponse = "";

    // Collect chunks from the response stream
    for await (const chunk of responseStream) {
      finalResponse += chunk;
    }

    // Add metadata markers to the response
    const sourceMetadata = context.map((doc) => ({
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
    throw new Error("Error generating response.");
  }
};
