"use server";
import { Client, APIErrorCode } from "@notionhq/client";

interface NotionSearchResult {
  id: string;
  title: string;
  type: "page" | "database" | "block" | "comment";
  url?: string;
}

export async function searchNotion(
  notionToken: string,
  searchQuery: string,
  resourceType: "page" | "database"
): Promise<NotionSearchResult[]> {
  if (!notionToken || !searchQuery.trim()) return [];

  const notion = new Client({
    auth: notionToken,
  });

  try {
    const response = await notion.search({
      query: searchQuery,
      filter: {
        property: "object",
        value: resourceType,
      },
      page_size: 100,
      sort: {
        timestamp: "last_edited_time",
        direction: "descending",
      },
    });

    return response.results.map((result: any) => {
      let title = "Untitled";

      if (result.object === "page") {
        // Handle different page property formats
        const properties = result.properties;
        if (properties.title?.title?.[0]?.plain_text) {
          title = properties.title.title[0].plain_text;
        } else if (properties.Name?.title?.[0]?.plain_text) {
          title = properties.Name.title[0].plain_text;
        }
      }

      return {
        id: result.id,
        title: title,
        type: result.object,
        url: result.url,
      };
    });
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error("Notion object not found:", error);
    } else {
      console.error("Notion search error:", error);
    }
    throw new Error("Failed to search Notion");
  }
}
