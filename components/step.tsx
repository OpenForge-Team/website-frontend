import type React from "react"

interface StepProps {
  number: string
  title: string
}

const Step: React.FC<StepProps> = ({ number, title }) => {
  return (
    <div className="flex items-start gap-5 self-stretch">
      <div className="flex w-9 h-9 p-2 justify-center items-center rounded-md bg-indigo-50">
        <span className="text-indigo-950 font-['Fragment_Mono']">{number.padStart(2, "0")}</span>
      </div>
      <h3 className="flex-1 text-indigo-950 font-['Fragment_Mono'] text-base font-normal leading-6 [font-feature-settings:'salt'_on]">
        {title}
      </h3>
    </div>
  )
}

export default Step