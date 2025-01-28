"use client";

import { useState, useEffect } from "react";
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
import { searchNotion } from "@/utils/notion/auth";

interface NotionSearchResult {
  id: string;
  title: string;
  type: "page" | "database" | "block" | "comment";
}
interface props {
  user_id: string;
}

export function NotionProviderSelect({ user_id }: props) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<NotionSearchResult[]>([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [notionToken, setNotionToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotionToken = async () => {
      try {
        const user = await getProviderUser(user_id, "notion");
        if (user) {
          setNotionToken(user.token);
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

  const searchNotion = async () => {
    if (!notionToken || !searchQuery.trim()) return;

    try {
      const searchResults = await searchNotion(notionToken, searchQuery, selectedResource);
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
      <Select
        value={selectedResource}
        onValueChange={(value) => {
          setSelectedResource(value);
          toast({
            description: `Selected Notion resource: ${value}`,
          });
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

      {selectedResource && (
        <>
          <Input
            placeholder="Search Notion..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.length > 2) {
                searchNotion();
              }
            }}
          />

          {results.length > 0 && (
            <Select
              onValueChange={(value) => {
                toast({
                  description: `Selected item: ${
                    results.find((r) => r.id === value)?.title || value
                  }`,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                {results.map((result) => (
                  <SelectItem key={result.id} value={result.id}>
                    {result.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      )}
    </div>
  );
}
