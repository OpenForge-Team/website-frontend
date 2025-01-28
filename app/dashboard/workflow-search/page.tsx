"use client";
import WorkflowSearch from "@/components/workflow-search";
import { getUser } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import { getWorkflows } from "@/utils/supabase/workflows";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Workflows } from "@/utils/supabase/workflows";

export default function WorkflowSearchPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [workflows, setWorkflows] = useState<Workflows[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const [userResult, workflowsResult] = await Promise.all([
          getUser(supabase),
          getWorkflows()
        ]);
        
        if (userResult) {
          setUser(userResult);
        } else {
          console.log("User not authenticated");
        }
        
        setWorkflows(workflowsResult);
      } catch (error) {
        console.error("Failed to initialize data:", error);
      }
    };
    
    initData();
  }, [supabase]);

  if (!user || workflows.length === 0) return <div></div>;

  return <WorkflowSearch items={workflows} user_id={user.id} />;
}
