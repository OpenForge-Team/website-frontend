import type { FC } from "react"
import { Card } from "@/components/ui/card"
import { CustomButton } from "@/components/ui/custom-button"
import { trackEvent } from "fathom-client"

interface UseCaseCardProps {
  icon: React.ReactNode
  title: string
  description: string
  ctaText: string
  ctaHref: string
}

export const UseCaseCard: FC<UseCaseCardProps> = ({ icon, title, description, ctaText, ctaHref }) => {
  return (
    <Card className="flex flex-col items-start p-6 bg-white shadow-md rounded-xl h-full">
      <div className="flex items-center justify-start w-full mb-4">
        <div className="flex-shrink-0 w-12 h-12 flex justify-center items-center rounded-full bg-[#EEF2FF]">{icon}</div>
      </div>
      <div className="flex flex-col items-start gap-2 self-stretch flex-grow">
        <h3 className="text-[#312E81] font-['Fragment_Mono'] text-xl leading-7 tracking-[-0.34px]">{title}</h3>
        <p className="text-[rgba(49,46,129,0.60)] font-['Fragment_Mono'] text-base leading-6 tracking-[-0.208px] self-stretch mb-4">
          {description}
        </p>
      </div>
      <CustomButton variant="secondary" asChild className="mt-auto w-full">
        <a href={ctaHref} onClick={()=> {trackEvent(`viewUseCase_${ctaHref.split('/').pop()}`)}}>{ctaText}</a>
      </CustomButton>
    </Card>
  )
}

