"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Star, StarOff } from "lucide-react";
import { useToast } from "./hooks/use-toast";

interface WorkflowSearchProps {
  items: {
    id: string;
    title: string;
    short_description: string;
    long_description: string;
    steps: number;
  }[];
}

export default function WorkflowSearch({ items }: WorkflowSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [starredItems, setStarredItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const toggleStar = (id: string) => {
    setStarredItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                <CardTitle className="text-lg">{item.title}</CardTitle>
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
                      <DialogTitle>{item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>{item.long_description}</p>
                      <p className="text-sm text-muted-foreground">
                        Number of steps: {item.steps}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                {starredItems.has(item.id) ? (
                  <Star
                    className="h-6 w-6 text-yellow-400 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar(item.id);
                      toast({
                        description: "Removed workflow to favorites",
                      });
                    }}
                  />
                ) : (
                  <StarOff
                    className="h-6 w-6 cursor-pointer hover:text-yellow-400"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar(item.id);
                      toast({
                        description: "Added workflow to favorites",
                      });
                    }}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              {item.short_description}
            </CardContent>
          </Card>
        ))}
      </Card>
    </div>
  );
}
