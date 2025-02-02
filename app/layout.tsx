import { ThemeProvider } from "next-themes";
import "./globals.css";
import QueryProviders from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Fragment_Mono } from "next/font/google";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};
const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fragment-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fragmentMono.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex flex-col w-full mb-auto">
              <QueryProviders>{children}</QueryProviders>
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
        {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>MyBookQuest Inc.</p>
          <ThemeSwitcher />
        </footer> */}
      </body>
    </html>
  );
}
