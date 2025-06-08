'use client'

import { useState } from "react"
import { ChevronRight, Search, Star, Briefcase, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JobSearchPage from "@/components/job-search-page"
import Link from "next/link"

export function HeroSection() {
    const [activeTab, setActiveTab] = useState("search")

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
                        <TabsList className="w-full grid grid-cols-4 bg-gray-100 rounded-none h-14">
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
                            <TabsTrigger value="profile" className="data-[state=active]:bg-white rounded-none h-full">
                                <div className="flex flex-col items-center">
                                    <Users className="h-5 w-5 mb-1" aria-hidden="true" />
                                    <span className="text-xs">Profil</span>
                                </div>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="search" className="m-0 p-0 h-[700px] overflow-hidden">
                            <JobSearchPage />
                        </TabsContent>

                        <TabsContent value="saved" className="m-0 p-4 h-[700px] overflow-auto">
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
                        </TabsContent>

                        <TabsContent value="applications" className="m-0 p-4 h-[700px] overflow-auto">
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

                        <TabsContent value="profile" className="m-0 p-4 h-[700px] overflow-auto">
                            <div className="flex flex-col items-center py-6">
                                <div className="w-20 h-20 rounded-full bg-gray-200 mb-3 flex items-center justify-center">
                                    <Users className="h-10 w-10 text-gray-400" aria-hidden="true" />
                                </div>
                                <h3 className="font-bold text-lg">Masuk atau Daftar</h3>
                                <p className="text-sm text-gray-500 mt-1 mb-6 text-center max-w-xs">
                                    Masuk untuk mengakses fitur lengkap JobMate
                                </p>
                                <div className="flex gap-3 w-full max-w-xs">
                                    <Link href="/auth/register" className="flex-1">
                                        <Button className="w-full" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                                            Daftar
                                        </Button>
                                    </Link>
                                    <Link href="/auth/login" className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Masuk
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex justify-center mt-8">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                        Download App
                        <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </section>
    )
} 