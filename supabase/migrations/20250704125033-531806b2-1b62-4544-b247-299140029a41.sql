
-- Create social_links table for social media links with icons
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL, -- lucide icon name
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- null means current education
  description TEXT[],
  gpa TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample social links data
INSERT INTO public.social_links (name, url, icon, order_index) VALUES
  ('GitHub', 'https://github.com/johndoe', 'Github', 1),
  ('LinkedIn', 'https://linkedin.com/in/johndoe', 'Linkedin', 2),
  ('Twitter', 'https://twitter.com/johndoe', 'Twitter', 3),
  ('Email', 'mailto:john.doe@example.com', 'Mail', 4);

-- Insert sample education data
INSERT INTO public.education (school, degree, field_of_study, location, start_date, end_date, description, gpa, order_index) VALUES
  (
    'Ho Chi Minh City University of Technology',
    'Bachelor of Science',
    'Computer Science',
    'Ho Chi Minh City, Vietnam',
    '2018-09-01',
    '2022-06-30',
    ARRAY[
      'Graduated with honors in Computer Science',
      'Specialized in Software Engineering and Web Development',
      'Completed capstone project on AI-powered recommendation systems',
      'Active member of Programming Club and Tech Innovation Society'
    ],
    '3.8/4.0',
    1
  ),
  (
    'FPT University',
    'Certificate',
    'Advanced Web Development',
    'Ho Chi Minh City, Vietnam',
    '2021-01-01',
    '2021-06-30',
    ARRAY[
      'Intensive 6-month program focused on modern web technologies',
      'Built 5+ full-stack applications using React, Node.js, and databases',
      'Collaborated with industry professionals on real-world projects'
    ],
    NULL,
    2
  );

-- Update contact_info table - remove social media columns since we have social_links table
ALTER TABLE public.contact_info DROP COLUMN IF EXISTS linkedin_url;
ALTER TABLE public.contact_info DROP COLUMN IF EXISTS github_url;
ALTER TABLE public.contact_info DROP COLUMN IF EXISTS twitter_url;
ALTER TABLE public.contact_info DROP COLUMN IF EXISTS website_url;

-- Add email field to contact_info for form submissions
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS email TEXT;

-- Enable RLS for new tables
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.education FOR SELECT USING (true);
