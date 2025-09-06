'use client'

import { useState } from 'react'
import { createComment } from '@/lib/comments'

interface CommentFormProps {
  storyId: string
  onCommentSubmitted?: () => void
}

export default function CommentForm({ storyId, onCommentSubmitted }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!authorName.trim()) {
      alert('Please enter your name')
      return
    }
    
    if (!content.trim()) {
      alert('Please enter a comment')
      return
    }

    setIsSubmitting(true)
    
    try {
      const success = await createComment(storyId, authorName.trim(), content.trim())
      
      if (success) {
        setAuthorName('')
        setContent('')
        setIsSubmitted(true)
        
        // Call the callback if provided, otherwise refresh the page
        if (onCommentSubmitted) {
          onCommentSubmitted()
        } else {
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      } else {
        alert('Failed to submit comment. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800 text-sm">
          ✅ Thank you for your comment! It will be reviewed by our moderator before being published.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="author-name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
          placeholder="Your name"
          required
        />
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Comment *
        </label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 leading-relaxed"
          placeholder="Share your thoughts about this story..."
          rows={4}
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !authorName.trim() || !content.trim()}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  )
}
