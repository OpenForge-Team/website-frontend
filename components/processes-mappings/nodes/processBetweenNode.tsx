import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { ProcessEditDialog } from "../process-edit-dialog";

export default memo(({ data, isConnectable }: any) => {
  const handleSave = ({
    label,
    description,
  }: {
    label: string;
    description: string;
  }) => {
    data.label = label;
    data.description = description;
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className="flex w-full max-w-[200px] flex-col">
        <div className="flex items-center space-x-2">
          <p className="text-lg">{data.label || "New Process"}</p>
          <ProcessEditDialog
            label={data.label || ""}
            description={data.description || ""}
            onSave={handleSave}
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </>
  );
});
