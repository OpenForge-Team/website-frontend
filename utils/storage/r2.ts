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
const bucketVocal = r2.bucket("openforgevocalnotes");
interface uploadVocalNoteR2Props {
  note_id: string;
  buffer: Blob;
}
export const uploadVocalNoteR2 = async ({
  buffer,
  note_id,
}: uploadVocalNoteR2Props) => {
  try {
    if (!buffer || !note_id) {
      throw new Error("No Buffer or Note ID!");
    }
    // Convert Blob to ArrayBuffer for upload
    const arrayBuffer = Buffer.from(await buffer.arrayBuffer());
    await bucketVocal.upload(arrayBuffer, `${note_id}.mp3`);
  } catch (error) {
    console.error("Error uploading vocal note:", error);
    throw error;
  }
};
const bucketDocuments = r2.bucket("openforgedocuments");
interface uploadDocumentProps {
  file_name: string;
  buffer: Blob;
}
export const uploadDocumentR2 = async ({
  buffer,
  file_name,
}: uploadDocumentProps) => {
  try {
    if (!buffer || !file_name) {
      throw new Error("No Buffer or Note ID!");
    }
    // Convert Blob to ArrayBuffer for upload
    const arrayBuffer = Buffer.from(await buffer.arrayBuffer());
    await bucketDocuments.upload(arrayBuffer, `${file_name}`);
  } catch (error) {
    console.error("Error uploading vocal note:", error);
    throw error;
  }
};
export const getDocumentUrl = async (file_name: string) => {
  try {
    const exists = await bucketDocuments.objectExists(file_name);
    if (exists) {
      const url = await bucketDocuments.getObjectSignedUrl(file_name, 3600);
      return url;
    } else {
      throw new Error("The object doesn't exist with filename" + file_name);
    }
  } catch (error) {
    console.error("Error getting document URL:", error);
    throw error;
  }
};

interface deleteDocumentR2Props {
  file_name: string;
}

export const deleteDocumentR2 = async ({
  file_name,
}: deleteDocumentR2Props) => {
  try {
    await bucketDocuments.deleteObject(file_name);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
