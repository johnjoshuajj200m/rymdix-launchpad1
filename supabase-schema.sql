-- Rymdix Technologies - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Leads Table (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts
-- Allow anyone to read published posts
CREATE POLICY "Anyone can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Allow authenticated users to read all posts (for admin)
CREATE POLICY "Authenticated users can read all posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for leads
-- Allow anyone to insert leads (contact form)
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read all leads (for admin)
CREATE POLICY "Authenticated users can read leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();





