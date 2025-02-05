"use client";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function PrelaunchPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div className="min-h-screen grid grid-cols-1 items-center bg-background p-4 m-auto">
      <div className="m-auto">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Thank you for your interest! We will email you within 24 business
              hours with details about prelaunch access.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="m-auto">
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/");
          }}
        >
          <LogOut />
          Log out
        </Button>
      </div>
    </div>
  );
}
