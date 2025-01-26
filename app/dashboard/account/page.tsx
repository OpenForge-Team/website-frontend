"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      <h2 className="text-xl font-bold mb-3">Integrations</h2>
      <div className="grid">
        <Card>
          <CardHeader>Notion</CardHeader>
          <CardContent>
            <Button
              onClick={() =>
                router.push(process.env.NEXT_PUBLIC_NOTION_OAUTH_URL!)
              }
            ></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
