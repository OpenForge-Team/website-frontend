"use client";
import { parseQueries } from "@/utils/ai/analytics/find-subjects";
import { generateBlogPost } from "@/utils/ai/generation/blog-post";
import { getUser } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubjectData {
  subject_id: number;
  subject_name: string;
  messages: string[];
}

export default function IntegrationAnalyticsPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingPost, setGeneratingPost] = useState<number | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<string>("");

  const handleDownload = () => {
    if (generatedContent && currentSubject) {
      const element = document.createElement("a");
      const file = new Blob([generatedContent], { type: "text/markdown" });
      element.href = URL.createObjectURL(file);
      element.download = `${currentSubject.toLowerCase().replace(/\s+/g, "-")}-blog-post.md`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleGeneratePost = async (subject: SubjectData) => {
    try {
      setGeneratingPost(subject.subject_id);
      setCurrentSubject(subject.subject_name);
      const content = await generateBlogPost(
        500,
        subject.subject_name,
        subject.messages
      );
      setGeneratedContent(content);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error generating blog post:", error);
    } finally {
      setGeneratingPost(null);
    }
  };

  useEffect(() => {
    const getUserCall = async () => {
      try {
        const user = await getUser(supabase);
        if (user) {
          setUser(user);
          const results: any = await parseQueries(user.id);
          setSubjectData(results);
        } else {
          console.log("User not authenticated");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserCall();
  }, [supabase]);

  if (loading) {
    return <div className="text-secondary p-4">Loading...</div>;
  }

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-primary text-2xl font-bold mb-6">
        Integration Analytics
      </h1>
      {subjectData.length === 0 ? (
        <p className="text-secondary">No data available</p>
      ) : (
        <div className="space-y-6">
          {subjectData.map((subject) => (
            <div
              key={subject.subject_id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-secondary text-xl font-semibold">
                  {subject.subject_name}
                </h2>
                <Button
                  className="text-secondary"
                  variant="outline"
                  size="sm"
                  onClick={() => handleGeneratePost(subject)}
                  disabled={generatingPost === subject.subject_id}
                >
                  {generatingPost === subject.subject_id
                    ? "Generating..."
                    : "Generate Blog Post"}
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-2">
                  {subject.messages.length} mentions
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  {subject.messages.map((message, index) => (
                    <li key={index} className="text-gray-700">
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto [&>button]:text-secondary">
          <DialogHeader>
            <DialogTitle className="text-primary">
              Generated Blog Post - {currentSubject}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex justify-start gap-2 mb-4">
              <Button
                className="text-secondary"
                onClick={() =>
                  navigator.clipboard.writeText(generatedContent || "")
                }
                variant="outline"
              >
                Copy Content
              </Button>
              <Button
                className="text-secondary"
                onClick={handleDownload}
                variant="outline"
              >
                Download as Markdown
              </Button>
            </div>
            <pre className="text-secondary whitespace-pre-wrap text-sm p-4 rounded-lg">
              {generatedContent}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
