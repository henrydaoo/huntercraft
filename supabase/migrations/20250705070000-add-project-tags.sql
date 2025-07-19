-- Add tags column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags text[];

-- Update existing projects with sample tags based on technologies
UPDATE projects SET tags = ARRAY['Web App'] WHERE technologies ? 'React' OR technologies ? 'Vue.js' OR technologies ? 'JavaScript' OR technologies ? 'TypeScript';
UPDATE projects SET tags = ARRAY['Mobile App'] WHERE technologies ? 'React Native' OR technologies ? 'Flutter' OR technologies ? 'Swift' OR technologies ? 'Kotlin';
UPDATE projects SET tags = ARRAY['UI/UX'] WHERE technologies ? 'Figma' OR technologies ? 'Adobe XD' OR technologies ? 'Sketch';

-- Add default 'Web App' tag for projects without specific mobile or UI/UX technologies
UPDATE projects SET tags = ARRAY['Web App'] WHERE tags IS NULL;

-- Add more detailed project information
ALTER TABLE projects ADD COLUMN IF NOT EXISTS problem_statement text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution_statement text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS source_url text;