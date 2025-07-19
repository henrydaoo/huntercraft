
-- Add image_urls array column to projects table and update with sample data
ALTER TABLE public.projects ADD COLUMN image_urls TEXT[];

-- Update existing projects with multiple sample images
UPDATE public.projects 
SET image_urls = ARRAY[
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop'
]
WHERE id = (SELECT id FROM public.projects LIMIT 1);

-- Update other projects with different image sets
UPDATE public.projects 
SET image_urls = ARRAY[
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
]
WHERE id != (SELECT id FROM public.projects LIMIT 1);

-- Drop the project_images table since we're using arrays now
DROP TABLE IF EXISTS public.project_images;
