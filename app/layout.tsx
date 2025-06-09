import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./high-contrast.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/contexts/i18n-context"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobMate - Platform Pencarian Kerja",
  description: "Platform lengkap untuk pencarian kerja, pengembangan skill, dan tracking progress karir",
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
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <I18nProvider>{children}</I18nProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
