'use client'

import Header from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    )
} 