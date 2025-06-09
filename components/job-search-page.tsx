"use client"

import { useState, useEffect } from "react"
import { Search, Star, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Job } from "@/lib/types"
import { getJobs, saveJob } from "@/lib/db"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    loadJobs()
  }, [])

  async function loadJobs() {
    setLoading(true)
    try {
      const data = await getJobs()
      setJobs(data)
    } catch (error) {
      console.error('Error loading jobs:', error)
      toast.error("Gagal memuat daftar pekerjaan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await getJobs()
      // Filter jobs based on search query
      const filteredJobs = data.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setJobs(filteredJobs)
    } catch (error) {
      console.error('Error searching jobs:', error)
      toast.error("Gagal mencari pekerjaan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveJob(job: Job) {
    if (!user) {
      toast.error("Silakan masuk untuk menyimpan pekerjaan")
      return
    }

    try {
      const savedJob = await saveJob(user.id, job.id)
      toast.success("Pekerjaan tersimpan")
    } catch (error) {
      console.error('Error saving job:', error)
      toast.error("Gagal menyimpan pekerjaan. Silakan coba lagi.")
    }
  }

  function toggleJobExpand(jobId: string) {
    setExpandedJobId(expandedJobId === jobId ? null : jobId)
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Cari pekerjaan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>

      <div className="flex-1 overflow-auto space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company_name}</p>
                <div className="mt-2 space-x-2">
                  <span className="text-sm text-gray-500">{job.location}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{job.job_type}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{job.salary_range}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSaveJob(job)}
                className="hover:bg-gray-100"
              >
                <Star className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleJobExpand(job.id)}
                className="w-full flex justify-between items-center text-gray-500 hover:text-gray-700"
              >
                <span>Persyaratan</span>
                {expandedJobId === job.id ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {expandedJobId === job.id && (
                <div className="mt-2 pl-4 border-l-2 border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                </div>
              )}
            </div>

            <p className="mt-2 text-gray-700 line-clamp-2">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
