import type { Metadata } from "next"
import { FeaturePageTemplate } from "@/components/feature-page-template"

export const metadata: Metadata = {
  title: "Unified I/O Channels | OpenForge",
  description:
    "The central hub for all incoming and outgoing communications—internal and external—ensuring every message, update, and notification is never lost.",
}

export default function UnifiedIOPage() {
  const unifiedIOFeature = {
    title: "Unified I/O Channels",
    description:
      "The central hub for all incoming and outgoing communications—internal and external—ensuring every message, update, and notification is never lost.",
    icon: "📡",
    sections: [
      {
        title: "One Inbox for All Communications",
        content:
          "Manage emails, messages, and updates from all channels in a single, streamlined interface. No more switching between apps—your unified inbox keeps everything in sync.",
      },
      {
        title: "AI-Powered Assistance at Your Fingertips",
        content:
          "Your AI assistant can read, summarize, and respond to messages, leveraging existing knowledge from your CRM ('Rolodex') and internal knowledge base to ensure context-aware communication.",
      },
      {
        title: "Seamless Workflow Integration",
        content:
          "Turn messages into actions—whether it's routing customer inquiries, assigning tasks, or updating records, Unified I/O ensures every interaction is connected to the right workflow.",
      },
      {
        title: "Smart Notifications & Updates",
        content:
          "Reduce noise while staying informed—automated summaries and intelligent notifications ensure only relevant updates reach the right people at the right time.",
      },
      {
        title: "Manual, Supervised AI, or Full Autopilot",
        content:
          "Control how AI interacts with your communications—manually handle messages, use AI suggestions, or enable full automation for hands-free efficiency.",
      },
    ],
    ctaText: "Experience Unified I/O",
    ctaLink: "/features/unified-io",
  }

  return <FeaturePageTemplate feature={unifiedIOFeature} />
}

