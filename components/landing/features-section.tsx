import {
    Filter,
    Clock,
    Building,
    BookOpen,
    TrendingUp,
    FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function FeaturesSection() {
    return (
        <section id="features" className="w-full py-12 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Fitur Unggulan JobMate</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        Semua yang Anda butuhkan untuk mengembangkan karir dan menemukan pekerjaan impian
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <Filter className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                            <CardTitle>Pencarian Cerdas</CardTitle>
                            <CardDescription>Filter pekerjaan berdasarkan lokasi, gaji, dan kategori yang sesuai</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg bg-gray-100 p-3">
                                <div className="flex gap-2 mb-2">
                                    <Badge>Lokasi</Badge>
                                    <Badge>Gaji</Badge>
                                    <Badge>Kategori</Badge>
                                </div>
                                <div className="text-sm text-gray-600">Filter yang mudah digunakan</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Clock className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                            <CardTitle>Tracking Status</CardTitle>
                            <CardDescription>Pantau status lamaran pekerjaan Anda secara real-time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Terkirim</Badge>
                                    <div className="h-0.5 flex-1 bg-gray-200"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Diproses</Badge>
                                    <div className="h-0.5 flex-1 bg-gray-200"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Diterima</Badge>
                                    <div className="h-0.5 flex-1 bg-gray-200"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Building className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                            <CardTitle>Kategori Pekerjaan</CardTitle>
                            <CardDescription>Temukan pekerjaan berdasarkan bidang dan tingkat keahlian</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="rounded-lg bg-gray-100 p-2 text-center">
                                    <span className="text-sm font-medium">Umum</span>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-2 text-center">
                                    <span className="text-sm font-medium">Keahlian Tinggi</span>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-2 text-center">
                                    <span className="text-sm font-medium">Freelance</span>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-2 text-center">
                                    <span className="text-sm font-medium">Magang</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <BookOpen className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                            <CardTitle>Katalog Pelatihan</CardTitle>
                            <CardDescription>Temukan pelatihan dan sertifikasi yang relevan dengan karir Anda</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Programming</Badge>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Design</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Data Science</Badge>
                                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Marketing</Badge>
                                </div>
                                <div className="text-sm text-gray-600 mt-2">Rekomendasi berdasarkan pekerjaan yang Anda lamar</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <TrendingUp className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                            <CardTitle>Skill Audit Berkala</CardTitle>
                            <CardDescription>Evaluasi dan kembangkan keterampilan Anda setiap 3-6 bulan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">JavaScript</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                                        </div>
                                        <span className="text-xs text-green-600">+10</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Communication</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                                        </div>
                                        <span className="text-xs text-green-600">+5</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">Audit berikutnya: Jan 2024</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <FileText className="h-10 w-10 mb-2" style={{ color: "#f7564e" }} aria-hidden="true" />
                            <CardTitle>Work Progress Tracker</CardTitle>
                            <CardDescription>Dokumentasikan perjalanan profesional dan bangun portofolio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Proyek Aktif</span>
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">3</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Pencapaian</span>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">12</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Log Pekerjaan</span>
                                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">45</Badge>
                                </div>
                                <Button size="sm" className="w-full mt-2" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                                    Lihat Portofolio Publik
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
} 