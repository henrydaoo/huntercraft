-- Add category field to projects table
ALTER TABLE projects ADD COLUMN category text;

-- Update existing projects with default categories
UPDATE projects SET category = 'Web App' WHERE category IS NULL;