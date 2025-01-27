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
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
