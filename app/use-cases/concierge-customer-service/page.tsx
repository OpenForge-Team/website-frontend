import type { Metadata } from "next"
import { CustomButton } from "@/components/ui/custom-button"
import { trackEvent } from "fathom-client"
import React from "react"

export const metadata: Metadata = {
  title: "Scale Your Concierge & Customer Service Effortlessly | OpenForge",
  description:
    "Give clients an on-demand, white-glove experience by provisioning access to knowledge and actions—seamless, personalized, and always available.",
}

export default function ConciergeCustomerServicePage() {
  const conciergeCustomerServiceUseCase = {
    title: "Scale Your Concierge & Customer Service Effortlessly",
    description:
      "Give clients an on-demand, white-glove experience by provisioning access to knowledge and actions—seamless, personalized, and always available.",
    icon: "🎩",
    sections: [
      {
        title: "Service at Scale. Personalization at Every Step.",
        content:
          "Deliver high-touch, concierge-level service—whether to a handful of VIP clients or thousands—without losing the human touch.",
      },
      {
        title: "Your AI-Powered Concierge, Always Available",
        content:
          "OpenForge understands context, responds intelligently, and can execute actions like finalizing bookings—all with your oversight or full automation.",
      },
      {
        title: "AI That Speaks Like You",
        content:
          "While you have full control to override any message, OpenForge learns to communicate exactly as you do. The earlier you start, the faster you can fully automate.",
      },
      {
        title: "Turn Hustle into a Global Brand",
        content:
          "You may be able to hustle your way through your concierge business now, but there's a ceiling. Automate your operations, scale your service, and build a business without limits.",
      },
      {
        title: "Exclusive Partnerships Available",
        content:
          "We're open to exclusive partnerships for high-end concierge services. If you're looking to transform your business, let's talk.",
      },
    ],
    ctaText: "Automate & Scale Your Concierge Service",
    ctaLink: "/use-cases/concierge-customer-service",
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">{conciergeCustomerServiceUseCase.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">
            {conciergeCustomerServiceUseCase.title}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
            {conciergeCustomerServiceUseCase.description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {conciergeCustomerServiceUseCase.sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">{section.title}</h2>
              <p className="mt-2 text-gray-600 font-['Fragment_Mono']">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CustomButton size="lg" asChild>
            <a onClick={()=> {trackEvent(`ctaClick_${conciergeCustomerServiceUseCase.ctaLink.split('/').pop()}`, {_value: 4})}} href={conciergeCustomerServiceUseCase.ctaLink}>{conciergeCustomerServiceUseCase.ctaText}</a>
          </CustomButton>
        </div>
      </main>
    </div>
  )
}

