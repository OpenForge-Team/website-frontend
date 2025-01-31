"use client";

import { useState, useEffect } from "react";
import { getSubjects } from "@/utils/supabase/subjects";
import { SubjectCard } from "./subject-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/utils/queries";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export function SubjectsView() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserCall = async () => {
      const user = await getUser(supabase);
      if (user) {
        setUser(user);
      } else {
        console.log("User not authenticated");
      }
    };
    getUserCall();
  }, [supabase]);
  useEffect(() => {
    async function fetchSubjects() {
      if (user) {
        try {
          const fetchedSubjects = await getSubjects(user.id);
          setSubjects(fetchedSubjects);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchSubjects();
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
