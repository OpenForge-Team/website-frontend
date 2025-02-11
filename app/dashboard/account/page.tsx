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
  const [providerUsers, setProviderUsers] = useState<ProviderUsers[]>([]);
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

        const providers = await getProviderUser(user.id);
        setProviderUsers(providers || []);
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
              ) : providerUsers.find(p => p.provider_name === 'notion') ? (
                <p className="text-sm text-muted-foreground">Connected</p>
              ) : (
                <p className="text-sm text-muted-foreground">Not connected</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Instagram</h3>
              {loading ? (
                <Skeleton className="h-4 w-[120px]" />
              ) : providerUsers.find(p => p.provider_name === 'instagram') ? (
                <p className="text-sm text-muted-foreground">Connected</p>
              ) : (
                <p className="text-sm text-muted-foreground">Not connected</p>
              )}
            </div>
            {loading ? (
              <Skeleton className="h-9 w-24" />
            ) : providerUsers.find(p => p.provider_name === 'notion') ? (
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteProviderUser(user!.id, "notion");
                  setProviderUsers(providerUsers.filter(p => p.provider_name !== 'notion'));
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
              {providerUsers.map(provider => (
                <p key={provider.id} className="text-sm">
                  {provider.provider_name} connected since{" "}
                  {new Date(provider.created_at).toLocaleDateString()}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
