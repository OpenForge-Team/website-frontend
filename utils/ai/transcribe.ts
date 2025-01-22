"use server";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  baseURL: "https://whisper.tedqc.cfd/v1/",
  apiKey: process.env.OPENAI_API_KEY,
});
// Reinitialize OpenAI with standard endpoint
const standardOpenAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const getTranscription = async ({ audio }: { audio: Blob }) => {
  console.log("start trans");
  // Create temporary file
  const tempFilePath = `temp-${Date.now()}.webm`;
  const arrayBuffer = await audio.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(tempFilePath, buffer);
  let transcriptionText = "";
  try {
    const transcriptionResponse: any = await openai.audio.transcriptions.create(
      {
        file: fs.createReadStream(tempFilePath),
        model: "deepdml/faster-whisper-large-v3-turbo-ct2",
        response_format: "text",
      }
    );
    transcriptionText = transcriptionResponse;
    console.log("Transcription:", transcriptionResponse);
    // Clean up temp file
    fs.unlinkSync(tempFilePath);
    return transcriptionText;
  } catch (error) {
    throw new Error("Could not transcribe audio input.");
  }
};
