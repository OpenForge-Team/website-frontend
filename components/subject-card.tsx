"use client";

import { useState } from "react";
import { NoteEditDialog } from "./note-edit-dialog";
import { File, ChevronRight, Trash2 } from "lucide-react";
const mime = require("mime-types");
import { DocumentViewer } from "./document-viewer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    documents?: any[];
    notes?: any[];
  };
  onDelete?: (id: string) => void;
}

export function SubjectCard({ subject, onDelete }: SubjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNote, setSelectedNote] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    id: string;
    file_name: string;
    name: string;
  } | null>(null);
  const documents = subject.documents || [];
  const notes = subject.notes || [];

  return (
    <Card className="bg-secondary hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{subject.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="transition-transform duration-200 ease-in-out"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            <ChevronRight size={20} />
          </Button>
        </CardTitle>
      </CardHeader>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-semibold">Documents</h3>
                {documents.length > 0 ? (
                  <ul className="pl-4 space-y-1">
                    {documents.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex items-center space-x-2"
                        onClick={() => {
                          setSelectedDocument(doc);
                        }}
                      >
                        <File size={16} />
                        <button className="hover:underline">{doc.name}</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No documents yet</p>
                )}
                <h3 className="font-semibold mt-4">Notes</h3>
                {notes.length > 0 ? (
                  <ul className="pl-4 space-y-1">
                    {notes.map((note) => (
                      <li key={note.id} className="flex items-center space-x-2">
                        <File size={16} />
                        <button
                          onClick={() => {
                            setSelectedNote(note);
                            setIsDialogOpen(true);
                          }}
                          className="hover:underline"
                        >
                          {note.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No notes yet</p>
                )}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-end p-4 pt-0">
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(subject.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 size={20} />
          </Button>
        )}
      </div>
      {selectedDocument && (
        <DocumentViewer
          fileName={selectedDocument.file_name}
          fileType={
            mime.lookup(selectedDocument.file_name) ||
            "application/octet-stream"
          }
          onClose={() => setSelectedDocument(null)}
        />
      )}
      <NoteEditDialog
        selectedNote={selectedNote}
        subjectId={subject.id}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNoteUpdated={() => {
          // You might want to add a refresh callback here if needed
        }}
      />
    </Card>
  );
}
