"use client";

import { useState } from "react";
import Link from "next/link";
import { File, ChevronRight, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  const documents = subject.documents || [];
  const notes = subject.notes || [];

  return (
    <Card className="hover:shadow-md transition-shadow">
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
                      <li key={doc.id} className="flex items-center space-x-2">
                        <File size={16} />
                        <Link
                          href={`/dashboard/knowledge/documents/${doc.id}`}
                          className="hover:underline"
                        >
                          {doc.title}
                        </Link>
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
                        <Link
                          href={`/dashboard/knowledge/notes/${note.id}`}
                          className="hover:underline"
                        >
                          {note.title}
                        </Link>
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
    </Card>
  );
}
