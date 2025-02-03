import type { Metadata } from "next"
import { FeaturePageTemplate } from "@/components/feature-page-template"

export const metadata: Metadata = {
  title: "Ever-Growing Knowledge Base | OpenForge",
  description:
    "A dynamic hub where all your business knowledge is connected to resources, departments, and operational arenas, ensuring information remains consistent, actionable, and always up to date.",
}

export default function KnowledgeBasePage() {
  const knowledgeBaseFeature = {
    title: "Ever-Growing Knowledge Base",
    description:
      "A dynamic hub where all your business knowledge is connected to resources, departments, and operational arenas, ensuring information remains consistent, actionable, and always up to date.",
    icon: "📖",
    sections: [
      {
        title: "Your Business's Single Source of Truth",
        content:
          "Eliminate knowledge gaps and outdated documents. All business knowledge is centralized, structured, and connected to the right teams, workflows, and resources.",
      },
      {
        title: "Self-Updating, Always Current",
        content:
          "New information—whether from document updates or permissioned communication channels—automatically propagates across the knowledge base, updating relevant documents in real time.",
      },
      {
        title: "Intelligent Rules & Automation",
        content:
          "Define rules to control how knowledge updates flow—link updates to workflows, trigger document revisions, or automate actions like creating tickets, assigning tasks, and scheduling events.",
      },
      {
        title: "Seamless Integration with Workflows",
        content:
          "Your knowledge base doesn't just store information—it powers execution. Connect insights directly to processes, ensuring teams always act with the most relevant, updated knowledge.",
      },
      {
        title: "Permissioned Access & Secure Distribution",
        content:
          "Ensure the right people see the right information at the right time. Set granular permissions for departments, teams, or individuals to control how knowledge is shared and updated.",
      },
    ],
    ctaText: "See the Knowledge Base in Action",
    ctaLink: "/features/knowledge-base",
  }

  return <FeaturePageTemplate feature={knowledgeBaseFeature} />
}

