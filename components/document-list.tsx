"use client";

import { useState, useEffect } from "react";
import { getDocuments, type Documents } from "@/utils/supabase/documents";
import { FileText } from "lucide-react";

interface DocumentListProps {
  userId: string | undefined;
}

export function DocumentList({ userId }: DocumentListProps) {
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      if (!userId) return;
      try {
        const fetchedDocuments = await getDocuments({ user_id: userId });
        setDocuments(fetchedDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, [userId]);

  if (loading) {
    return <div>Loading documents...</div>;
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md"
        >
          <FileText className="text-gray-500" />
          <div>
            <h3 className="font-semibold">{doc.name}</h3>
            <p className="text-sm text-gray-500">
              File: {doc.name} | Uploaded:{" "}
              {new Date(doc.added_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
      {documents.length === 0 && (
        <p className="text-center text-gray-500">No documents uploaded yet.</p>
      )}
    </div>
  );
}
