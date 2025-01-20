import WorkflowFavorites from "@/components/workflow-favorites";
const items = [
  {
    id: "jesus",
    title: "ez",
    short_description: "This workflow can help you generate ICPs",
    long_description: "This workflow can help you generate ICPs",
    steps: 3,
  },
];
export default function WorkflowFavoritesPage() {
  return <WorkflowFavorites items={items} />;
}
