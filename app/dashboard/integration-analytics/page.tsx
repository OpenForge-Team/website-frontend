"use client";
import { parseQueries } from "@/utils/ai/analytics/find-subjects";
import { getUser } from "@/utils/queries";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function IntegrationAnalyticsPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserCall = async () => {
      const user = await getUser(supabase);
      if (user) {
        setUser(user);
        await parseQueries(user.id);
      } else {
        console.log("User not authenticated");
      }
    };
    getUserCall();
  }, [supabase]);

  return <div></div>;
}
