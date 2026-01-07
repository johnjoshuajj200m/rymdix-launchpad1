-- Services table for managing service offerings
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  bullets JSONB, -- Array of strings
  icon_name TEXT NOT NULL DEFAULT 'Code',
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public can read only published services
CREATE POLICY "Public can read published services"
  ON services
  FOR SELECT
  USING (published = true);

-- Authenticated users can manage all services
CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_services_updated_at();


