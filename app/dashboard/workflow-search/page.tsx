import WorkflowSearch from "@/components/workflow-search";

const items = [
  {
    id: "icp-generator",
    title: "ICP Generator",
    short_description: "This workflow can help you generate ICPs",
    long_description: "A comprehensive workflow for generating Ideal Customer Profiles (ICPs) using various data sources and analysis methods",
    steps: 3,
    choices: {
      input: [
        { id: "market-data", label: "Market Data" },
        { id: "customer-survey", label: "Customer Survey" },
        { id: "sales-data", label: "Sales Data" }
      ],
      manipulation: [
        { id: "segment", label: "Segment Analysis" },
        { id: "pattern", label: "Pattern Recognition" },
        { id: "cluster", label: "Customer Clustering" }
      ],
      output: [
        { id: "report", label: "ICP Report" },
        { id: "presentation", label: "ICP Presentation" },
        { id: "dashboard", label: "Interactive Dashboard" }
      ]
    }
  }
];
export default function WorkflowSearchPage() {
  return <WorkflowSearch items={items} />;
}
