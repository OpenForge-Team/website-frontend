import type { Metadata } from "next";
import { ArenasView } from "@/components/subjects-view";

export const metadata: Metadata = {
  title: "Subjects | Knowledge Dashboard",
  description: "View and manage your subjects, documents, and notes",
};

export default function ArenasPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Subjects</h1>
      <ArenasView />
    </div>
  );
}
