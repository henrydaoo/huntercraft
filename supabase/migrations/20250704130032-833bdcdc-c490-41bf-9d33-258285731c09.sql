
-- Update skills table to remove category restriction and add more skills
DELETE FROM public.skills;

INSERT INTO public.skills (name, icon, order_index) VALUES
  ('React', 'Component', 1),
  ('TypeScript', 'Code', 2),
  ('JavaScript', 'FileText', 3),
  ('Node.js', 'Server', 4),
  ('Next.js', 'Zap', 5),
  ('Vue.js', 'Triangle', 6),
  ('Angular', 'Grid3x3', 7),
  ('Python', 'Snake', 8),
  ('Java', 'Coffee', 9),
  ('PHP', 'Database', 10),
  ('MySQL', 'Database', 11),
  ('PostgreSQL', 'Database', 12),
  ('MongoDB', 'Layers', 13),
  ('Redis', 'Zap', 14),
  ('Docker', 'Package', 15),
  ('Kubernetes', 'Cloud', 16),
  ('AWS', 'Cloud', 17),
  ('Google Cloud', 'CloudSnow', 18),
  ('Git', 'GitBranch', 19),
  ('GitHub', 'Github', 20),
  ('GitLab', 'GitBranch', 21),
  ('Tailwind CSS', 'Palette', 22),
  ('Sass', 'Paintbrush', 23),
  ('Bootstrap', 'Layout', 24),
  ('Material-UI', 'Layers', 25),
  ('Ant Design', 'Component', 26),
  ('Figma', 'Figma', 27),
  ('Adobe XD', 'Square', 28),
  ('Photoshop', 'Image', 29),
  ('Webpack', 'Package2', 30),
  ('Vite', 'Zap', 31),
  ('Jest', 'TestTube', 32),
  ('Cypress', 'Bug', 33),
  ('GraphQL', 'Network', 34),
  ('REST API', 'Api', 35),
  ('Supabase', 'Database', 36),
  ('Firebase', 'Flame', 37);

-- Add more project images for better showcase
INSERT INTO public.project_images (project_id, image_url, caption, order_index) 
SELECT 
  p.id,
  'https://images.unsplash.com/photo-' || (1500000000 + (ROW_NUMBER() OVER ())) || '?w=800&h=600&fit=crop' as image_url,
  'Screenshot ' || ROW_NUMBER() OVER (PARTITION BY p.id) as caption,
  ROW_NUMBER() OVER (PARTITION BY p.id) as order_index
FROM public.projects p
CROSS JOIN generate_series(1, 5) s
WHERE NOT EXISTS (SELECT 1 FROM public.project_images pi WHERE pi.project_id = p.id);
