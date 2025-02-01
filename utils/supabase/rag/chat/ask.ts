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
    const context = [notesContext, documentsContext];
    // Build source variable with metadata (avoiding duplicates)
    let source = "## Information Sources\n\n";
    const uniqueNoteIds = new Set();
    context.forEach((doc, index) => {
      const noteId = doc.metadata.note_id || "Unknown";
      if (!uniqueNoteIds.has(noteId)) {
        uniqueNoteIds.add(noteId);
        source += `- Note ${index}: [View Source](#source-${noteId})\n`;
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

    // Append the source markdown to the final response
    finalResponse += `\n\n${source}`;

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
