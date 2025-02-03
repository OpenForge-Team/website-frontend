import type { Metadata } from "next"
import { CustomButton } from "@/components/ui/custom-button"

export const metadata: Metadata = {
  title: "AI Executive Assistant | OpenForge",
  description: "Discover how our AI Executive Assistant can streamline your workflow and boost productivity.",
}

export default function AIExecutiveAssistantPage() {
  const useCase = {
    title: "AI Executive Assistant",
    description:
      "An Executive Secretary That Never Sleeps—Helping You Schedule, Summarize, and Streamline. The Smartest Assistant You've Never Hired.",
    icon: "🧠",
    sections: [
        {
            title: "Proactive Planning & Hands-Free Scheduling",
            content:
                "Your AI Executive Assistant doesn’t just find open slots—it helps you plan your time effectively. Acting as your primary scheduler, it coordinates with participants, adjusts based on priorities, and ensures meetings align with your real workflow—not just your calendar.",
        },
        {
        title: "Inbox Management",
        content:
            "Say goodbye to inbox overload. The AI Assistant categorizes, summarizes, and prioritizes your unified inbox, allowing you to focus on what's truly important. It can even draft responses for your review, saving you valuable time.",
        },
        {
        title: "Task Delegation and Follow-up",
        content:
            "Delegate tasks with ease and never worry about forgetting follow-ups. The AI Assistant keeps track of assigned tasks, sends reminders, and provides you with regular status updates, ensuring nothing falls through the cracks.",
        }
    ],
    ctaText: "Start Your Free Trial",
    ctaLink: "/signup",
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">{useCase.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">{useCase.title}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
            {useCase.description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {useCase.sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">{section.title}</h2>
              <p className="mt-2 text-gray-600 font-['Fragment_Mono']">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CustomButton size="lg" asChild>
            <a href={useCase.ctaLink}>{useCase.ctaText}</a>
          </CustomButton>
        </div>
      </main>
    </div>
  )
}

