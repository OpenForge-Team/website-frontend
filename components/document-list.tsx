"use client";

import { useState, useEffect } from "react";
import { getDocuments, type Documents } from "@/utils/supabase/documents";
import { FileText } from "lucide-react";
import { DocumentViewer } from "./document-viewer";

interface DocumentListProps {
  userId: string | undefined;
}

export function DocumentList({ userId }: DocumentListProps) {
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<Documents | null>(
    null
  );
  var mime = require("mime-types");
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <h3 className="font-medium text-lg text-gray-900 truncate flex-1">
                {doc.name}
              </h3>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500">
                Uploaded:{" "}
                {new Date(doc.added_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="flex items-center justify-end space-x-2 mt-2">
                <button
                  onClick={() => setSelectedDocument(doc)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {documents.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No documents uploaded yet.</p>
          <p className="text-gray-400 text-sm mt-1">
            Upload documents to see them listed here
          </p>
        </div>
      )}
      {selectedDocument && (
        <DocumentViewer
          fileName={selectedDocument.file_name}
          fileType={mime.lookup(selectedDocument.file_name)}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}
