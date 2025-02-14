import { validateApiKey } from "@/utils/public-api/validate-query";
import { getSubjects } from "@/utils/supabase/subjects";
import { type NextRequest } from "next/server";
import { ApiErrorResponse } from "../../types";

interface ApiSubjectsListResponse {
  subjects: {
    id: string;
    name: string;
  }[];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  //api key validation
  const api_key = searchParams.get("api_key");

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

  const userIdForKey = await validateApiKey(api_key);
  if (!userIdForKey) {
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
    const subjects = await getSubjects(userIdForKey);
    
    const response: ApiSubjectsListResponse = {
      subjects: subjects.map(subject => ({
        id: subject.id,
        name: subject.name
      }))
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
