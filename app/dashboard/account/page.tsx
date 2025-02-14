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
import { CopyBlock, dracula } from "react-code-blocks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSubjects } from "@/utils/supabase/subjects";

export default function AccountPage() {
  const router = useRouter();
  const [providerUsers, setProviderUsers] = useState<ProviderUsers[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
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
  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user) return;
      try {
        const subjects = await getSubjects(user.id);
        setSubjects(subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [user]);
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold mb-6">Account</h1>
      <h2 className="text-primary text-xl font-bold mb-3">Embed the Chat</h2>
      <p className="text-secondary ">
        Place this snippet anywhere on your website to display the chat
        interface so that your visitors can interact with your knowledge base.
      </p>
      <div className="grid m-4 grid-cols-4 gap-4">
        <div className="col-span-1 my-auto">
          <Select
            value={selectedSubject}
            onValueChange={(val) => {
              setSelectedSubject(val);
              console.log(val);
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>All Subjects</SelectLabel>
                {subjects.map((subject) => {
                  return (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-3">
          {user && (
            <CopyBlock
              text={`<iframe src="https://open-forge.com/widgets/chat?subjectId=${selectedSubject}&userId=${user.id}" width="100%" height="600px"></iframe>`}
              language={"html"}
              showLineNumbers={false}
              theme={dracula}
              codeBlock
              wrapLongLines
            />
          )}
        </div>
      </div>
      <h2 className="text-primary text-xl font-bold mb-3">Integrations</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <h3 className="font-semibold">Notion</h3>
              {loading ? (
                <Skeleton className="h-4 w-[120px]" />
              ) : providerUsers.find((p) => p.provider_name === "notion") ? (
                <p className="text-sm text-muted-foreground">Connected</p>
              ) : (
                <p className="text-sm text-muted-foreground">Not connected</p>
              )}
            </div>
            {loading ? (
              <Skeleton className="h-9 w-24" />
            ) : providerUsers.find((p) => p.provider_name === "notion") ? (
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteProviderUser(user!.id, "notion");
                  setProviderUsers(
                    providerUsers.filter((p) => p.provider_name !== "notion")
                  );
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
            {providerUsers.find((p) => p.provider_name === "notion") && (
              <p className="text-sm text-muted-foreground">
                Connected since{" "}
                {new Date(
                  providerUsers.find(
                    (p) => p.provider_name === "notion"
                  )!.created_at
                ).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <h3 className="font-semibold">Instagram</h3>
              {loading ? (
                <Skeleton className="h-4 w-[120px]" />
              ) : providerUsers.find((p) => p.provider_name === "instagram") ? (
                <p className="text-sm text-muted-foreground">Connected</p>
              ) : (
                <p className="text-sm text-muted-foreground">Not connected</p>
              )}
            </div>
            {loading ? (
              <Skeleton className="h-9 w-24" />
            ) : providerUsers.find((p) => p.provider_name === "instagram") ? (
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteProviderUser(user!.id, "instagram");
                  setProviderUsers(
                    providerUsers.filter((p) => p.provider_name !== "instagram")
                  );
                }}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={() =>
                  router.push(process.env.NEXT_PUBLIC_INSTAGRAM_OAUTH_URL!)
                }
              >
                Connect
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {providerUsers.find((p) => p.provider_name === "instagram") && (
              <p className="text-sm text-muted-foreground">
                Connected since{" "}
                {new Date(
                  providerUsers.find(
                    (p) => p.provider_name === "instagram"
                  )!.created_at
                ).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
