import React, { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Pencil } from "lucide-react";

export default memo(({ data, isConnectable }: any) => {
  const [labelEditMode, setLabelEditMode] = useState(false);
  return (
    <>
      {(!data.label || labelEditMode) && (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Process name"
            value={data.label}
            onChange={(e) => (data.label = e.target.value)}
          />
          <Button size={"sm"} onClick={() => setLabelEditMode(false)}>
            <Check />
          </Button>
        </div>
      )}
      {data.label && !labelEditMode && (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <p className="text-lg">{data.label}</p>
          <Button size={"sm"} onClick={() => setLabelEditMode(true)}>
            <Pencil />
          </Button>
        </div>
      )}
      <Handle
        type="target"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </>
  );
});
