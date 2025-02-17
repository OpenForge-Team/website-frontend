"use server";
import { Ollama } from "ollama";

const ollama = new Ollama({
  host: process.env.OLLAMA_BASEURL,
});
export async function getEmbedding(input: string): Promise<number[][]> {
  const response = await ollama.embed({
    model: "nomic-embed-text:137m-v1.5-fp16",
    input: input,
  });
  return response.embeddings;
}
