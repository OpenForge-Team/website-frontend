import { validateApiKey } from "@/utils/public-api/validate-query";
import { AskAIChat } from "@/utils/supabase/rag/chat/supabase-hybrid/ask";
import { type NextRequest } from "next/server";
export const revalidate = 30;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  //api key validation
  const api_key = searchParams.get("api_key");

  if (api_key) {
    const userIdForKey = await validateApiKey(api_key);
    if (userIdForKey) {
      //params
      const message = searchParams.get("message");
      const subject_id = searchParams.get("subject_id") || undefined;

      if (!message) {
        return new Response("Message is required", { status: 400 });
      }

      await AskAIChat({
        user_id: userIdForKey,
        workspace_id: "public", // Using "public" for API requests
        message,
        is_from_widget: false,
        stream: false,
        subject_id,
      });

      return new Response("Success", { status: 200 });
    }
  }
}
