import WorkflowSearch from "@/components/workflow-search";

const items = [
  {
    id: "jesus",
    title: "ez",
    short_description: "This workflow can help you generate ICPs",
    long_description: "This workflow can help you generate ICPs",
    steps: 3,
  },
];
export default function WorkflowSearchPage() {
  return <WorkflowSearch items={items} />;
}
