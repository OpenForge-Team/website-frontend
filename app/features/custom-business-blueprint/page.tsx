import type { Metadata } from "next"
import { FeaturePageTemplate } from "@/components/feature-page-template"

export const metadata: Metadata = {
  title: "Custom Business Blueprint | OpenForge",
  description:
    "A flexible system designed to adapt to your unique business structure, allowing you to model entities and workflows exactly how you operate—without the constraints of rigid systems.",
}

export default function CustomBusinessBlueprintPage() {
  const customBlueprintFeature = {
    title: "Custom Business Blueprint",
    description:
      "A flexible system designed to adapt to your unique business structure, allowing you to model entities and workflows exactly how you operate—without the constraints of rigid systems.",
    icon: "🛠️",
    sections: [
      {
        title: "Model Your Business, Your Way",
        content:
          "Define the entities and domains that matter to your business. Whether it's clients, projects, properties, or any custom resource, your system reflects how you actually operate.",
      },
      {
        title: "Directly Editable from Text",
        content:
          "No complex setup, no rigid templates—just intuitive modeling. Define and adjust your business structure directly from our text editor, ensuring a seamless and dynamic configuration.",
      },
      {
        title: "A System That Grows With You",
        content:
          "Forget rigid ERPs that require costly updates. With our Custom Business Blueprint, your system evolves as your business scales, adapting to new processes and requirements effortlessly.",
      },
      {
        title: "Seamless Workflow & Data Integration",
        content:
          "Link entities to workflows, automate task assignments, and ensure your business logic is directly embedded into your operations—so everything stays connected and efficient.",
      },
      {
        title: "No More One-Size-Fits-All Systems",
        content:
          "Traditional ERPs force businesses into predefined structures. Our solution gives you the freedom to shape your business architecture without limitations or unnecessary complexity.",
      },
    ],
    ctaText: "Design Your Custom Blueprint",
    ctaLink: "/features/custom-business-blueprint",
  }

  return <FeaturePageTemplate feature={customBlueprintFeature} />
}

