import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  if (code) {
    const clientId = process.env.NOTION_OAUTH_CLIENT_ID;
    const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_NOTION_OAUTH_URL;

    // Ensure redirectUri is defined and matches the one used in the initial authorization request
    if (!redirectUri) {
      return NextResponse.json(
        { error: "Redirect URI not configured" },
        { status: 500 }
      );
    }

    // encode in base 64
    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.NOTION_OAUTH_REDIRECT_URI!, // Use the redirect_uri from environment variables
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (!responseData.error) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase.from("provider_users").upsert({
          provider_name: "notion",
          user_id: user?.id,
          token: responseData.access_token,
        });

        if (!error) {
          redirect("/dashboard/account");
        } else {
          console.error("Error saving token:", error);
        }
      }
    }
  }

  return NextResponse.json({ error: "Couldn't save token" }, { status: 500 });
}
