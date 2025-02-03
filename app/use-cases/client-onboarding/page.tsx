import type { Metadata } from "next"
import { CustomButton } from "@/components/ui/custom-button"

export const metadata: Metadata = {
  title: "Onboard Clients Before the First Call | OpenForge",
  description:
    "Show up prepared with work in hand and a deep understanding of their needs—ensuring every client starts with complete confidence.",
}

export default function ClientOnboardingPage() {
  const clientOnboardingUseCase = {
    title: "Onboard Clients Before the First Call",
    description:
      "Show up prepared with work in hand and a deep understanding of their needs—ensuring every client starts with complete confidence.",
    icon: "📋",
    sections: [
      {
        title: "Start the Process Before the First Meeting",
        content:
          "Kick off onboarding with a form, questionnaire, pre-recorded meeting, or an AI-led information-gathering session—capturing key details without back-and-forth.",
      },
      {
        title: "Automate Discovery, Reduce Manual Work",
        content:
          "OpenForge compiles responses into structured templates, gathering requirements and generating boilerplate documents—so you start ahead, not from scratch.",
      },
      {
        title: "Walk Into the Call with Work Already Done",
        content:
          "Instead of wasting time gathering information live, use the first call to deliver insights, strategies, and solutions—setting the stage for immediate impact.",
      },
      {
        title: "Eliminate Misalignment & Unnecessary Revisions",
        content:
          "With key requirements collected and documented before the call, clients get exactly what they need, without drawn-out clarification cycles.",
      },
      {
        title: "Streamlined Approval & Execution",
        content:
          "After the first call, all relevant documentation, action plans, and next steps are auto-generated—ready for quick review, approval, and execution.",
      },
    ],
    ctaText: "Upgrade Your Client Onboarding",
    ctaLink: "/use-cases/client-onboarding",
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">{clientOnboardingUseCase.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">
            {clientOnboardingUseCase.title}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
            {clientOnboardingUseCase.description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {clientOnboardingUseCase.sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">{section.title}</h2>
              <p className="mt-2 text-gray-600 font-['Fragment_Mono']">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CustomButton size="lg" asChild>
            <a href={clientOnboardingUseCase.ctaLink}>{clientOnboardingUseCase.ctaText}</a>
          </CustomButton>
        </div>
      </main>
    </div>
  )
}