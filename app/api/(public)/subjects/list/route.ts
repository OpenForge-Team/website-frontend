import { validateApiKey } from "@/utils/public-api/validate-query";
import { getSubjects } from "@/utils/supabase/subjects";
import { type NextRequest } from "next/server";
import { ApiErrorResponse } from "../../types";

/**
 * @swagger
 * /api/subjects/list:
 *   get:
 *     summary: Get list of subjects
 *     description: Returns a list of subjects with their IDs and names
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication (format - Bearer <your_api_key>)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of subjects successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The subject's unique identifier
 *                       name:
 *                         type: string
 *                         description: The subject's name
 *               example:
 *                 subjects:
 *                   - id: "9411bdb1-4a21-406a-8947-7ca4f7f64966"
 *                     name: "AI Knowledge"
 *                   - id: "51337547-d400-4f0f-a159-83a88ebe36f7"
 *                     name: "Ben's Properties"
 *                   - id: "aae54b1e-741c-41fa-966a-252d645fcca5"
 *                     name: "Gino's Business"
 *       400:
 *         description: Bad request - missing API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "API key is required"
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
 *       500:
 *         description: Server error while fetching subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch subjects"
 *                 status:
 *                   type: number
 *                   example: 500
 */

interface ApiSubjectsListResponse {
  subjects: {
    id: string;
    name: string;
  }[];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  //api key validation
  const auth_header = request.headers.get("Authorization");
  const api_key = auth_header?.replace("Bearer ", "");

  if (!api_key) {
    const errorResponse: ApiErrorResponse = {
      error: "API key is required",
      status: 400,
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { user_id, api_key_id } = await validateApiKey(api_key);
  if (!user_id) {
    const unauthorizedResponse: ApiErrorResponse = {
      error: "Invalid API key",
      status: 401,
    };
    return new Response(JSON.stringify(unauthorizedResponse), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const subjects = await getSubjects(user_id);
    const response: ApiSubjectsListResponse = {
      subjects: subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
      })),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorResponse: ApiErrorResponse = {
      error: "Failed to fetch subjects",
      status: 500,
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
