import { Comment, Story } from '@/types/database'
import { getAllStories } from './stories'

// Default mock data for comments
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
    created_at: '2024-01-16T14:22:00Z',
    updated_at: '2024-01-16T14:22:00Z'
  },
  {
    id: '3',
    story_id: 'story-2',
    author_name: 'Mike R.',
    content: 'Kindness really does make a difference. Thanks for the reminder!',
    is_approved: true,
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    story_id: 'story-1',
    author_name: 'Emma L.',
    content: 'This needs moderation - inappropriate content',
    is_approved: false,
    created_at: '2024-01-18T16:45:00Z',
    updated_at: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    story_id: 'story-3',
    author_name: 'David K.',
    content: 'Learning to fail is so important. Great perspective!',
    is_approved: true,
    created_at: '2024-01-19T11:30:00Z',
    updated_at: '2024-01-19T11:30:00Z'
  }
]

// Helper functions for localStorage
function getCommentsFromStorage(): Comment[] {
  if (typeof window === 'undefined') {
    return defaultMockComments
  }
  
  try {
    const stored = localStorage.getItem('mock-comments')
    if (stored) {
      return JSON.parse(stored)
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
    // Mock implementation - filter comments by story ID and only return approved ones
    const comments = getCommentsFromStorage()
      .filter(comment => comment.story_id === storyId && comment.is_approved)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    
    return comments
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

export async function submitComment(storyId: string, authorName: string, content: string): Promise<boolean> {
  try {
    // Mock implementation - add comment to mock data
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      story_id: storyId,
      author_name: authorName || undefined,
      content,
      is_approved: false, // Comments need moderation
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const comments = getCommentsFromStorage()
    comments.push(newComment)
    saveCommentsToStorage(comments)
    
    console.log('Comment submitted for moderation:', newComment)
    return true
  } catch (error) {
    console.error('Error submitting comment:', error)
    return false
  }
}

export async function getAllPendingComments(): Promise<Comment[]> {
  try {
    // Mock implementation - return all unapproved comments
    return getCommentsFromStorage()
      .filter(comment => !comment.is_approved)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } catch (error) {
    console.error('Error fetching pending comments:', error)
    return []
  }
}

export interface CommentWithStory extends Comment {
  story_title: string
}

export async function getAllPendingCommentsWithStories(): Promise<CommentWithStory[]> {
  try {
    const comments = getCommentsFromStorage()
      .filter(comment => !comment.is_approved)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    
    const stories = await getAllStories()
    
    return comments.map(comment => {
      const story = stories.find(s => s.id === comment.story_id)
      return {
        ...comment,
        story_title: story?.title || 'Unknown Story'
      }
    })
  } catch (error) {
    console.error('Error fetching pending comments with stories:', error)
    return []
  }
}

export async function approveComment(commentId: string): Promise<boolean> {
  try {
    // Mock implementation - approve comment
    const comments = getCommentsFromStorage()
    const comment = comments.find(c => c.id === commentId)
    if (comment) {
      comment.is_approved = true
      comment.updated_at = new Date().toISOString()
      saveCommentsToStorage(comments)
      return true
    }
    return false
  } catch (error) {
    console.error('Error approving comment:', error)
    return false
  }
}

export async function rejectComment(commentId: string): Promise<boolean> {
  try {
    // Mock implementation - remove comment (in real app, you might want to mark as rejected)
    const comments = getCommentsFromStorage()
    const index = comments.findIndex(c => c.id === commentId)
    if (index > -1) {
      comments.splice(index, 1)
      saveCommentsToStorage(comments)
      return true
    }
    return false
  } catch (error) {
    console.error('Error rejecting comment:', error)
    return false
  }
}
