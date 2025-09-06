'use client'

import { getRandomStory } from '@/lib/stories'
import HomePageClient from '@/components/HomePageClient'
import ClientCommentSection from '@/components/ClientCommentSection'
import PageLayout from '@/components/PageLayout'
import { useState, useEffect } from 'react'
import { Story } from '@/types/database'

export default function RandomStoryPage() {
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRandomStory = async () => {
      try {
        const randomStory = await getRandomStory()
        setStory(randomStory)
      } catch (error) {
        console.error('Error loading random story:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRandomStory()
  }, [])

  if (isLoading) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading story...</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Random story display */}
      <HomePageClient story={story} />

      {/* Comment Section */}
      {story && <ClientCommentSection storyId={story.id} />}
    </PageLayout>
  )
}