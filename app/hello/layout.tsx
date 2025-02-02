import { Fragment_Mono } from "next/font/google"
import "@/app/globals.css"
import type React from "react" // Import React

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fragment-mono",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fragmentMono.variable}>{children}</body>
    </html>
  )
}


