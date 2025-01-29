"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  deleteProviderUser,
  getProviderUser,
  ProviderUsers,
} from "@/utils/supabase/provider-users";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function AccountPage() {
  const router = useRouter();
  const [providerUser, setProviderUser] = useState<ProviderUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        setUser(user);

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
              {loading ? (
                <Skeleton className="h-4 w-[120px]" />
              ) : providerUser ? (
                <p className="text-sm text-muted-foreground">Connected</p>
              ) : (
                <p className="text-sm text-muted-foreground">"Not connected"</p>
              )}
            </div>
            {loading ? (
              <Skeleton className="h-9 w-24" />
            ) : providerUser ? (
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteProviderUser(user!.id, "notion");
                }}
              >
                Disconnect
              </Button>
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
            <div>
              {providerUser && (
                <p className="text-sm">
                  Connected since{" "}
                  {new Date(providerUser.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
