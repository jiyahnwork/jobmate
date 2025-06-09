'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/db'

export function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            toast({
                title: "Success",
                description: "Signed in successfully!",
            })
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to sign in",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) throw error

            toast({
                title: "Success",
                description: "Check your email for the confirmation link!",
            })
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to sign up",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <form className="space-y-4">
                <div>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        onClick={handleSignIn}
                        disabled={loading}
                        className="flex-1"
                        style={{ backgroundColor: "#f6c07c", color: "#000000" }}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSignUp}
                        disabled={loading}
                        variant="outline"
                        className="flex-1"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    )
} 