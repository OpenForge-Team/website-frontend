"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addWorkflowToFavorites,
  removeWorkflowFromFavorites,
  getUserFavoriteWorkflows,
} from "@/utils/supabase/workflow-favorite";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Star, StarOff } from "lucide-react";
import { useToast } from "./hooks/use-toast";

import { Workflows } from "@/utils/supabase/workflows";

interface WorkflowSearchProps {
  items: Workflows[];
}

export default function WorkflowSearch({ items }: WorkflowSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [starredItems, setStarredItems] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await getUserFavoriteWorkflows();
        setStarredItems(favorites);
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Failed to load favorites",
        });
      }
    };
    loadFavorites();
  }, [toast]);

  const toggleStar = async (id: number) => {
    try {
      if (starredItems.has(id)) {
        await removeWorkflowFromFavorites(id);
        setStarredItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        toast({
          description: "Removed workflow from favorites",
        });
      } else {
        await addWorkflowToFavorites(id);
        setStarredItems((prev) => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });
        toast({
          description: "Added workflow to favorites",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update favorites",
      });
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Search Workflows</CardTitle>
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </CardHeader>
      </Card>

      <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto mr-2"
                    >
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <p>{item.long_desc}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 font-medium">Input Type</h4>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "WORKFLOW", value: "workflow" },
                              { label: "NOTE", value: "note" },
                              { label: "PROVIDER", value: "provider" },
                            ].map(({ label, value }) => (
                              <Button
                                key={value}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    description: `Selected input type: ${value}`,
                                  });
                                }}
                              >
                                {label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 font-medium">
                            Transformation Type
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "N8N", value: "n8n" },
                              { label: "LLM", value: "llm" },
                            ].map(({ label, value }) => (
                              <Button
                                key={value}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    description: `Selected transformation: ${value}`,
                                  });
                                }}
                              >
                                {label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 font-medium">Output Type</h4>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "WORKFLOW", value: "workflow" },
                              { label: "NOTE", value: "note" },
                              { label: "PROVIDER", value: "provider" },
                              { label: "SMS", value: "sms" },
                              { label: "EMAIL", value: "email" },
                              { label: "TELEGRAM", value: "telegram" },
                              { label: "WHATSAPP", value: "whatsapp" },
                            ].map(({ label, value }) => (
                              <Button
                                key={value}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    description: `Selected output: ${value}`,
                                  });
                                }}
                              >
                                {label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {starredItems.has(item.id) ? (
                  <Star
                    className="h-6 w-6 text-yellow-400 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar(item.id);
                    }}
                  />
                ) : (
                  <StarOff
                    className="h-6 w-6 cursor-pointer hover:text-yellow-400"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar(item.id);
                    }}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              {item.short_desc}
            </CardContent>
          </Card>
        ))}
      </Card>
    </div>
  );
}
