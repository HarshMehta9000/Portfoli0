import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
// Comment out these imports until you add the packages
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import NavigationEnhanced from "@/components/navigation-enhanced"
import ThemeToggle from "@/components/theme-toggle"
import ScrollToTop from "@/components/scroll-to-top"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "A showcase of my work and experiences as a creative developer",
  metadataBase: new URL("https://portfolio.dev"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-auto items-center justify-between">
                <Suspense>
                  <NavigationEnhanced />
                </Suspense>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <ScrollToTop />
          </div>
        </ThemeProvider>
        {/* Add these back when you install the packages */}
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}
