import { validateApiKey } from "@/utils/public-api/validate-query";
import { AskAIChat } from "@/utils/supabase/rag/chat/supabase-hybrid/ask";
import { type NextRequest } from "next/server";
import { ApiChatQueryResponse } from "../types";
import { ApiErrorResponse } from "../../types";
export const revalidate = 30;

/**
 * @swagger
 * /api/chat/query:
 *   get:
 *     description: Returns a chat response
 *     responses:
 *       200:
 *         description: Chat response from the AI
 *       400:
 *         description: Multiple errors possible, please check error message
 *       401:
 *         description: Api key passed is not valid
 */
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
      const stream = searchParams.get("stream") === "true";

      if (!message) {
        const errorResponse: ApiErrorResponse = {
          error: "Message is required",
          status: 400,
        };
        return new Response(JSON.stringify(errorResponse), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const response = await AskAIChat({
        user_id: userIdForKey,
        workspace_id: "public", // Using "public" for API requests
        message,
        is_from_widget: false,
        stream,
        subject_id,
      });

      // If it's already a Response object (from streaming), return it directly
      if (response instanceof Response) {
        return response;
      }

      // Otherwise wrap the string response in a Response object
      return new Response(response, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } else {
    const unauthorizedResponse: ApiErrorResponse = {
      error: "Invalid API key",
      status: 401,
    };
    return new Response(JSON.stringify(unauthorizedResponse), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
