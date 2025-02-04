import type { Metadata } from "next"
import { CustomButton } from "@/components/ui/custom-button"
import { trackEvent } from "fathom-client"
import React from "react"

export const metadata: Metadata = {
  title: "Automated Communications | OpenForge",
  description:
    "Stop wasting time on pointless meetings—Keep Your Team Aligned Effortlessly. Incoming information is automatically documented, summarized, and shared with the right stakeholders, ensuring everyone stays informed without the noise.",
}

export default function AutomatedCommunicationsPage() {
  const automatedCommsUseCase = {
    title: "Automated Communications",
    description:
      "Stop wasting time on pointless meetings—Keep Your Team Aligned Effortlessly. Incoming information is automatically documented, summarized, and shared with the right stakeholders, ensuring everyone stays informed without the noise.",
    icon: "📨",
    sections: [
      {
        title: "Real-Time, Context-Aware Alerts",
        content:
          "No more manual follow-ups. If a pivot is discussed in a meeting and someone says, 'Let's alert marketing,' the system will instantly notify the marketing team—ensuring immediate alignment.",
      },
      {
        title: "Smart, Stakeholder-Aware Messaging",
        content:
          "Your knowledge base and Rolodex track who needs to know what. When an update is made—like a product spec change—relevant teams receive timely, structured updates without redundant noise.",
      },
      {
        title: "Eliminate Status Meetings & Repetitive Updates",
        content:
          "Reduce unnecessary back-and-forth by ensuring that key decisions, updates, and next steps are automatically communicated to the right teams without manual intervention.",
      },
      {
        title: "Intelligent Digest & Summarization",
        content:
          "Instead of constant interruptions, stakeholders receive structured digests at the right time, ensuring they stay informed without disrupting their workflow.",
      },
      {
        title: "Integrated Directly Into Workflows",
        content:
          "Automated messages aren't just for visibility—they drive action. Updates can trigger workflows, assign tasks, or notify teams of dependencies, ensuring seamless execution.",
      },
    ],
    ctaText: "Sign Up",
    ctaLink: "/sign-up",
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">{automatedCommsUseCase.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">
            {automatedCommsUseCase.title}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
            {automatedCommsUseCase.description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {automatedCommsUseCase.sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">{section.title}</h2>
              <p className="mt-2 text-gray-600 font-['Fragment_Mono']">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CustomButton size="lg" asChild>
            <a onClick={()=> {trackEvent(`ctaClick_${automatedCommsUseCase.ctaLink.split('/').pop()}`, {_value: 4})}} href={automatedCommsUseCase.ctaLink}>{automatedCommsUseCase.ctaText}</a>
          </CustomButton>
        </div>
      </main>
    </div>
  )
}