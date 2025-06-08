"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Info } from 'lucide-react'
import Link from 'next/link'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClientComponentClient()
    const redirectedFrom = searchParams.get('redirectedFrom')

    // Check initial auth state
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            console.log('Login Form - Initial Auth State:', {
                hasSession: !!session,
                userId: session?.user?.id,
                email: session?.user?.email
            })
        }
        checkAuth()
    }, [supabase.auth])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            console.log('Login Form - Attempting login:', { email })

            // Sign in with email and password
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            console.log('Login Form - Sign in response:', {
                success: !signInError,
                hasUser: !!data?.user,
                userId: data?.user?.id,
                email: data?.user?.email
            })

            if (signInError) {
                throw signInError
            }

            if (!data?.user) {
                throw new Error('No user data returned from sign in')
            }

            // Wait a moment for the session to be properly set
            await new Promise(resolve => setTimeout(resolve, 100))

            // Get the redirect URL from query params or default to home
            const redirectTo = redirectedFrom || '/'
            console.log('Login Form - Redirecting to:', { redirectTo })

            // Refresh the router to update the auth state
            router.refresh()

            // Use replace instead of push to prevent back button issues
            router.replace(redirectTo)
        } catch (error: any) {
            console.error('Login Form - Error:', {
                message: error.message,
                error
            })
            setError(error.message || 'An error occurred during login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {redirectedFrom && (
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        Please sign in to access {redirectedFrom === '/training-catalog' ? 'Training Catalog' :
                            redirectedFrom === '/skill-audit' ? 'Skill Audit' :
                                redirectedFrom === '/work-tracker' ? 'Work Tracker' : 'this page'}
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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
                        placeholder="Enter your password"
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </Button>

                <div className="text-sm text-center">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-primary hover:underline">
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    )
} 