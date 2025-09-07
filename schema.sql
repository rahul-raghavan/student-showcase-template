-- Create stories table
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- HTML content
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  author_name TEXT,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_stories_visible ON stories(is_visible);
CREATE INDEX idx_comments_story_id ON comments(story_id);
CREATE INDEX idx_comments_approved ON comments(is_approved);

-- Enable Row Level Security (RLS)
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for stories (public read access)
CREATE POLICY "Stories are viewable by everyone" ON stories
  FOR SELECT USING (is_visible = true);

-- Create policies for comments (public read for approved, public insert)
CREATE POLICY "Approved comments are viewable by everyone" ON comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create story_views table for basic analytics
CREATE TABLE story_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- Anonymous session identifier
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX idx_story_views_story_id ON story_views(story_id);
CREATE INDEX idx_story_views_session ON story_views(session_id);

-- Enable RLS for story_views
ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

-- Create policy for story_views (public insert, admin read)
CREATE POLICY "Anyone can insert story views" ON story_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Story views are viewable by everyone" ON story_views
  FOR SELECT USING (true);
