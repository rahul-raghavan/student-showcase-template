'use client'

import { useState, useEffect } from 'react'
import { CommentWithStory } from '@/lib/comments'

export default function AdminCommentModeration() {
  const [comments, setComments] = useState<CommentWithStory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadComments = async () => {
    setIsLoading(true)
    try {
      const adminPassword = localStorage.getItem('admin-authenticated')
      if (!adminPassword) {
        console.error('Admin not authenticated')
        setComments([])
        return
      }

      const response = await fetch('/api/admin/comments', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminPassword}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      } else {
        console.error('Failed to load comments:', await response.text())
        setComments([])
      }
    } catch (error) {
      console.error('Error loading comments:', error)
      setComments([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadComments()
  }, [])

  const handleApprove = async (commentId: string) => {
    setActionLoading(commentId)
    try {
      const adminPassword = localStorage.getItem('admin-authenticated')
      if (!adminPassword) {
        alert('Authentication required')
        return
      }

      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword}`
        },
        body: JSON.stringify({
          commentId,
          action: 'approve'
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Comment approved successfully:', result)
        await loadComments() // Reload comments
      } else {
        const error = await response.json()
        console.error('Failed to approve comment:', error)
        alert(`Failed to approve comment: ${error.message || error.error}`)
      }
    } catch (error) {
      console.error('Error approving comment:', error)
      alert('Failed to approve comment')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (commentId: string) => {
    if (!confirm('Are you sure you want to reject this comment? This action cannot be undone.')) {
      return
    }

    setActionLoading(commentId)
    try {
      const adminPassword = localStorage.getItem('admin-authenticated')
      if (!adminPassword) {
        alert('Authentication required')
        return
      }

      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword}`
        },
        body: JSON.stringify({
          commentId,
          action: 'reject'
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Comment rejected successfully:', result)
        await loadComments() // Reload comments
      } else {
        const error = await response.json()
        console.error('Failed to reject comment:', error)
        alert(`Failed to reject comment: ${error.message || error.error}`)
      }
    } catch (error) {
      console.error('Error rejecting comment:', error)
      alert('Failed to reject comment')
    } finally {
      setActionLoading(null)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Pending Comments
        </h3>
        <p className="text-gray-600 text-sm">
          No comments pending moderation. Great job! 🎉
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Pending Comments ({comments.length})
      </h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  {comment.author_name || 'Anonymous'}
                </h4>
                <p className="text-sm text-cyan-600 mt-1">
                  Story: &quot;{comment.story_title}&quot;
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <p className="text-gray-700 text-sm mb-4 leading-relaxed bg-gray-50 p-3 rounded border-l-4 border-gray-300">
              {comment.content}
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(comment.id)}
                disabled={actionLoading === comment.id}
                className="btn btn-primary text-sm disabled:opacity-50"
              >
                {actionLoading === comment.id ? 'Approving...' : 'Approve'}
              </button>
              
              <button
                onClick={() => handleReject(comment.id)}
                disabled={actionLoading === comment.id}
                className="btn btn-secondary text-sm disabled:opacity-50"
              >
                {actionLoading === comment.id ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
