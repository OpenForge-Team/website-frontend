import WorkflowSearch from "@/components/workflow-search";
import { getWorkflows } from "@/utils/supabase/workflows";

export default async function WorkflowSearchPage() {
  const workflows = await getWorkflows();
  return <WorkflowSearch items={workflows} />;
}
