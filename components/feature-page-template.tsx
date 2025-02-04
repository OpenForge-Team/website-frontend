import { CustomButton } from "@/components/ui/custom-button";
import { trackEvent } from "fathom-client";
import React from "react";

interface Section {
  title: string;
  content: string;
}

interface FeaturePageProps {
  feature: {
    title: string;
    description: string;
    icon: string;
    sections: Section[];
    ctaText: string;
    ctaLink: string;
  };
}

export const FeaturePageTemplate: React.FC<FeaturePageProps> = ({
  feature,
}) => {
  return (
    <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-16">
        <div className="text-6xl mb-4">{feature.icon}</div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 font-['Fragment_Mono']">
          {feature.title}
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-['Fragment_Mono']">
          {feature.description}
        </p>
      </div>

      <div className="mt-16 space-y-16">
        {feature.sections.map((section, index) => (
          <div key={index} className="border-t border-gray-200 pt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Fragment_Mono']">
              {section.title}
            </h2>
            <p className="mt-2 text-gray-600 font-['Fragment_Mono']">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <CustomButton size="lg" asChild>
          <a
            onClick={() => {
              trackEvent(`ctaClick_${feature.ctaLink.split("/").pop()}`, {
                _value: 5,
              });
            }}
            href={feature.ctaLink}
          >
            {feature.ctaText}
          </a>
        </CustomButton>
      </div>
    </main>
  );
};
