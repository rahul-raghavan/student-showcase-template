'use client'

import { Comment } from '@/types/database'

interface CommentListProps {
  comments: Comment[]
  isLoading?: boolean
}

export default function CommentList({ comments, isLoading = false }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
          <div className="bg-gray-200 h-3 w-full rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-4 w-1/3 rounded mb-2"></div>
          <div className="bg-gray-200 h-3 w-full rounded"></div>
        </div>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600 italic text-sm">
          No comments yet. Be the first to share your thoughts!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600 leading-relaxed">{comment.content}</p>
          <p className="text-sm text-gray-400 mt-2">
            Comment by: {comment.author_name || 'Anonymous'}
          </p>
        </div>
      ))}
    </div>
  )
}
