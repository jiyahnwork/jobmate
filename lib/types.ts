export type Job = {
  id: string;
  title: string;
  company_name: string;
  location: string;
  salary_range: string;
  job_type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  created_at: string;
  updated_at: string;
};

export type SavedJob = {
  id: string;
  user_id: string;
  job_id: string;
  saved_at: string;
  job?: Job;
};
