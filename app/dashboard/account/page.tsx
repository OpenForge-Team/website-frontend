"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProviderUser } from "@/utils/supabase/provider-users";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";

export default function AccountPage() {
  const router = useRouter();
  const [providerUser, setProviderUser] = useState<ProviderUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const notionUser = await getProviderUser(user.id, "notion");
        setProviderUser(notionUser);
      } catch (error) {
        console.error("Error checking connection:", error);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      <h2 className="text-xl font-bold mb-3">Integrations</h2>
      <div className="grid">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="font-semibold">Notion</h3>
              <p className="text-sm text-muted-foreground">
                {loading ? (
                  <Skeleton className="h-4 w-[120px]" />
                ) : providerUser ? (
                  "Connected"
                ) : (
                  "Not connected"
                )}
              </p>
            </div>
            {loading ? (
              <Skeleton className="h-9 w-24" />
            ) : providerUser ? (
              <Button variant="destructive">Disconnect</Button>
            ) : (
              <Button
                onClick={() =>
                  router.push(process.env.NEXT_PUBLIC_NOTION_OAUTH_URL!)
                }
              >
                Connect
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {providerUser && (
              <p className="text-sm">
                Connected since {new Date(providerUser.created_at).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
