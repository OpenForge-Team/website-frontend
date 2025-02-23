import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { ProcessEditDialog } from "./process-edit-dialog";

export default memo(({ data, isConnectable }: any) => {
  const handleLabelChange = (newLabel: string) => {
    data.label = newLabel;
  };

  return (
    <>
      <div className="flex w-full max-w-[200px] items-center space-x-2">
        <p className="text-lg">{data.label || "New Process"}</p>
        <ProcessEditDialog 
          label={data.label || ""} 
          onLabelChange={handleLabelChange}
        />
      </div>
      <Handle
        type="target"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </>
  );
});
