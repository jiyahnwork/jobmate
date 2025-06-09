import { createClient } from "@supabase/supabase-js";
import { Job, SavedJob } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }

  return data || [];
}

export async function getSavedJobs(userId: string, page: number = 1, pageSize: number = 10): Promise<{ data: SavedJob[]; total: number }> {
  try {
    // First get the total count
    const { count, error: countError } = await supabase.from("saved_jobs").select("*", { count: "exact", head: true }).eq("user_id", userId);

    if (countError) {
      console.error("Error getting saved jobs count:", countError);
      throw countError;
    }

    // Then get the paginated data
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*, job:jobs(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      console.error("Error getting saved jobs:", error);
      throw error;
    }

    return {
      data: data || [],
      total: count || 0,
    };
  } catch (error) {
    console.error("Error getting saved jobs:", error);
    throw error;
  }
}

export async function saveJob(userId: string, jobId: string): Promise<SavedJob> {
  try {
    // First check if the job is already saved
    const { data: existingJob } = await supabase.from("saved_jobs").select("*").eq("user_id", userId).eq("job_id", jobId).single();

    if (existingJob) {
      // If job is already saved, return it
      return existingJob;
    }

    // If not saved, create new saved job
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([{ user_id: userId, job_id: jobId }])
      .select("*, job:jobs(*)")
      .single();

    if (error) {
      console.error("Error saving job:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error saving job:", error);
    throw error;
  }
}

export async function unsaveJob(userId: string, jobId: string): Promise<void> {
  const { error } = await supabase.from("saved_jobs").delete().eq("user_id", userId).eq("job_id", jobId);

  if (error) {
    console.error("Error unsaving job:", error);
    throw error;
  }
}

export async function removeSavedJob(userId: string, jobId: string): Promise<void> {
  try {
    const { error } = await supabase.from("saved_jobs").delete().eq("user_id", userId).eq("job_id", jobId);

    if (error) {
      console.error("Error removing saved job:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error removing saved job:", error);
    throw error;
  }
}
