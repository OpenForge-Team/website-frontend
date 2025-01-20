"use server";
import { R2 } from "node-cloudflare-r2";

const r2 = new R2(
  {
    accountId: process.env.CLOUDFLARE_ACCOUNT!,
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_SECRET!,
  },
  {
    requestChecksumCalculation: "WHEN_REQUIRED",
  }
);
// Initialize bucket instance
const bucket = r2.bucket("openforgevocalnotes");
interface uploadVocalNoteProps {
  note_id: string;
  buffer: Blob;
}
export const uploadVocalNote = async ({
  buffer,
  note_id,
}: uploadVocalNoteProps) => {
  try {
    if (!buffer || !note_id) {
      throw new Error("No Buffer or Note ID!");
    }
    // Convert Blob to ArrayBuffer for upload
    const arrayBuffer = Buffer.from(await buffer.arrayBuffer());
    await bucket.upload(arrayBuffer, `${note_id}.mp3`);
  } catch (error) {
    console.error("Error uploading vocal note:", error);
    throw error;
  }
};
