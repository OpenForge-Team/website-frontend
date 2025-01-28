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
  const [allPages, setAllPages] = useState<NotionSearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<NotionSearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<NotionSearchResult | null>(null);
  const [notionToken, setNotionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotionData = async () => {
      try {
        const userProvider = await getProviderUser(user_id, "notion");
        if (userProvider) {
          setNotionToken(userProvider.token);
          const pages = await searchNotion(userProvider.token, "", "page");
          setAllPages(pages);
          setFilteredResults(pages);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Failed to fetch Notion pages",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotionData();
  }, [toast, user_id]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = allPages.filter(page => 
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(allPages);
    }
  }, [searchQuery, allPages]);

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
            placeholder={isLoading ? "Loading pages..." : "Search Notion pages..."}
            onValueChange={setSearchQuery}
            disabled={isLoading}
          />
          <CommandList>
            <CommandEmpty>No pages found.</CommandEmpty>
            <CommandGroup>
              {filteredResults.map((result) => (
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
