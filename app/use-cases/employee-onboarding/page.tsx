import type { Metadata } from "next"
import { CustomButton } from "@/components/ui/custom-button"

export const metadata: Metadata = {
  title: "Cut Employee Onboarding Times | OpenForge",
  description:
    "Give every new hire an expert at their fingertips—guiding them through every task, process, and expectation. Onboarding so seamless, even a 12-year-old could master it.",
}

export default function EmployeeOnboardingPage() {
  const employeeOnboardingUseCase = {
    title: "Cut Employee Onboarding Times",
    description:
      "Give every new hire an expert at their fingertips—guiding them through every task, process, and expectation. Onboarding so seamless, even a 12-year-old could master it.",
    icon: "🚀",
    sections: [
      {
        title: "Onboarding That Pays for Itself",
        content:
          "Training new employees is an expensive, time-consuming process. With OpenForge, employees get up to speed in record time, cutting onboarding costs and eliminating wasted effort.",
      },
      {
        title: "Your AI Training Guide for Every New Hire",
        content:
          "Instead of shadowing senior employees, new hires get instant access to the knowledge, processes, and workflows they need—so they can contribute faster.",
      },
      {
        title: "Automate Training, Reduce Ramp-Up Time",
        content:
          "Onboarding typically takes months. OpenForge streamlines the process, ensuring new hires are fully operational in weeks, not quarters.",
      },
      {
        title: "Live Support, Whenever It's Needed",
        content:
          "From policy questions to workflow navigation, OpenForge is there 24/7—answering questions, offering step-by-step guidance, and providing instant clarity.",
      },
      {
        title: "Turn Onboarding into a Competitive Advantage",
        content:
          "The faster your team gets up to speed, the faster your business grows. Get rid of the slow, outdated onboarding process and empower your hires from day one.",
      },
    ],
    ctaText: "Accelerate Your Onboarding Process",
    ctaLink: "/use-cases/employee-onboarding",
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">{employeeOnboardingUseCase.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">
            {employeeOnboardingUseCase.title}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
            {employeeOnboardingUseCase.description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {employeeOnboardingUseCase.sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">{section.title}</h2>
              <p className="mt-2 text-gray-600 font-['Fragment_Mono']">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CustomButton size="lg" asChild>
            <a href={employeeOnboardingUseCase.ctaLink}>{employeeOnboardingUseCase.ctaText}</a>
          </CustomButton>
        </div>
      </main>
    </div>
  )
}