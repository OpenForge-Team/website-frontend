"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/utils/date";
import {
  getDocuments,
  type Documents,
  deleteDocument,
} from "@/utils/supabase/documents";
import { FileText } from "lucide-react";
import { DocumentViewer } from "./document-viewer";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
            className="group flex flex-col p-6 bg-background border border-border/40 rounded-lg transition-all hover:border-primary/30 hover:bg-accent/50 duration-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold text-base text-foreground truncate flex-1">
                {doc.name}
              </h3>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">
                Uploaded:{" "}
                {formatDate(doc.added_at, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="flex items-center gap-2 justify-between">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="h-8">
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the document and cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            await deleteDocument({
                              document_id: doc.id,
                              file_name: doc.file_name,
                            });
                            setDocuments((prev) =>
                              prev.filter((d) => d.id !== doc.id)
                            );
                          } catch (error) {
                            console.error("Failed to delete document:", error);
                          }
                        }}
                      >
                        Confirm Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary h-8 px-0 hover:underline"
                  onClick={() => setSelectedDocument(doc)}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {documents.length === 0 && (
        <div className="text-center py-12 bg-muted rounded-lg border border-border/40">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-lg">
            No documents uploaded yet.
          </p>
          <p className="text-muted-foreground/80 text-sm mt-1">
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
