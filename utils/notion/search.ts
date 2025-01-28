"use server";
import { Client, APIErrorCode } from "@notionhq/client";
interface NotionSearchResult {
  id: string;
  title: string;
  type: "page" | "database" | "block" | "comment";
}

export async function searchNotion(
  notionToken: string,
  searchQuery: string,
  resourceType: string
): Promise<NotionSearchResult[]> {
  if (!notionToken || !searchQuery.trim()) return [];
  // Initializing a client
  const notion = new Client({
    auth: notionToken,
  });
  try {
    const response = await notion.search({
      auth: notionToken,
      query: searchQuery,
      filter: {
        property: "object",
        value: "page",
      },
    });
    console.log(response);
    return response.results.map((result: any) => ({
      id: result.id,
      title: result.properties?.title?.title?.[0]?.plain_text || "Untitled",
      type: result.object,
    }));
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      //
      // For example: handle by asking the user to select a different database
      //
    } else {
      // Other error handling code
      console.error(error);
    }
    throw new Error("Failed to search Notion");
  }
}
