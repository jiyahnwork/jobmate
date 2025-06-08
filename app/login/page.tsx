"use client"

import LoginForm from "@/components/auth/login-form"
import Header from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
                    <LoginForm />
                </div>
            </main>
            <Footer />
        </div>
    )
} 