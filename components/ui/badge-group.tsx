import { ArrowRight as ArrowRightIcon } from "lucide-react"

interface BadgeGroupProps {
  version: string
  label: string
  href?: string
  className?: string
}

export function BadgeGroup({ version, label, href, className = "" }: BadgeGroupProps) {
  const Component = href ? "a" : "div"

  return (
    <Component
      href={href}
      className={`
        inline-flex h-[32px] items-center justify-center
        rounded-[2000px] bg-[#d2ecff]
        text-[#0055c7] text-sm font-medium transition-colors
        hover:bg-[#d2ecff]/90 px-[4px]
        ${className}
      `}
    >
      <div className="flex h-[24px] items-center justify-center gap-[8px] rounded-[2000px] bg-[#ffffff] px-[8px]">
        {version}
      </div>

      <div className="flex items-center justify-center self-stretch px-[12px] py-[8px]">{label}</div>

      <div className="flex items-center justify-end self-stretch pr-[8px]">
        <ArrowRightIcon className="h-4 w-4" />
      </div>
    </Component>
  )
}

