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
    <Card className="flex flex-col items-center sm:items-start gap-4 p-4 sm:p-6 flex-[1_0_0] border-0 shadow-none bg-transparent backdrop-blur">
      <div className="flex w-10 h-10 sm:w-12 sm:h-12 justify-center items-center gap-2 rounded-full bg-white">
        {icon}
      </div>

      <div className="flex flex-col items-center sm:items-start gap-2 self-stretch">
        <h3 className="text-[#312E81] font-['Fragment_Mono'] text-lg sm:text-xl leading-6 sm:leading-7 tracking-tight sm:tracking-[-0.34px] text-center sm:text-left">
          {title}
        </h3>
        <p className="text-[rgba(49,46,129,0.60)] font-['Fragment_Mono'] text-sm sm:text-base leading-5 sm:leading-6 tracking-tight sm:tracking-[-0.208px] self-stretch text-center sm:text-left">
          {description}
        </p>
      </div>

      <Link
        href={learnMoreHref}
        className="text-[#4F46E5] font-['Fragment_Mono'] text-sm sm:text-base leading-5 sm:leading-6 tracking-tight sm:tracking-[-0.208px] hover:underline"
      >
        Learn more
      </Link>
    </Card>
  )
}

