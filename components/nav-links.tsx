"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false)
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false)

  const linkClass = `font-['Fragment_Mono'] text-[16px] leading-[22px] tracking-[-0.013em] text-[rgba(30,27,75,0.6)] hover:text-[rgba(30,27,75,0.8)]`

  const useCases = [
    { title: "AI Executive Assistant", link: "/use-cases/ai-ea" },
    { title: "Automated Communications", link: "/use-cases/automated-communications" },
    { title: "Concierge & Customer Service", link: "/use-cases/concierge-customer-service" },
    { title: "Cut Employee Onboarding Times", link: "/use-cases/employee-onboarding" },
    { title: "On-Demand Company Expert", link: "/use-cases/on-demand-expert" },
    { title: "Onboard Clients Before the First Call", link: "/use-cases/client-onboarding" },
  ]

  const features = [
    { title: "Seamless Information Movement", link: "/features/seamless-information-movement" },
    { title: "Unified I/O", link: "/features/unified-io" },
    { title: "Ever-Growing Knowledge Base", link: "/features/knowledge-base" },
    { title: "Custom Business Blueprint", link: "/features/custom-business-blueprint" },
  ]

  const links = [
    { href: "/", label: "Home" },
    // { href: "/pricing", label: "Pricing" },
    // { href: "/company", label: "Company" },
    // { href: "/about", label: "About" },
  ]

  if (mobile) {
    return (
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass}>
            {link.label}
          </Link>
        ))}
        <button
          className={`${linkClass} flex items-center justify-between`}
          onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
        >
          Features
          <ChevronDown className={`w-4 h-4 transition-transform ${isFeaturesOpen ? "rotate-180" : ""}`} />
        </button>
        {isFeaturesOpen && (
          <div className="pl-4 flex flex-col gap-2">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.link} className={linkClass}>
                {feature.title}
              </Link>
            ))}
          </div>
        )}
        <button
          className={`${linkClass} flex items-center justify-between`}
          onClick={() => setIsUseCasesOpen(!isUseCasesOpen)}
        >
          Use cases
          <ChevronDown className={`w-4 h-4 transition-transform ${isUseCasesOpen ? "rotate-180" : ""}`} />
        </button>
        {isUseCasesOpen && (
          <div className="pl-4 flex flex-col gap-2">
            {useCases.map((useCase) => (
              <Link key={useCase.title} href={useCase.link} className={linkClass}>
                {useCase.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-8 w-full">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
      <div className="relative group">
        <button
          className={`${linkClass} flex items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out`}
        >
          Features
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-[16px] shadow-lg z-10 overflow-hidden">
          <div className="py-2 space-y-1">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.link}
                className="block px-4 py-3 hover:bg-gray-50 transition-all duration-200 ease-in-out rounded-lg mx-2 hover:shadow-md"
              >
                <span className={`${linkClass} block`}>{feature.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="relative group">
        <button
          className={`${linkClass} flex items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out`}
        >
          Use cases
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-[16px] shadow-lg z-10 overflow-hidden">
          <div className="py-2 space-y-1">
            {useCases.map((useCase) => (
              <Link
                key={useCase.title}
                href={useCase.link}
                className="block px-4 py-3 hover:bg-gray-50 transition-all duration-200 ease-in-out rounded-lg mx-2 hover:shadow-md"
              >
                <span className={`${linkClass} block`}>{useCase.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

