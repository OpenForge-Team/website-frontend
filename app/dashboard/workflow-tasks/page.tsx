import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWorkflowsTasks } from "@/utils/supabase/workflow-tasks";

export default async function WorkflowTasksPage() {
  const tasks = await getWorkflowsTasks();

  return (
    <Table>
      <TableCaption>A list of your workflow tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Workflow</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.workflows?.title}</TableCell>
            <TableCell>{task.workflows?.short_description}</TableCell>
            <TableCell>{task.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
