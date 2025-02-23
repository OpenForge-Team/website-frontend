import React, { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Pencil } from "lucide-react";

export default memo(({ data, isConnectable }: any) => {
  const [labelEditMode, setLabelEditMode] = useState(!data.label);
  const [label, setLabel] = useState(data.label || '');

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleLabelConfirm = () => {
    data.label = label;
    setLabelEditMode(false);
  };

  return (
    <>
      {labelEditMode ? (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Process name"
            value={label}
            onChange={handleLabelChange}
            onKeyDown={(e) => e.key === 'Enter' && handleLabelConfirm()}
            autoFocus
          />
          <Button size={"sm"} onClick={handleLabelConfirm}>
            <Check />
          </Button>
        </div>
      ) : (
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
