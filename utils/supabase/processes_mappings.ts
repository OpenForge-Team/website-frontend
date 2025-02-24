"use server";

import { createClient } from "@/utils/supabase/server";

interface saveDiagramProps {
  user_id: string;
  name: string;
  workspace_id: string;
  edges: any;
  nodes: any;
  diagram_id?: string;
}
export const saveDiagram = async ({
  user_id,
  name,
  workspace_id,
  edges,
  nodes,
  diagram_id,
}: saveDiagramProps) => {
  const supabase = await createClient();
  if (diagram_id) {
    const { data, error } = await supabase
      .from("processes_mappings")
      .update({
        name: name,
        edges: edges,
        nodes: nodes,
      })
      .eq("workspace_id", workspace_id)
      .eq("user_id", user_id)
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("processes_mappings")
      .insert({
        name: name,
        edges: edges,
        nodes: nodes,
        workspace_id: workspace_id,
        user_id: user_id,
      })
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
};
