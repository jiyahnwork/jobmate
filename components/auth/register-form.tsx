'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function RegisterForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            // Validate passwords match
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match')
            }

            // Validate password length
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long')
            }

            // Sign up without email confirmation
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (signUpError) {
                throw signUpError
            }

            if (!signUpData?.user) {
                throw new Error('No user data returned from signup')
            }

            // Sign in immediately after successful registration
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (signInError) {
                throw signInError
            }

            // Refresh the router to update the auth state
            router.refresh()

            // Redirect to home page
            router.push('/')
        } catch (error: any) {
            setError(error.message || 'An error occurred during registration')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Enter your password"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Confirm your password"
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
            </Button>
        </form>
    )
} 