'use client'

import { useState, useEffect } from "react"
import { ChevronRight, Search, Star, Briefcase, Users, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JobSearchPage from "@/components/job-search-page"
import { SavedJob } from "@/lib/types"
import { getSavedJobs, removeSavedJob } from "@/lib/db"
import { useAuth } from "@/lib/auth-context"
import { SignInForm } from "@/components/auth/sign-in-form"
import { toast } from "sonner"
import { Toaster } from "sonner"

const ITEMS_PER_PAGE = 5

export function HeroSection() {
    const [activeTab, setActiveTab] = useState("search")
    const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { user, loading: authLoading } = useAuth()

    useEffect(() => {
        if (activeTab === "saved" && !authLoading) {
            loadSavedJobs()
        }
    }, [activeTab, user, authLoading, currentPage])

    async function loadSavedJobs() {
        if (!user) {
            setLoading(false)
            return
        }

        try {
            const { data, total } = await getSavedJobs(user.id, currentPage, ITEMS_PER_PAGE)
            setSavedJobs(data)
            setTotalPages(Math.ceil(total / ITEMS_PER_PAGE))
        } catch (error) {
            console.error('Error loading saved jobs:', error)
            toast.error("Gagal memuat pekerjaan tersimpan. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    async function handleRemoveJob(jobId: string) {
        if (!user) return

        try {
            await removeSavedJob(user.id, jobId)
            setSavedJobs(prevJobs => prevJobs.filter(job => job.job_id !== jobId))
            toast.success("Pekerjaan dihapus dari daftar tersimpan")
            // Reload the current page to maintain pagination
            loadSavedJobs()
        } catch (error) {
            console.error('Error removing job:', error)
            toast.error("Gagal menghapus pekerjaan. Silakan coba lagi.")
        }
    }

    function handlePageChange(newPage: number) {
        setCurrentPage(newPage)
    }

    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f7564e]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                        Bangun Karir Impian Anda dengan JobMate
                    </h1>
                    <p className="max-w-[900px] text-white md:text-xl/relaxed">
                        Platform lengkap untuk pencarian kerja, pengembangan skill, dan tracking progress karir
                    </p>
                </div>

                <div className="bg-white rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
                    <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full grid grid-cols-3 bg-gray-100 rounded-none h-14">
                            <TabsTrigger value="search" className="data-[state=active]:bg-white rounded-none h-full">
                                <div className="flex flex-col items-center">
                                    <Search className="h-5 w-5 mb-1" aria-hidden="true" />
                                    <span className="text-xs">Cari</span>
                                </div>
                            </TabsTrigger>
                            <TabsTrigger value="saved" className="data-[state=active]:bg-white rounded-none h-full">
                                <div className="flex flex-col items-center">
                                    <Star className="h-5 w-5 mb-1" aria-hidden="true" />
                                    <span className="text-xs">Tersimpan</span>
                                </div>
                            </TabsTrigger>
                            <TabsTrigger value="applications" className="data-[state=active]:bg-white rounded-none h-full">
                                <div className="flex flex-col items-center">
                                    <Briefcase className="h-5 w-5 mb-1" aria-hidden="true" />
                                    <span className="text-xs">Lamaran</span>
                                </div>
                            </TabsTrigger>
                        </TabsList>

                        <div className="h-[700px] relative">
                            <TabsContent value="search" className="m-0 p-0 h-full overflow-hidden absolute inset-0">
                                <JobSearchPage />
                            </TabsContent>

                            <TabsContent value="saved" className="m-0 p-4 h-full overflow-auto absolute inset-0">
                                {loading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                    </div>
                                ) : !user ? (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <Star className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <h3 className="font-medium">Silakan masuk</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-4">Masuk untuk melihat pekerjaan tersimpan</p>
                                        <SignInForm />
                                    </div>
                                ) : savedJobs.length > 0 ? (
                                    <div className="space-y-4">
                                        {savedJobs.map((savedJob) => (
                                            <div key={savedJob.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-semibold">{savedJob.job?.title}</h3>
                                                        <p className="text-gray-600">{savedJob.job?.company_name}</p>
                                                        <div className="mt-2 space-x-2">
                                                            <span className="text-sm text-gray-500">{savedJob.job?.location}</span>
                                                            <span className="text-sm text-gray-500">•</span>
                                                            <span className="text-sm text-gray-500">{savedJob.job?.job_type}</span>
                                                            <span className="text-sm text-gray-500">•</span>
                                                            <span className="text-sm text-gray-500">{savedJob.job?.salary_range}</span>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRemoveJob(savedJob.job_id)}
                                                        className="text-gray-500 hover:text-red-500"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                                <p className="mt-2 text-gray-700 line-clamp-2">{savedJob.job?.description}</p>
                                            </div>
                                        ))}
                                        {totalPages > 1 && (
                                            <div className="flex justify-center items-center space-x-2 mt-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Button>
                                                <span className="text-sm">
                                                    Halaman {currentPage} dari {totalPages}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    <ChevronRightIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <Star className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <h3 className="font-medium">Belum ada pekerjaan tersimpan</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-4">Simpan pekerjaan untuk melihatnya di sini</p>
                                        <Button
                                            onClick={() => setActiveTab("search")}
                                            style={{ backgroundColor: "#f6c07c", color: "#000000" }}
                                        >
                                            Cari Pekerjaan
                                        </Button>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="applications" className="m-0 p-4 h-full overflow-auto absolute inset-0">
                                <div className="text-center py-12">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                        <Briefcase className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <h3 className="font-medium">Belum ada lamaran aktif</h3>
                                    <p className="text-sm text-gray-500 mt-1 mb-4">
                                        Mulai melamar pekerjaan untuk melihat status di sini
                                    </p>
                                    <Button
                                        onClick={() => setActiveTab("search")}
                                        style={{ backgroundColor: "#f6c07c", color: "#000000" }}
                                    >
                                        Cari Pekerjaan
                                    </Button>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
            <Toaster richColors position="top-right" />
        </section>
    )
} 