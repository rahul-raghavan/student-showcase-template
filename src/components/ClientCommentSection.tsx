'use client'

import { useState, useEffect, useCallback } from 'react'
import { Comment } from '@/types/database'
import { getCommentsByStoryId } from '@/lib/comments'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

interface ClientCommentSectionProps {
  storyId: string
}

export default function ClientCommentSection({ storyId }: ClientCommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadComments = useCallback(async () => {
    setIsLoading(true)
    try {
      const storyComments = await getCommentsByStoryId(storyId)
      setComments(storyComments)
    } catch (error) {
      console.error('Error loading comments:', error)
    } finally {
      setIsLoading(false)
    }
  }, [storyId])

  useEffect(() => {
    loadComments()
  }, [storyId, loadComments])

  const handleCommentSubmitted = () => {
    // Reload comments after a new comment is submitted
    loadComments()
  }

  return (
    <div className="mt-12 space-y-8">
      {/* Comment Form Section */}
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>
        <CommentForm storyId={storyId} onCommentSubmitted={handleCommentSubmitted} />
      </div>
      
      {/* Comments List Section */}
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comments ({comments.length})
        </h3>
        <CommentList comments={comments} isLoading={isLoading} />
      </div>
    </div>
  )
}
