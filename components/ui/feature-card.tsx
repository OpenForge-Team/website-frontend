"use client"

import type { FC } from "react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import type React from "react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  learnMoreHref: string
}

export const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, learnMoreHref }) => {
  return (
    <Card className="flex flex-col items-start gap-4 p-6 flex-1 border-0 shadow-none">
      <div className="flex w-12 h-12 justify-center items-center gap-2 rounded-full bg-white">{icon}</div>

      <div className="flex flex-col items-start gap-2 self-stretch">
        <h3 className="text-[#312E81] font-['Fragment_Mono'] text-xl leading-7 tracking-[-0.34px]">{title}</h3>
        <p className="text-[#312E81]/60 font-['Francois_One'] text-base leading-[22px] tracking-[-0.208px]">
          {description}
        </p>
      </div>

      <Link
        href={learnMoreHref}
        className="text-[#4F46E5] font-['Fragment_Mono'] text-base leading-[22px] tracking-[-0.208px] hover:underline"
      >
        Learn more
      </Link>
    </Card>
  )
}

