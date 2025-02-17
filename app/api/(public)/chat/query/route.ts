import { validateApiKey } from "@/utils/public-api/validate-query";
import { AskAIChat } from "@/utils/supabase/rag/chat/supabase-hybrid/ask";
import { type NextRequest } from "next/server";
import { ApiChatQueryResponse } from "../types";
import { ApiErrorResponse } from "../../types";
import { logQuery } from "@/utils/supabase/api-queries";
export const revalidate = 30;

/**
 * @swagger
 * /api/chat/query:
 *   get:
 *     summary: Get AI chat response
 *     description: Returns a chat response based on the provided message and optional parameters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication (format - Bearer <your_api_key>)
 *         schema:
 *           type: string
 *       - in: query
 *         name: message
 *         required: true
 *         description: The message to send to the AI
 *         schema:
 *           type: string
 *       - in: query
 *         name: subject_id
 *         required: false
 *         description: Optional subject ID to contextualize the chat
 *         schema:
 *           type: string
 *       - in: query
 *         name: stream
 *         required: false
 *         description: Whether to stream the response (true/false)
 *         schema:
 *           type: boolean
 *           default: false
 *     responses:
 *       200:
 *         description: Successful chat response from the AI
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chat_response:
 *                   type: string
 *                   description: The AI's response
 *       400:
 *         description: Bad request - missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                 status:
 *                   type: number
 *                   example: 400
 *       401:
 *         description: Unauthorized - invalid API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid API key"
 *                 status:
 *                   type: number
 *                   example: 401
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  //api key validation
  const auth_header = request.headers.get("Authorization");
  const api_key = auth_header?.replace("Bearer ", "");
  if (api_key) {
    const { user_id, api_key_id } = await validateApiKey(api_key);
    if (user_id) {
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
        user_id: user_id,
        workspace_id: "public", // Using "public" for API requests
        message,
        is_from_widget: false,
        show_sources: false,
        stream,
        subject_id,
      });
      await logQuery({
        subject_id: subject_id ?? "",
        api_key_id: api_key_id,
        query_data: { message: message },
        query_type: "chat",
        source: "api",
      });
      if (typeof response === "string") {
        const validResponse: ApiChatQueryResponse = {
          chat_response: response,
          error: "Invalid API key",
          status: 401,
        };
        return new Response(JSON.stringify(validResponse), {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      } else {
        return new Response(response, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      }
    }
  }
  const unauthorizedResponse: ApiErrorResponse = {
    error: "Invalid API key",
    status: 401,
  };
  return new Response(JSON.stringify(unauthorizedResponse), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
