"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, LogOut, Settings, LayoutDashboard } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClientComponentClient()

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                console.log('Header - Auth State:', {
                    hasSession: !!session,
                    userId: session?.user?.id,
                    email: session?.user?.email,
                    error: error?.message
                })

                if (error) {
                    console.error('Header - Auth Error:', error)
                    return
                }

                if (session?.user) {
                    setUser(session.user)
                }
            } catch (error) {
                console.error('Header - Error checking auth:', error)
            } finally {
                setLoading(false)
            }
        }

        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Header - Auth State Change:', {
                event,
                hasSession: !!session,
                userId: session?.user?.id,
                email: session?.user?.email
            })

            if (session?.user) {
                setUser(session.user)
            } else {
                setUser(null)
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase.auth])

    const handleSignOut = async () => {
        try {
            console.log('Header - Attempting sign out')
            const { error } = await supabase.auth.signOut()
            if (error) throw error

            console.log('Header - Sign out successful')
            setUser(null)
            router.refresh()
            router.push('/')
        } catch (error) {
            console.error('Header - Sign out error:', error)
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const isActive = (path: string) => {
        return pathname === path
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">JobMate</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/"
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/training-catalog"
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/training-catalog') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        Training Catalog
                    </Link>
                    <Link
                        href="/skill-audit"
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/skill-audit') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        Skill Audit
                    </Link>
                    <Link
                        href="/work-tracker"
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/work-tracker') ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        Work Tracker
                    </Link>
                </nav>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center space-x-4">
                    {!loading && (
                        user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">{user.email}</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/avatars/01.png" alt={user.email || ''} />
                                                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.email}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user.id}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="cursor-pointer">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings" className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="ghost">Sign in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </div>
                        )
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="container space-y-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/training-catalog"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/training-catalog') ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Training Catalog
                            </Link>
                            <Link
                                href="/skill-audit"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/skill-audit') ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Skill Audit
                            </Link>
                            <Link
                                href="/work-tracker"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/work-tracker') ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Work Tracker
                            </Link>
                        </nav>

                        {!loading && (
                            user ? (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/avatars/01.png" alt={user.email || ''} />
                                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{user.email}</span>
                                            <span className="text-xs text-muted-foreground">{user.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Link href="/profile" className="text-sm">
                                            <Button variant="ghost" className="w-full justify-start">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Link href="/settings" className="text-sm">
                                            <Button variant="ghost" className="w-full justify-start">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Settings
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={handleSignOut}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    <Link href="/login" className="w-full">
                                        <Button variant="ghost" className="w-full">
                                            Sign in
                                        </Button>
                                    </Link>
                                    <Link href="/register" className="w-full">
                                        <Button className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </header>
    )
} 