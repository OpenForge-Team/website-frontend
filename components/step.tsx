import type React from "react"

interface StepProps {
  number: string
  title: string
}

const Step: React.FC<StepProps> = ({ number, title }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 self-stretch">
      <div className="flex w-8 h-8 sm:w-9 sm:h-9 p-2 justify-center items-center rounded-md bg-indigo-50">
        <span className="text-indigo-950 font-['Fragment_Mono'] text-sm sm:text-base">{number.padStart(2, "0")}</span>
      </div>
      <h3 className="flex-1 text-indigo-950 font-['Fragment_Mono'] text-sm sm:text-base font-normal leading-5 sm:leading-6 [font-feature-settings:'salt'_on] text-center sm:text-left">
        {title}
      </h3>
    </div>
  )
}

export default Step

