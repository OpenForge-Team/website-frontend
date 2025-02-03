import type React from "react"
import { Navbar } from "@/components/navbar"

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      {children}
    </div>
  )
}

