import Listicle from "@/components/listicle";
import { Navbar } from "@/components/navbar";
import { BadgeGroup } from "@/components/ui/badge-group";
import { CustomButton } from "@/components/ui/custom-button";
import { FeatureCard } from "@/components/ui/feature-card";

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
                Scale your operations without scaling team.
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 self-stretch">
                <CustomButton className="w-full sm:w-auto">
                  Ready to scale? Book a Call
                </CustomButton>
                <CustomButton variant="secondary" className="w-full sm:w-auto">
                  Schedule a Demo
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        id="featureSection"
        className="bg-[#EEF2FF] py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 md:px-16 lg:pl-[120px] lg:pr-8">
          <div className="flex flex-col items-center sm:items-start gap-16 sm:gap-20 md:gap-24 lg:gap-32">
            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-5 md:gap-6 self-stretch">
              <h2 className="text-[#1E1B4B] font-['Fragment_Mono'] text-2xl sm:text-3xl md:text-[32px] leading-tight sm:leading-tight md:leading-[40px] tracking-tight sm:tracking-tighter md:tracking-[-0.5px] text-center sm:text-left">
                Why OpenForge?
              </h2>
              <p className="text-[rgba(49,46,129,0.60)] font-['Fragment_Mono'] text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed md:leading-[24px] tracking-tight sm:tracking-tighter md:tracking-[-0.252px] text-center sm:text-left">
                Open Forge offers a unified, automated, and fully customizable
                workflow management system designed to help organizations
                streamline operations, reduce costs, and scale efficiently
                without the typical growing pains. Unlike generic solutions,
                Open Forge provides:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 self-stretch">
              <FeatureCard
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.28 13.61C15.15 14.74 13.53 15.09 12.1 14.64L9.51001 17.22C9.33001 17.41 8.96001 17.53 8.69001 17.49L7.49001 17.33C7.09001 17.28 6.73001 16.9 6.67001 16.51L6.51001 15.31C6.47001 15.05 6.60001 14.68 6.78001 14.49L9.36001 11.91C8.92001 10.48 9.26001 8.86001 10.39 7.73001C12.01 6.11001 14.65 6.11001 16.28 7.73001C17.9 9.34001 17.9 11.98 16.28 13.61Z"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.45 16.28L9.59998 15.42"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.3945 10.7H13.4035"
                      stroke="#4F46E5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                title="Seamless Information Movement"
                description="Automated workflows ensure every process flows effortlessly within your business, eliminating bottlenecks and inefficiencies."
                learnMoreHref="#"
              />
              <FeatureCard
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.54 8.31C17.54 8.31 14.31 12.3 12.09 12.3C9.87 12.3 6.62 8.31 6.62 8.31"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 13.1C2 5.61 5.61 2 13.1 2C20.59 2 24.2 5.61 24.2 13.1C24.2 20.59 20.59 24.2 13.1 24.2C5.61 24.2 2 20.59 2 13.1Z"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                title="Effortless Connectivity"
                description="Unified I/O channels automatically gather and distribute information across all tools, inside and outside your business, ensuring no insights are lost."
                learnMoreHref="#"
              />
              <FeatureCard
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 13H13"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17H11"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                title="Self-Updating Knowledge Base"
                description="A dynamic hub where all your business knowledge is connected to resources, departments, and operational arenas, providing consistent and up-to-date information."
                learnMoreHref="#"
              />
              <FeatureCard
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.17004 7.44L12 12.55L20.77 7.47"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 21.61V12.54"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.61 9.17V14.83C21.61 14.88 21.61 14.92 21.6 14.97C20.9 14.36 20 14 19 14C18.06 14 17.19 14.33 16.5 14.88C15.58 15.61 15 16.74 15 18C15 18.75 15.21 19.46 15.58 20.06C15.67 20.22 15.78 20.37 15.9 20.51L14.07 21.52C12.93 22.16 11.07 22.16 9.92999 21.52L4.59 18.56C3.38 17.89 2.39001 16.21 2.39001 14.83V9.17C2.39001 7.79 3.38 6.11002 4.59 5.44002L9.92999 2.48C11.07 1.84 12.93 1.84 14.07 2.48L19.41 5.44002C20.62 6.11002 21.61 7.79 21.61 9.17Z"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 18C23 18.75 22.79 19.46 22.42 20.06C22.21 20.42 21.94 20.74 21.63 21C20.93 21.63 20.01 22 19 22C17.54 22 16.27 21.22 15.58 20.06C15.21 19.46 15 18.75 15 18C15 16.74 15.58 15.61 16.5 14.88C17.19 14.33 18.06 14 19 14C21.21 14 23 15.79 23 18Z"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.07 19.04L17.95 16.93"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.05 16.96L17.93 19.07"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
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
            heading="Add Meaning to Your Scattered Knowledge for Real Results"
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
