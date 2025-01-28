"use client";
import WorkflowSearch from "@/components/workflow-search";
import { getUser } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import { getWorkflows } from "@/utils/supabase/workflows";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function WorkflowSearchPage() {
  const supabase = createClient();
  const workflows = await getWorkflows();
  const [user, setUser] = useState<User | null>(null);
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

  if (!user) return <div></div>;

  return <WorkflowSearch items={workflows} user_id={user.id} />;
}
