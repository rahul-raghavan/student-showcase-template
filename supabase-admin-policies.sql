-- Fix RLS policies to allow admin operations using service role key
-- Run this SQL in your Supabase SQL Editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Stories are viewable by everyone" ON stories;
DROP POLICY IF EXISTS "Approved comments are viewable by everyone" ON comments;
DROP POLICY IF EXISTS "Anyone can insert comments" ON comments;

-- Create policies that allow admin operations with service role key
-- Stories policies
CREATE POLICY "Allow public read access to visible stories" ON stories
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Allow service role full access to stories" ON stories
  USING (auth.role() = 'service_role');

-- Comments policies  
CREATE POLICY "Allow public read access to approved comments" ON comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Allow public insert of comments" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access to comments" ON comments
  USING (auth.role() = 'service_role');

-- Ensure service role can bypass RLS entirely (alternative approach)
-- This makes admin operations work without complex policies
GRANT ALL ON stories TO service_role;
GRANT ALL ON comments TO service_role;

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename IN ('stories', 'comments');