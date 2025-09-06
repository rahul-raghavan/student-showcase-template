import { Comment } from '@/types/database'
import { supabase, supabaseAdmin } from './supabase'

// Check if we have valid Supabase configuration
function hasValidSupabaseConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && url !== 'your_supabase_url_here' && key !== 'your_supabase_anon_key_here')
}

// Default mock data for comments (fallback)
const defaultMockComments: Comment[] = [
  {
    id: '1',
    story_id: 'story-1',
    author_name: 'Sarah M.',
    content: 'This story really resonated with me. Thank you for sharing your journey!',
    is_approved: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    story_id: 'story-1',
    author_name: 'Anonymous',
    content: 'Beautiful writing. I went through something similar in high school.',
    is_approved: true,
    created_at: '2024-01-16T14:20:00Z',
    updated_at: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    story_id: 'story-2',
    author_name: 'John D.',
    content: 'Kindness really does make a difference. Thanks for the reminder!',
    is_approved: true,
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z'
  }
]

// Helper functions for localStorage (fallback when Supabase is not configured)
function getCommentsFromStorage(): Comment[] {
  if (typeof window === 'undefined') {
    return defaultMockComments
  }
  
  try {
    const stored = localStorage.getItem('mock-comments')
    if (stored) {
      const parsed = JSON.parse(stored) as Comment[]
      return parsed
    }
  } catch (error) {
    console.error('Error loading comments from storage:', error)
  }
  
  return defaultMockComments
}

function saveCommentsToStorage(comments: Comment[]): void {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    localStorage.setItem('mock-comments', JSON.stringify(comments))
  } catch (error) {
    console.error('Error saving comments to storage:', error)
  }
}

export async function getCommentsByStoryId(storyId: string): Promise<Comment[]> {
  try {
    if (hasValidSupabaseConfig() && supabase) {
      console.log('🗄️ Using Supabase database for getCommentsByStoryId')
      const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('story_id', storyId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Supabase error in getCommentsByStoryId:', error)
        return []
      }

      return comments || []
    } else {
      console.log('📁 Using localStorage fallback for getCommentsByStoryId')
      const comments = getCommentsFromStorage()
      return comments
        .filter(comment => comment.story_id === storyId && comment.is_approved)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }
  } catch (error) {
    console.error('Error in getCommentsByStoryId:', error)
    return []
  }
}

export async function createComment(storyId: string, authorName: string | null, content: string): Promise<boolean> {
  try {
    if (hasValidSupabaseConfig() && supabase) {
      console.log('🗄️ Using Supabase database for createComment')
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            story_id: storyId,
            author_name: authorName,
            content,
            is_approved: false // Comments require approval
          }
        ])

      if (error) {
        console.error('Supabase error in createComment:', error)
        return false
      }

      console.log('✅ Comment created successfully in Supabase (pending approval)')
      return true
    } else {
      console.log('📁 Using localStorage fallback for createComment')
      const comments = getCommentsFromStorage()
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        story_id: storyId,
        author_name: authorName,
        content,
        is_approved: false, // Comments require approval
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      comments.push(newComment)
      saveCommentsToStorage(comments)
      console.log('Comment created in localStorage (pending approval):', newComment)
      return true
    }
  } catch (error) {
    console.error('Error creating comment:', error)
    return false
  }
}

// Interface for comments with story information
export interface CommentWithStory extends Comment {
  story_title: string
}

export async function getAllPendingCommentsWithStories(): Promise<CommentWithStory[]> {
  try {
    if (hasValidSupabaseConfig() && supabase) {
      console.log('🗄️ Using Supabase database for getAllPendingCommentsWithStories')
      const { data: comments, error } = await supabase
        .from('comments')
        .select(`
          *,
          stories!inner(title)
        `)
        .eq('is_approved', false)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error in getAllPendingCommentsWithStories:', error)
        return []
      }

      // Transform the joined data to match our CommentWithStory interface
      return (comments || []).map(comment => ({
        ...comment,
        story_title: comment.stories.title
      })) as CommentWithStory[]
    } else {
      console.log('📁 Using localStorage fallback for getAllPendingCommentsWithStories')
      const comments = getCommentsFromStorage()
      const pendingComments = comments.filter(comment => !comment.is_approved)
      
      // For localStorage, we need to manually join with stories
      const { getAllStories } = await import('./stories')
      const stories = await getAllStories()
      
      return pendingComments.map(comment => {
        const story = stories.find(s => s.id === comment.story_id)
        return {
          ...comment,
          story_title: story?.title || 'Unknown Story'
        }
      }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  } catch (error) {
    console.error('Error in getAllPendingCommentsWithStories:', error)
    return []
  }
}

export async function approveComment(commentId: string): Promise<boolean> {
  try {
    if (hasValidSupabaseConfig() && supabaseAdmin) {
      console.log('🗄️ Using Supabase database for approveComment')
      const { error } = await supabaseAdmin
        .from('comments')
        .update({
          is_approved: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', commentId)

      if (error) {
        console.error('Supabase error in approveComment:', error)
        return false
      }

      console.log('✅ Comment approved successfully in Supabase')
      return true
    } else {
      console.log('📁 Using localStorage fallback for approveComment')
      const comments = getCommentsFromStorage()
      const comment = comments.find(c => c.id === commentId)
      if (comment) {
        comment.is_approved = true
        comment.updated_at = new Date().toISOString()
        saveCommentsToStorage(comments)
        console.log('Comment approved in localStorage:', comment)
        return true
      }
      return false
    }
  } catch (error) {
    console.error('Error approving comment:', error)
    return false
  }
}

export async function rejectComment(commentId: string): Promise<boolean> {
  try {
    if (hasValidSupabaseConfig() && supabaseAdmin) {
      console.log('🗄️ Using Supabase database for rejectComment')
      const { error } = await supabaseAdmin
        .from('comments')
        .delete()
        .eq('id', commentId)

      if (error) {
        console.error('Supabase error in rejectComment:', error)
        return false
      }

      console.log('✅ Comment rejected (deleted) successfully in Supabase')
      return true
    } else {
      console.log('📁 Using localStorage fallback for rejectComment')
      const comments = getCommentsFromStorage()
      const commentIndex = comments.findIndex(c => c.id === commentId)
      if (commentIndex > -1) {
        comments.splice(commentIndex, 1)
        saveCommentsToStorage(comments)
        console.log('Comment rejected (deleted) from localStorage:', commentId)
        return true
      }
      return false
    }
  } catch (error) {
    console.error('Error rejecting comment:', error)
    return false
  }
}