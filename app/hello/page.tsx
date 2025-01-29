import { Navbar } from "@/components/navbar"
import { BadgeGroup } from "@/components/ui/badge-group"
import { CustomButton } from "@/components/ui/custom-button"
import { FeatureCard } from "@/components/ui/feature-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffffff] relative">
      {/* Navbar */}
      <Navbar />
      <div className="flex py-12 pb-24 justify-center items-center self-stretch">
        <div id="heroSection" className="flex w-full justify-center items-center gap-8">
            <div className="flex flex-col items-start gap-8 py-24">
                <BadgeGroup
                    version="v1.0"
                    label="Latest Release"
                    className="flex h-[32px] justify-center items-center"
                />
                <div className="flex flex-col items-start gap-6 self-stretch">
                <h1 className="text-[#1E1B4B] font-['Fragment_Mono'] text-[48px] leading-[54px] tracking-[-1.056px]">
                    The Ultimate OS for Business Owners
                </h1>
                <p className="text-[#1E1B4B]/60 font-['Fragment_Mono'] text-base leading-[22px] tracking-[-0.208px]">
                    Scale your operations without scaling team.
                </p>
                <div className="flex items-center gap-4 self-stretch">
                    <CustomButton>Ready to scale? Book a Call</CustomButton>
                    <CustomButton variant="secondary">Schedule a Demo</CustomButton>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div id="featureSection" className="flex pb-24 flex-col justify-center items-center gap-16 self-stretch">
        <div className="flex flex-col items-start gap-32 w-[66%] px-[32px] py-0">
            <div style={{ display: 'flex', width: '768px', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
                <h2 className="text-[#1E1B4B] font-['Fragment_Mono'] text-[32px] leading-[40px] tracking-[-0.5px]">
                    Why OpenForge?
                </h2>
                <p className="text-[rgba(49,46,129,0.60)] font-['Fragment_Mono'] text-[18px] font-normal leading-[24px] tracking-[-0.252px]">
                    Open Forge offers a unified, automated, and fully customizable work management system designed to help organizations streamline operations, reduce costs, and scale efficiently without the typical growing pains. Unlike generic solutions, Open Forge provides:    
                </p>
            </div>
        </div>
        
    </div>
        <div id="featureCards" className="flex flex-col justify-center items-center gap-16 self-stretch">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                    icon={<svg>/* Icon for Seamless Information Movement */</svg>}
                    title="Seamless Information Movement"
                    description="Automated workflows ensure every process flows effortlessly within your business, eliminating bottlenecks and inefficiencies."
                    learnMoreHref="#"
                />
                <FeatureCard
                    icon={<svg>/* Icon for Effortless Connectivity */</svg>}
                    title="Effortless Connectivity"
                    description="Unified I/O channels automatically gather and distribute information across all tools, inside and outside your business, ensuring no insights are lost."
                    learnMoreHref="#"
                />
                <FeatureCard
                    icon={<svg>/* Icon for Self-Updating Knowledge Base */</svg>}
                    title="Self-Updating Knowledge Base"
                    description="A dynamic hub where all your business knowledge is connected to resources, departments, and operational arenas, providing consistent and up-to-date information."
                    learnMoreHref="#"
                />
                <FeatureCard
                    icon={<svg>/* Icon for Custom Business Blueprint */</svg>}
                    title="Custom Business Blueprint"
                    description="A flexible system designed to adapt to your unique business structure, allowing you to model your entities and workflows exactly the way you operate, without the need to conform to rigid systems."
                    learnMoreHref="#"
                />
            </div>
        </div>
        <div style={{ display: 'flex', padding: '64px 320px', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', alignSelf: 'stretch', background: 'var(--Generic-White, #FFF)' }}>
            <h3>How It Works</h3>
            <p>Discover the unique features that make our platform stand out and help you enhance your jiu-jitsu journey.</p>
        </div>

    </div>
  )
}
