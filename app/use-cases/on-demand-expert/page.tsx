import type { Metadata } from "next"
import { CustomButton } from "@/components/ui/custom-button"
import { trackEvent } from "fathom-client"
import React from "react"

export const metadata: Metadata = {
  title: "On-Demand Expert for Every Employee | OpenForge",
  description:
    "Empower your team with an always-on research assistant that instantly retrieves, organizes, and delivers the knowledge they need—eliminating guesswork and turning every employee into an expert.",
}

export default function OnDemandExpertPage() {
  const onDemandExpertUseCase = {
    title: "On-Demand Expert for Every Employee",
    description:
      "Empower your team with an always-on research assistant that instantly retrieves, organizes, and delivers the knowledge they need—eliminating guesswork and turning every employee into an expert.",
    icon: "🧠",
    sections: [
      {
        title: "Turn Information Overload into Instant Insights",
        content:
          "Your team is drowning in information—buried in emails, documents, and scattered knowledge. OpenForge ensures they get the right answers, right when they need them.",
      },
      {
        title: "Smarter Decisions, Without the Guesswork",
        content:
          "No more second-guessing. Employees can instantly retrieve expert-level insights, ensuring they make informed decisions with confidence.",
      },
      {
        title: "Every Employee, an Expert",
        content:
          "Equip your entire workforce with AI-powered expertise. Whether it's a new hire or a senior executive, OpenForge levels the playing field by making critical knowledge easily accessible.",
      },
      {
        title: "Integrated Knowledge, Instantly Actionable",
        content:
          "Your knowledge base, documentation, and past decisions are connected. OpenForge doesn't just retrieve information—it helps employees apply it effectively in real time.",
      },
      {
        title: "The End of Information Silos",
        content:
          "Departments no longer work in isolation. OpenForge ensures insights flow seamlessly across teams, creating a culture of shared expertise and accelerated learning.",
      },
    ],
    ctaText: "Empower Your Team with Instant Expertise",
    ctaLink: "sign-up",
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">{onDemandExpertUseCase.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">
            {onDemandExpertUseCase.title}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
            {onDemandExpertUseCase.description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {onDemandExpertUseCase.sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">{section.title}</h2>
              <p className="mt-2 text-gray-600 font-['Fragment_Mono']">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CustomButton size="lg" asChild>
            <a onClick={()=> {trackEvent(`ctaClick_${onDemandExpertUseCase.ctaLink.split('/').pop()}`, {_value: 4})}} href={onDemandExpertUseCase.ctaLink}>{onDemandExpertUseCase.ctaText}</a>
          </CustomButton>
        </div>
      </main>
    </div>
  )
}