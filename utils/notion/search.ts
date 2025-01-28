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
"use server";

interface NotionSearchResult {
  id: string;
  title: string;
  type: "page" | "database" | "block" | "comment";
  url?: string;
}

export async function searchNotion(
  notionToken: string,
  searchQuery: string,
  resourceType: string
): Promise<NotionSearchResult[]> {
  if (!notionToken || !searchQuery.trim()) return [];

  try {
    const response = await fetch("https://api.notion.com/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchQuery,
        filter: {
          property: "object",
          value: resourceType,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to search Notion");
    }

    const data = await response.json();
    
    return data.results.map((result: any) => {
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
        url: result.url
      };
    });
  } catch (error) {
    console.error("Notion search error:", error);
    throw new Error("Failed to search Notion");
  }
}
