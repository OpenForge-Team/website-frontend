"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<NotionSearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<NotionSearchResult | null>(null);
  const [notionToken, setNotionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchNotionToken = async () => {
      try {
        const userProvider = await getProviderUser(user_id, "notion");
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
  }, [toast, user_id]);

  const searchNotionContent = async (query: string) => {
    if (!notionToken || !query.trim()) return;
    setIsLoading(true);

    try {
      const searchResults = await searchNotion(notionToken, query, 10, "page");
      setResults(searchResults);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to search Notion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItem ? selectedItem.title : "Select a page..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={
              isLoading ? "Loading pages..." : "Search Notion pages..."
            }
            onValueChange={(value) => {
              setSearchQuery(value);
              if (value.length > 2) {
                if (searchTimeout.current) {
                  clearTimeout(searchTimeout.current);
                }
                searchTimeout.current = setTimeout(() => {
                  searchNotionContent(value);
                }, 500);
              } else {
                setResults([]);
              }
            }}
            disabled={isLoading}
          />
          <CommandList>
            <CommandEmpty>No pages found.</CommandEmpty>
            <CommandGroup>
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.id}
                  onSelect={() => {
                    setSelectedItem(result);
                    onSelect?.(result.id, result.title);
                    setOpen(false);
                    toast({
                      description: `Selected: ${result.title}`,
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItem?.id === result.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <div className="font-medium">{result.title}</div>
                    {result.url && (
                      <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                        {result.url}
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
