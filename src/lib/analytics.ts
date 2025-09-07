import { supabase } from '@/lib/supabase'

// Check if we're using Supabase or localStorage
function hasValidSupabaseConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && url !== 'your_supabase_url_here' && key !== 'your_supabase_anon_key_here')
}

// Generate a simple session ID for anonymous tracking
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server'
  
  let sessionId = sessionStorage.getItem('story-session-id')
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15)
    sessionStorage.setItem('story-session-id', sessionId)
  }
  return sessionId
}

// Record a story view (async, non-blocking)
export async function recordStoryView(storyId: string): Promise<void> {
  try {
    // Skip analytics if no valid Supabase config
    if (!hasValidSupabaseConfig()) {
      console.log('📊 Analytics: Skipping view tracking (no Supabase config)')
      return
    }

    const sessionId = getSessionId()
    console.log('📊 Analytics: Recording view for story', storyId, 'session', sessionId.substring(0, 8) + '...')
    
    // Check if this session already viewed this story (avoid duplicate views)
    const { data: existingView, error: checkError } = await supabase
      .from('story_views')
      .select('id')
      .eq('story_id', storyId)
      .eq('session_id', sessionId)
      .limit(1)

    if (checkError) {
      console.warn('📊 Analytics: Error checking existing view:', checkError.message)
      return
    }
    
    // Only record if this session hasn't viewed this story yet
    if (!existingView || existingView.length === 0) {
      const { error: insertError } = await supabase
        .from('story_views')
        .insert({
          story_id: storyId,
          session_id: sessionId
        })
      
      if (insertError) {
        console.warn('📊 Analytics: Error inserting view:', insertError.message)
      } else {
        console.log('📊 Analytics: View recorded successfully')
      }
    } else {
      console.log('📊 Analytics: Session already viewed this story, skipping')
    }
  } catch (error) {
    // Silently fail - analytics shouldn't break the app
    console.warn('📊 Analytics: Tracking failed:', error)
  }
}

// Get view stats for admin panel
export async function getStoryViewStats() {
  try {
    // Skip analytics if no valid Supabase config
    if (!hasValidSupabaseConfig()) {
      console.log('📊 Analytics: Skipping stats (no Supabase config)')
      return []
    }

    console.log('📊 Analytics: Fetching story view stats...')
    const { data, error } = await supabase
      .from('story_views')
      .select(`
        story_id,
        stories!inner(title),
        session_id
      `)
    
    if (error) {
      console.warn('📊 Analytics: Error fetching stats:', error.message)
      return []
    }
    
    console.log('📊 Analytics: Raw data:', data?.length, 'views found')
    
    // Group by story and count unique sessions
    const stats = data.reduce((acc: any, view: any) => {
      const storyId = view.story_id
      const storyTitle = view.stories.title
      
      if (!acc[storyId]) {
        acc[storyId] = {
          id: storyId,
          title: storyTitle,
          uniqueViews: new Set(),
          totalViews: 0
        }
      }
      
      acc[storyId].uniqueViews.add(view.session_id)
      acc[storyId].totalViews++
      
      return acc
    }, {})
    
    // Convert to array and add unique view counts
    const result = Object.values(stats).map((story: any) => ({
      id: story.id,
      title: story.title,
      uniqueViews: story.uniqueViews.size,
      totalViews: story.totalViews
    }))
    
    console.log('📊 Analytics: Processed stats:', result.length, 'stories')
    return result
  } catch (error) {
    console.error('📊 Analytics: Error fetching view stats:', error)
    return []
  }
}

// Get global stats for admin overview
export async function getGlobalStats() {
  try {
    // Skip analytics if no valid Supabase config
    if (!hasValidSupabaseConfig()) {
      console.log('📊 Analytics: Skipping global stats (no Supabase config)')
      return { uniqueReaders: 0, totalViews: 0 }
    }

    console.log('📊 Analytics: Fetching global stats...')
    const { data, error } = await supabase
      .from('story_views')
      .select('session_id')
    
    if (error) {
      console.warn('📊 Analytics: Error fetching global stats:', error.message)
      return { uniqueReaders: 0, totalViews: 0 }
    }
    
    // Count unique sessions across all stories
    const uniqueReaders = new Set(data.map(view => view.session_id)).size
    const totalViews = data.length
    
    console.log('📊 Analytics: Global stats -', uniqueReaders, 'unique readers,', totalViews, 'total views')
    
    return {
      uniqueReaders,
      totalViews
    }
  } catch (error) {
    console.error('📊 Analytics: Error fetching global stats:', error)
    return { uniqueReaders: 0, totalViews: 0 }
  }
}