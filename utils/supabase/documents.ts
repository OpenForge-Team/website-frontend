"use server";
import type { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import {
  deleteDocumentR2,
  uploadDocumentR2,
  uploadVocalNoteR2,
} from "@/utils/storage/r2";
import crypto from "crypto";
import { generateContentChunks } from "./rag/generate-document-embeddings";
var mime = require("mime-types");
export type Documents = Database["public"]["Tables"]["documents"]["Row"];
interface GetDocumentsProps {
  user_id: string;
}

export const getDocuments = async ({ user_id }: GetDocumentsProps) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

interface UploadDocumentProps {
  user_id: string;
  subject_id: string;
  file: File;
}

export const uploadDocument = async ({
  user_id,
  subject_id,
  file,
}: UploadDocumentProps) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const fileBuffer = await file.arrayBuffer();
  const blob = new Blob([fileBuffer], { type: file.type });
  const file_name = crypto.randomUUID();
  const extension = mime.extension(file.type);
  // Create document record in the database
  const { data, error } = await supabase
    .from("documents")
    .insert({
      user_id,
      subject_id,
      name: file.name,
      file_name: `${file_name}.${extension}`,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  try {
    //Upload file to R2
    await uploadDocumentR2({
      file_name: file_name + "." + extension,
      buffer: blob,
    });

    // Generate embeddings with the text content
    generateContentChunks({
      document_id: data.id,
      document_buffer: blob,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
  return data;
};

interface DeleteDocumentProps {
  document_id: string;
  file_name: string;
}

export const getDocumentById = async (documentId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteDocument = async ({
  document_id,
  file_name,
}: DeleteDocumentProps) => {
  const supabase = await createClient();

  // Delete from database
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", document_id);

  if (error) {
    throw new Error(error.message);
  }

  // Delete from R2 storage
  await deleteDocumentR2({ file_name });
};
