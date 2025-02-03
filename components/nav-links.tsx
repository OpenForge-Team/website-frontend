"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false)

  const linkClass = `font-['Fragment_Mono'] text-[16px] leading-[22px] tracking-[-0.013em] text-[rgba(30,27,75,0.6)] hover:text-[rgba(30,27,75,0.8)]`

  const useCases = [
    "AI Executive Assistant",
    "Automated Communications",
    "Concierge & Customer Service",
    "Cut Employee Onboarding Times",
    "On-Demand Company Expert",
    "Onboard Clients Before the First Call",
  ]

  const links = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/company", label: "Company" },
    { href: "/about", label: "About" },
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
          onClick={() => setIsUseCasesOpen(!isUseCasesOpen)}
        >
          Use cases
          <ChevronDown className={`w-4 h-4 transition-transform ${isUseCasesOpen ? "rotate-180" : ""}`} />
        </button>
        {isUseCasesOpen && (
          <div className="pl-4 flex flex-col gap-2">
            {useCases.map((useCase) => (
              <span key={useCase} className={linkClass}>
                {useCase}
              </span>
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
        <button className={`${linkClass} flex items-center gap-1`}>
          Use cases
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-[16px] shadow-lg z-10">
          <div className="py-2">
            {useCases.map((useCase) => (
              <div key={useCase} className="px-4 py-2 hover:bg-gray-50">
                <span className={linkClass}>{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

