"use server";
import { Client, APIErrorCode } from "@notionhq/client";
import { SearchResponse } from "@notionhq/client/build/src/api-endpoints";

interface searchNotionProps {
  notionToken: string;
  searchQuery?: string;
  pageSize: number;
  resourceType: "page" | "database";
}

export async function searchNotion({
  notionToken,
  searchQuery,
  pageSize,
  resourceType,
}: searchNotionProps): Promise<SearchResponse> {
  if (!notionToken) throw new Error("No Notion token provided!");

  const notion = new Client({
    auth: notionToken,
  });

  try {
    const searchParams: any = {
      filter: {
        property: "object",
        value: resourceType,
      },
      page_size: pageSize,
      sort: {
        timestamp: "last_edited_time",
        direction: "descending",
      },
    };

    if (searchQuery?.trim()) {
      searchParams.query = searchQuery;
    }

    const response: SearchResponse = await notion.search(searchParams);
    return response;
    
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error("Notion object not found:", error);
    } else {
      console.error("Notion search error:", error);
    }
    throw new Error("Failed to search Notion");
  }
}
