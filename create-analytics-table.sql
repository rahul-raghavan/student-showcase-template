-- Create story_views table for basic analytics
CREATE TABLE IF NOT EXISTS story_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- Anonymous session identifier
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_story_views_story_id ON story_views(story_id);
CREATE INDEX IF NOT EXISTS idx_story_views_session ON story_views(session_id);

-- Enable RLS for story_views
ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

-- Create policy for story_views (public insert, admin read)
DROP POLICY IF EXISTS "Anyone can insert story views" ON story_views;
CREATE POLICY "Anyone can insert story views" ON story_views
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Story views are viewable by everyone" ON story_views;
CREATE POLICY "Story views are viewable by everyone" ON story_views
  FOR SELECT USING (true);