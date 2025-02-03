import type React from "react"

const categories = [
  "Client Success",
  "Account Management",
  "Employee Experience",
  "Customer Service",
  "Concierge Services",
  "Employee Productivity",
  "Corporate Communications",
  "Business Intelligence & Decision-Making",
  "Knowledge Management & Resource Planning",
]

export const CategoryCarousel: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white py-8">
      <div className="flex animate-carousel">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex whitespace-nowrap">
            {categories.map((category, catIndex) => (
              <span
                key={`${index}-${catIndex}`}
                className={`mx-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                  catIndex % 2 === 0 ? "bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#4F46E5] text-white"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

