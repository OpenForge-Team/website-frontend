"use client";
import { parseQueries } from "@/utils/ai/analytics/find-subjects";
import { getUser } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

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
    return <div className="p-4">Loading...</div>;
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
              <h2 className="text-secondary text-xl font-semibold mb-3">
                {subject.subject_name}
              </h2>
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
    </div>
  );
}
