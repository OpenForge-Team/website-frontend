import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Instagram from "node-instagram";

const instagram = new Instagram({
  clientId: process.env.INSTAGRAM_APP_ID!,
  clientSecret: process.env.INSTAGRAM_APP_SECRET!,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const error_reason = searchParams.get("error_reason");
  const error_description = searchParams.get("error_description");
  console.log(searchParams);
  if (code) {
    await instagram.authorizeUser(
      code,
      process.env.NEXT_PUBLIC_URL!,
      async (err, data) => {
        if (!err) {
          const supabase = await createClient();
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            const { data: dataProviderUsers, error } = await supabase
              .from("provider_users")
              .upsert({
                provider_name: "instagram",
                user_id: user?.id,
                token: data.access_token,
              });

            if (!error) {
              redirect("/dashboard/account");
            } else {
              console.error("Error saving token:", error);
            }
          }
        }
      }
    );
  }
  return NextResponse.json({ error: "Couldn't save token" }, { status: 500 });
}
