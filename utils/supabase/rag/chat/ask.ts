"use server";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { Ollama } from "@langchain/ollama";
import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { DeepInfraLLM } from "@langchain/community/llms/deepinfra";
import { ChatGroq } from "@langchain/groq";
import { retrieveContext } from "./retrieve";
// const llm = new Ollama({
//   numGpu: 2,
//   numCtx: 16384,
//   baseUrl: process.env.OLLAMA_BASEURL,
//   model: "phi4:14b-q4_K_M",
// });
// const llm = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   model: "o1-mini",
// });
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});
// const llm = new DeepInfraLLM({
//   apiKey: process.env.DEEPINFRA_API_KEY,
//   temperature: 1,
//   maxTokens: 500,
//   model: "meta-llama/Llama-3.3-70B-Instruct",
// });

interface Ask {
  user_id: string;
  workspace_id: string;
  message: string;
}
export const AskAIChat = async ({ user_id, workspace_id, message }: Ask) => {
  const startTime = performance.now();
  let lastTime = startTime;

  const logTiming = (step: string) => {
    const currentTime = performance.now();
    const stepDuration = currentTime - lastTime;
    const totalDuration = currentTime - startTime;
    console.log(`[Timing] ${step}:`);
    console.log(`  Step duration: ${stepDuration.toFixed(2)}ms`);
    console.log(`  Total elapsed: ${totalDuration.toFixed(2)}ms`);
    lastTime = currentTime;
  };

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
    const SYSTEM_TEMPLATE = `Answer the user's questions based on the below context. When referencing documents or notes:
1. Always include the exact title from the metadata
2. Mention the title naturally in the response
3. Only reference documents/notes that contain relevant information

<context>
{context}
</context>

If the context doesn't contain relevant information, respond with "I don't have enough relevant information to answer that question."`;

    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_TEMPLATE],
      new MessagesPlaceholder("messages"),
    ]);

    const documentChain = await createStuffDocumentsChain({
      llm,
      prompt: questionAnsweringPrompt,
    });
    logTiming("Chain creation");
    const { context, sourceList } = await retrieveContext(message);
    logTiming("Context retrieval");

    if (!context || context.length === 0) {
      console.warn("No context found for query:", message);
      return "I couldn't find any relevant information to answer that question.";
    }
    logTiming("Pre-stream preparation");
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
    const sourceMetadata = context.map((doc) => ({
      id: doc.metadata.note_id || doc.metadata.document_id,
      type: doc.metadata.note_id ? "note" : "document",
    }));

    finalResponse += `\n\n${sourceList}`;

    logTiming("Response streaming and formatting");
    const totalTime = performance.now() - startTime;
    console.log(`\n[Timing] Total execution time: ${totalTime.toFixed(2)}ms`);

    return finalResponse;
  } catch (error) {
    console.error("AI Response Error:", error);
    throw new Error(
      `Error generating response: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
