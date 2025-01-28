"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "./hooks/use-toast";

export function NotionProviderSelect() {
  const { toast } = useToast();

  return (
    <div className="space-y-2">
      <Select
        onValueChange={(value) => {
          toast({
            description: `Selected Notion resource: ${value}`,
          });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Notion resource" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pages">Pages</SelectItem>
          <SelectItem value="databases">Databases</SelectItem>
          <SelectItem value="blocks">Blocks</SelectItem>
          <SelectItem value="comments">Comments</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
