import type { Metadata } from "next"
import { CustomButton } from "@/components/ui/custom-button"

export const metadata: Metadata = {
  title: "Seamless Information Movement | OpenForge",
  description:
    "Discover how our Seamless Information Movement feature can streamline your business processes and boost efficiency.",
}

export default function SeamlessInformationMovementPage() {
  const feature = {
    title: "Seamless Information Movement",
    description:
      "Automated workflows ensure every process flows effortlessly within your business, eliminating bottlenecks and inefficiencies.",
    icon: "🔄",
    sections: [
      {
        title: "Automated Workflows",
        content:
          "Our Seamless Information Movement feature uses intelligent automation to create smooth, efficient workflows. It identifies repetitive tasks and processes, then automates them to save time and reduce errors.",
      },
      {
        title: "Real-time Data Synchronization",
        content:
          "Keep all your systems and departments in sync with real-time data updates. This ensures that everyone in your organization is working with the most up-to-date information, leading to better decision-making and improved collaboration.",
      },
      {
        title: "Intelligent Routing",
        content:
          "Our system uses AI to understand the context and content of information, routing it to the right people or departments automatically. This reduces delays and ensures that critical information reaches the right hands at the right time.",
      },
      {
        title: "Customizable Integration",
        content:
          "Seamlessly connect with your existing tools and platforms. Our feature adapts to your unique business ecosystem, ensuring that information flows smoothly across all your systems without disrupting your established processes.",
      },
    ],
    ctaText: "Book a Call",
    ctaLink: "/sign-up",
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">{feature.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">{feature.title}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
            {feature.description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {feature.sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">{section.title}</h2>
              <p className="mt-2 text-gray-600 font-['Fragment_Mono']">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CustomButton size="lg" asChild>
            <a href={feature.ctaLink}>{feature.ctaText}</a>
          </CustomButton>
        </div>
      </main>
    </div>
  )
}