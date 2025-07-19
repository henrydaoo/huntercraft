
-- Add website info table for site name and branding
CREATE TABLE public.website_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'Portfolio',
  site_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add contact subject configuration
CREATE TABLE public.contact_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL DEFAULT 'New Contact Form Submission',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add icon_url column to skills table for storing skill icons
ALTER TABLE public.skills ADD COLUMN icon_url TEXT;

-- Enable RLS for new tables
ALTER TABLE public.website_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_config ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to website_info" 
  ON public.website_info 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to contact_config" 
  ON public.contact_config 
  FOR SELECT 
  USING (true);

-- Insert default data
INSERT INTO public.website_info (site_name, site_description) 
VALUES ('Henry', 'Full-Stack Developer Portfolio');

INSERT INTO public.contact_config (subject) 
VALUES ('Portfolio Contact Form - New Message');
