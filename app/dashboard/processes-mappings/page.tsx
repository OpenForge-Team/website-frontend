"use client";
import Flow from "@/components/flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Edit } from "lucide-react";
import { useState } from "react";

export default function WorkflowDiagramsPage() {
  const [diagramName, setDiagramName] = useState("");
  const [diagramNameMode, setDiagramNameMode] = useState("view");
  return (
    <div className="w-full h-full">
      <div className="flex w-1/3 items-center space-x-2">
        {diagramNameMode == "view" ? (
          <p className="text-lg min-w-full">{diagramName}</p>
        ) : (
          <Input
            className="min-w-full"
            type="text"
            placeholder="Process name"
            value={diagramName}
            onChange={(e) => {
              setDiagramName(e.target.value);
            }}
          />
        )}

        <Button
          onClick={() => {
            diagramNameMode == "view"
              ? setDiagramNameMode("edit")
              : setDiagramNameMode("view");
          }}
        >
          {diagramNameMode == "view" ? <Edit /> : <Check />}
        </Button>
      </div>
      <div className="w-full h-full">
        <Flow />
      </div>
    </div>
  );
}
