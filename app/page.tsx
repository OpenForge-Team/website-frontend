import Listicle from "@/components/listicle";
import { Navbar } from "@/components/navbar";
import { BadgeGroup } from "@/components/ui/badge-group";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/ui/feature-card";
import { UseCaseCard } from "@/components/ui/use-case-card";
import { CategoryCarousel } from "@/components/category-carousel";
import {
  Brain,
  MessageSquare,
  HeadphonesIcon,
  Rocket,
  BookOpen,
  Briefcase,
  Puzzle,
  Link,
  BookOpenCheck,
  Workflow,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffffff] relative pt-20">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-12 pb-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 md:px-16 lg:pl-[120px] lg:pr-8">
          <div className="flex flex-col items-center sm:items-start gap-8">
            <BadgeGroup
              version="v0.1"
              label="Knowledge Base Early Access"
              className="flex h-[32px] justify-center items-center"
            />
            <div className="flex flex-col items-center sm:items-start gap-6 self-stretch">
              <h1 className="text-[#1E1B4B] font-['Fragment_Mono'] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight sm:leading-tight md:leading-[54px] tracking-tight sm:tracking-tighter md:tracking-[-1.056px] text-center sm:text-left">
                The Ultimate OS for Business Owners
              </h1>
              <p className="text-[#1E1B4B]/60 font-['Fragment_Mono'] text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed md:leading-[22px] tracking-tight sm:tracking-tighter md:tracking-[-0.208px] text-center sm:text-left">
                Scale your operations without scaling team. <strong>Now accepting applications for our limited beta!</strong>
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 self-stretch">
                <CustomButton className="w-full sm:w-auto">
                  Ready to scale? Book a Call
                </CustomButton>
                <CustomButton variant="secondary" className="w-full sm:w-auto">
                  Join the waitlist
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Feature Section */}
            <section id="featureSection" className="bg-[#EEF2FF] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 md:px-16 lg:pl-[120px] lg:pr-8">
          <div className="flex flex-col items-center sm:items-start gap-16 sm:gap-20 md:gap-24 lg:gap-32">
            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-5 md:gap-6 self-stretch">
              <h2 className="text-[#1E1B4B] font-['Fragment_Mono'] text-2xl sm:text-3xl md:text-[32px] leading-tight sm:leading-tight md:leading-[40px] tracking-tight sm:tracking-tighter md:tracking-[-0.5px] text-center sm:text-left">
                Why OpenForge?
              </h2>
              <p className="text-[rgba(49,46,129,0.60)] font-['Fragment_Mono'] text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed md:leading-[24px] tracking-tight sm:tracking-tighter md:tracking-[-0.252px] text-center sm:text-left">
                Open Forge offers a unified, automated, and fully customizable work management system designed to help
                organizations streamline operations, reduce costs, and scale efficiently without the typical growing
                pains. Unlike generic solutions, Open Forge provides:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 self-stretch">
              <FeatureCard
                icon={<Puzzle className="w-6 h-6 text-[#4F46E5]" />}
                title="Seamless Information Movement"
                description="Automated workflows ensure every process flows effortlessly within your business, eliminating bottlenecks and inefficiencies."
                learnMoreHref="#"
              />
              <FeatureCard
                icon={<Link className="w-6 h-6 text-[#4F46E5]" />}
                title="Effortless Connectivity"
                description="Unified I/O channels automatically gather and distribute information across all tools, inside and outside your business, ensuring no insights are lost."
                learnMoreHref="#"
              />
              <FeatureCard
                icon={<BookOpenCheck className="w-6 h-6 text-[#4F46E5]" />}
                title="Self-Updating Knowledge Base"
                description="A dynamic hub where all your business knowledge is connected to resources, departments, and operational arenas, providing consistent and up-to-date information."
                learnMoreHref="#"
              />
              <FeatureCard
                icon={<Workflow className="w-6 h-6 text-[#4F46E5]" />}
                title="Custom Business Blueprint"
                description="A flexible system designed to adapt to your unique business structure, allowing you to model your entities and workflows exactly the way you operate, without the need to conform to rigid systems."
                learnMoreHref="#"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Listicle Section */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 md:px-16 lg:pl-[120px] lg:pr-8">
          <Listicle
            supportingText="Impact"
            heading="Un-Scatter Your Knowledge for Real Results"
            steps={[
              { title: "Reduce Operational Overhead" },
              { title: "Free Up Valuable Time and Resources" },
              { title: "Consistent and Predictable Deliverables" },
              { title: "Improve Margins" },
              { title: "Higher Throughput, Higher Profits" },
            ]}
          />
        </div>
      </section>

      {/* Category Carousel Section */}
      <section className="bg-white border-y border-gray-200 w-full overflow-hidden">
        <CategoryCarousel />
      </section>


 {/* Use Cases Section */}
 <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 md:px-16 lg:pl-[120px] lg:pr-8">
          <div className="flex flex-col items-center sm:items-start gap-12 sm:gap-16">
            <div className="flex flex-col items-center sm:items-start gap-4 self-stretch">
              <h2 className="text-[#312E81] font-['Fragment_Mono'] text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-center sm:text-left">
                Explore Use Cases
              </h2>
              <p className="text-[rgba(49,46,129,0.60)] font-['Fragment_Mono'] text-sm sm:text-base md:text-lg leading-relaxed tracking-tight text-center sm:text-left max-w-2xl">
                Discover how Open Forge can transform various aspects of your business operations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <UseCaseCard
                icon={<Brain className="w-6 h-6 text-[#4F46E5]" />}
                title="AI Executive Assistant"
                description="An Executive Secretary That Never Sleeps—Helping You Schedule, Summarize, and Streamline. The Smartest Assistant You've Never Hired."
                ctaText="Learn More"
                ctaHref="#"
              />
              <UseCaseCard
                icon={<MessageSquare className="w-6 h-6 text-[#4F46E5]" />}
                title="Automated Communications"
                description="Stop wasting time on pointless meetings. Keep Your Team Aligned—Effortlessly."
                ctaText="Explore Features"
                ctaHref="#"
              />
              <UseCaseCard
                icon={<HeadphonesIcon className="w-6 h-6 text-[#4F46E5]" />}
                title="Concierge & Customer Service"
                description="Give clients an on-demand, white-glove experience by provisioning access to knowledge and actions—seamless, personalized, and always available."
                ctaText="Get Started"
                ctaHref="#"
              />
              <UseCaseCard
                icon={<Rocket className="w-6 h-6 text-[#4F46E5]" />}
                title="Cut Employee Onboarding Times"
                description="Faster Start. Smoother Transitions. Better Results. Give every new hire an expert at their fingertips."
                ctaText="Learn More"
                ctaHref="#"
              />
              <UseCaseCard
                icon={<BookOpen className="w-6 h-6 text-[#4F46E5]" />}
                title="On-Demand Company Expert"
                description="Empower your team with an always-on research assistant that instantly retrieves, organizes, and delivers the knowledge they need."
                ctaText="Explore Features"
                ctaHref="#"
              />
              <UseCaseCard
                icon={<Briefcase className="w-6 h-6 text-[#4F46E5]" />}
                title="Onboard Clients Before the First Call"
                description="Show up prepared with work in hand and a deep understanding of their needs—ensuring every client starts with complete confidence."
                ctaText="Get Started"
                ctaHref="#"
              />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-[#EEF2FF] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 md:px-16 lg:pl-[120px] lg:pr-8 text-center">
          <h2 className="text-[#312E81] text-2xl sm:text-3xl md:text-4xl font-normal leading-tight mb-4 font-['Fragment_Mono']">
            Why Choose Open Forge?
          </h2>
          <p className="text-[rgba(49,46,129,0.60)] font-['Fragment_Mono'] text-sm sm:text-base md:text-lg leading-relaxed mb-8">
            Open Forge is designed to adapt to your unique business needs,
            providing a seamless experience that enhances productivity and
            collaboration.
          </p>
          <CustomButton size="lg">Get Started</CustomButton>
        </div>
      </section>
    </div>
  );
}
