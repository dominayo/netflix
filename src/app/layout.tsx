import "~/lib/globals.css"
import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"
import { ThemeProvider } from "~/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "~/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

export const runtime = "edge"
export const preferredRegion = "iad1"
const inter = Inter({ subsets: ["latin"] })

const siteConfig = {
  title: "Netflix Clone",
  description:
    "Open source project using bleeding-edge stack. Drizzle ORM + Neon postgres + Clerk auth + Shadcn/ui + everything new in Next.js 13 (server components, server actions, streaming ui, parallel routes, intercepting routes).",
  url: "/",
  siteName: "Nextflix",
}
export const metadata = {
  metadataBase: new URL("https://nextflix-blush.vercel.app"),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-neutral-900 text-slate-50 antialiased scrollbar-none",
            inter.className,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
