-- Add created_at column to saved_jobs table
ALTER TABLE saved_jobs ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Update existing rows to have created_at
UPDATE saved_jobs SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL; 