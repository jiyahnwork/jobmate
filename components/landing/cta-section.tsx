import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f7564e]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                            Siap Memulai Perjalanan Karir Anda?
                        </h2>
                        <p className="max-w-[600px] text-white md:text-xl/relaxed">
                            Bergabunglah dengan ribuan profesional yang telah mempercayai JobMate
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href="/auth/register">
                            <Button size="lg" style={{ backgroundColor: "#f6c07c", color: "#000000" }}>
                                Daftar Sekarang
                                <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Button>
                        </Link>
                        <Link href="/cv-template">
                            <Button variant="outline" className="bg-white" size="lg">
                                Buat CV
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
} 