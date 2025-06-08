"use client"

import RegisterForm from "@/components/auth/register-form"
import Header from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
                    <RegisterForm />
                </div>
            </main>
            <Footer />
        </div>
    )
} 