'use client'

import { Story } from '@/types/database'
import { RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { recordStoryView } from '@/lib/analytics'

interface StoryDisplayProps {
  story: Story | null
  isLoading?: boolean
  showDate?: boolean
}

export default function StoryDisplay({ story, isLoading = false, showDate = true }: StoryDisplayProps) {
  // Track story view when component mounts and story is available
  useEffect(() => {
    if (story && story.id) {
      // Record view asynchronously - won't block the UI
      recordStoryView(story.id).catch(err => {
        // Silent failure - analytics shouldn't break the experience
        console.warn('Failed to record story view:', err)
      })
    }
  }, [story?.id])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading story...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            No Stories Available
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            There are no stories to display at the moment. Check back later!
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-white rounded-lg border border-gray-100 p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Story Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          {story.title}
        </h1>
        {showDate && (
          <time className="text-sm text-gray-500" dateTime={story.created_at}>
            {new Date(story.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        )}
      </header>

      {/* Story Content */}
      <div className="prose prose-gray max-w-none">
        <div 
          className="story-content text-gray-800 leading-relaxed space-y-4"
          style={{ 
            lineHeight: '1.7',
            fontSize: '1rem'
          }}
          dangerouslySetInnerHTML={{ __html: story.content }}
        />
      </div>
    </article>
  )
}
