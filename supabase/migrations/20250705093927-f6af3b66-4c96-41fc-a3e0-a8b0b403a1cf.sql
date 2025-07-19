-- Update existing projects with different categories
UPDATE projects SET category = 'Website' WHERE title ILIKE '%web%' OR title ILIKE '%site%';
UPDATE projects SET category = 'Mobile App' WHERE title ILIKE '%app%' OR title ILIKE '%mobile%';
UPDATE projects SET category = 'UI/UX' WHERE title ILIKE '%design%' OR title ILIKE '%ui%' OR title ILIKE '%ux%';
UPDATE projects SET category = 'E-commerce' WHERE title ILIKE '%shop%' OR title ILIKE '%store%' OR title ILIKE '%ecom%';

-- Set default category for any remaining null values
UPDATE projects SET category = 'Web App' WHERE category IS NULL;