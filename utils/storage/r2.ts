"use server";
import { R2 } from "node-cloudflare-r2";

const r2 = new R2({
  accountId: process.env.CLOUDFLARE_ACCOUNT!,
  accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY!,
  secretAccessKey: process.env.CLOUDFLARE_ACCESS_SECRET!,
});
// Initialize bucket instance
const bucket = r2.bucket("openforgevocalnotes");
interface uploadVocalNoteProps {
  note_id: string;
  buffer: Buffer;
}
export const uploadVocalNote = async ({
  buffer,
  note_id,
}: uploadVocalNoteProps) => {
  try {
    await bucket.upload(buffer, `${note_id}.mp3`);
  } catch (error) {
    console.log(error);
  }
};
