import Step from "@/components/step"

interface ListicleProps {
  supportingText: string
  heading: string
  steps: Array<{
    title: string
  }>
}

const Listicle: React.FC<ListicleProps> = ({ supportingText, heading, steps }) => {
  return (
    <div className="flex flex-col items-center gap-16 self-stretch font-['Fragment_Mono']">
      <div className="flex flex-col items-center gap-1 w-[586px] max-w-full">
        <p className="self-stretch text-indigo-500 text-center text-xs font-normal leading-5 tracking-[1px] uppercase">
          {supportingText}
        </p>
        <h2 className="self-stretch text-indigo-950 text-center text-4xl font-normal leading-[44px] tracking-[-0.72px]">
          {heading}
        </h2>
      </div>
      <div className="flex flex-col items-start gap-8 w-[384px] max-w-full">
        {steps.map((step, index) => (
          <Step key={index} number={String(index + 1)} title={step.title} />
        ))}
      </div>
    </div>
  )
}

export default Listicle
