"use server";

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
    return data.results.map((result: any) => ({
      id: result.id,
      title: result.properties?.title?.title?.[0]?.plain_text || "Untitled",
      type: result.object,
    }));
  } catch (error) {
    console.error("Notion search error:", error);
    throw new Error("Failed to search Notion");
  }
}
