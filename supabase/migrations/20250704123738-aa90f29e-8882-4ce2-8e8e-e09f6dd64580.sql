
-- Create personal_info table for basic profile information
CREATE TABLE public.personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'frontend', 'backend', 'tools'
  icon TEXT, -- lucide icon name
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- array of technology names
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_images table for project gallery
CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  employment_type TEXT, -- 'full-time', 'part-time', 'freelance', 'contract'
  start_date DATE NOT NULL,
  end_date DATE, -- null means current job
  description TEXT[],
  technologies TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for personal_info
INSERT INTO public.personal_info (name, title, bio, location) VALUES (
  'John Doe',
  'Full-Stack Developer',
  'Passionate developer with a love for creating innovative solutions and building amazing user experiences.',
  'Ho Chi Minh City, Vietnam'
);

-- Insert sample skills data
INSERT INTO public.skills (name, category, icon, order_index) VALUES
  ('React', 'frontend', 'Code', 1),
  ('Next.js', 'frontend', 'Code', 2),
  ('TypeScript', 'frontend', 'Code', 3),
  ('Tailwind CSS', 'frontend', 'Code', 4),
  ('Vue.js', 'frontend', 'Code', 5),
  ('Node.js', 'backend', 'Server', 1),
  ('Python', 'backend', 'Server', 2),
  ('PostgreSQL', 'backend', 'Database', 3),
  ('MongoDB', 'backend', 'Database', 4),
  ('REST APIs', 'backend', 'Globe', 5),
  ('Git/GitHub', 'tools', 'GitBranch', 1),
  ('Docker', 'tools', 'Container', 2),
  ('AWS', 'tools', 'Cloud', 3),
  ('Linux', 'tools', 'Terminal', 4),
  ('Figma', 'tools', 'Palette', 5);

-- Insert sample projects data
INSERT INTO public.projects (title, description, detailed_description, demo_url, github_url, technologies, featured, order_index) VALUES
  (
    'E-commerce Platform',
    'A modern e-commerce platform built with React and Node.js',
    'A full-featured e-commerce platform with user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern technologies and best practices.',
    'https://demo.example.com',
    'https://github.com/example/ecommerce',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    true,
    1
  ),
  (
    'Task Management App',
    'A collaborative task management application',
    'A real-time collaborative task management application with drag-and-drop functionality, team collaboration features, and progress tracking.',
    'https://tasks.example.com',
    'https://github.com/example/tasks',
    ARRAY['Vue.js', 'Express.js', 'MongoDB', 'Socket.io'],
    true,
    2
  ),
  (
    'Weather Dashboard',
    'A beautiful weather dashboard with forecasts',
    'A responsive weather dashboard that displays current weather conditions, 7-day forecasts, and interactive maps. Features location-based weather data and beautiful visualizations.',
    'https://weather.example.com',
    'https://github.com/example/weather',
    ARRAY['React', 'Chart.js', 'OpenWeather API', 'CSS3'],
    false,
    3
  );

-- Insert sample experience data
INSERT INTO public.experiences (company, position, location, employment_type, start_date, end_date, description, technologies, order_index) VALUES
  (
    'Tech Company Inc.',
    'Senior Full-Stack Developer',
    'Remote',
    'full-time',
    '2022-01-01',
    NULL,
    ARRAY[
      'Led development of scalable web applications using React, Node.js, and PostgreSQL',
      'Architected and implemented RESTful APIs serving 100K+ daily active users',
      'Mentored junior developers and conducted code reviews',
      'Improved application performance by 40% through optimization techniques'
    ],
    ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    1
  ),
  (
    'Digital Agency Pro',
    'Frontend Developer',
    'Ho Chi Minh City',
    'full-time',
    '2021-06-01',
    '2021-12-31',
    ARRAY[
      'Developed responsive web applications for various client projects',
      'Collaborated with design team to implement pixel-perfect UI components',
      'Integrated third-party APIs and payment gateways',
      'Optimized websites for SEO and performance'
    ],
    ARRAY['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Strapi', 'MongoDB'],
    2
  );

-- Insert sample contact info
INSERT INTO public.contact_info (linkedin_url, github_url, twitter_url) VALUES (
  'https://linkedin.com/in/johndoe',
  'https://github.com/johndoe',
  'https://twitter.com/johndoe'
);

-- Enable Row Level Security (make tables publicly readable for portfolio)
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (since this is a portfolio)
CREATE POLICY "Allow public read access" ON public.personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.contact_info FOR SELECT USING (true);
