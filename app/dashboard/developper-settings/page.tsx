"use client";
import ApiUsageChart from "@/components/api-usage-chart";
import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/queries";
import { getQueriesbyDay } from "@/utils/supabase/api-queries";
import { getApiKey } from "@/utils/supabase/api-token";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

export default function DevelopperSettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [queriesbyDay, setQueriesbyDay] = useState<[]>([]);
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
  useEffect(() => {
    async function fetchApiKey() {
      if (user) {
        try {
          const apiKey = await getApiKey({ user_id: user.id });
          setApiKey(apiKey);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchApiKey();
  }, [user]);
  useEffect(() => {
    async function getQueries() {
      if (user && apiKey) {
        try {
          const queriesbyDay: any = await getQueriesbyDay({
            api_key_value: apiKey,
            query_type: "chat",
          });
          setQueriesbyDay(queriesbyDay);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    getQueries();
  }, [user, apiKey]);
  const router = useRouter();
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold mb-6">
        Developper Center
      </h1>
      <div className="space-y-2">
        <div>
          <h2 className="text-primary text-xl font-bold mb-3">Api Docs</h2>
          <Button
            className="bg-secondary"
            onClick={() => window.open("/api/docs", "_blank")}
          >
            View Docs
          </Button>
        </div>
        <div>
          <h2 className="text-primary text-xl font-bold mb-3">Api Key</h2>
          {apiKey && (
            <div className="max-w-min">
              <CopyBlock
                text={apiKey}
                language={"text"}
                showLineNumbers={false}
                theme={dracula}
                codeBlock
                wrapLongLines
              />
            </div>
          )}
        </div>
        <div>
          <h2 className="text-primary text-xl font-bold mb-3">Usage</h2>
          <div>
            <h3 className="text-primary text-md font-bold mb-3">
              Chat Requests (Daily)
            </h3>
            <div>
              {queriesbyDay && <ApiUsageChart chartData={queriesbyDay} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
