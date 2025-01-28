"use client";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "./hooks/use-toast";
import { getProviderUser } from "@/utils/supabase/provider-users";
import { searchNotion } from "@/utils/notion/search";

interface NotionSearchResult {
  id: string;
  title: string;
  type: "page" | "database" | "block" | "comment";
  url?: string;
}
interface props {
  user_id: string;
  onSelect?: (pageId: string, pageTitle: string) => void;
}

export function NotionProviderSelect({ user_id, onSelect }: props) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<NotionSearchResult[]>([]);
  const [selectedResource, setSelectedResource] = useState<"page" | "database">(
    "page"
  );
  const [notionToken, setNotionToken] = useState<string | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchNotionToken = async () => {
      try {
        const userProvider = await getProviderUser(user_id, "notion");
        console.log(userProvider);
        if (userProvider) {
          setNotionToken(userProvider.token);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Failed to fetch Notion token",
        });
      }
    };
    fetchNotionToken();
  }, [toast]);

  const searchNotionContent = async () => {
    if (!notionToken || !searchQuery.trim()) return;

    try {
      const searchResults = await searchNotion(
        notionToken,
        searchQuery,
        selectedResource
      );
      setResults(searchResults);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to search Notion",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Select
          value={selectedResource}
          onValueChange={(value) => {
            if (value == "page" || value == "database")
              setSelectedResource(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Notion resource" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="page">Pages</SelectItem>
            <SelectItem value="database">Databases</SelectItem>
            <SelectItem value="block">Blocks</SelectItem>
            <SelectItem value="comment">Comments</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedResource && (
        <>
          <Input
            placeholder="Search Notion..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.length > 2) {
                // Clear existing timeout
                if (searchTimeout.current) {
                  clearTimeout(searchTimeout.current);
                }
                // Set new timeout
                searchTimeout.current = setTimeout(() => {
                  searchNotionContent();
                }, 2000);
              }
            }}
          />

          <div className="space-y-4">
            {results.length > 0 && (
              <Select
                onValueChange={(value) => {
                  const selectedItem = results.find((r) => r.id === value);
                  if (selectedItem) {
                    onSelect?.(selectedItem.id, selectedItem.title);
                    toast({
                      description: `Selected: ${selectedItem.title}`,
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent>
                  {results.map((result) => (
                    <SelectItem
                      key={result.id}
                      value={result.id}
                      className="flex flex-col items-start"
                    >
                      <div className="font-medium">{result.title}</div>
                      {result.url && (
                        <div className="text-xs text-gray-500 truncate max-w-[300px]">
                          {result.url}
                        </div>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </>
      )}
    </div>
  );
}
