'use client'

import { useState, useEffect } from 'react'
import { getRandomStory } from '@/lib/stories'
import PageLayout from '@/components/PageLayout'
import Link from 'next/link'

export default function AboutPage() {
  const [randomStoryId, setRandomStoryId] = useState<string | null>(null)

  useEffect(() => {
    const loadRandomStoryId = async () => {
      try {
        const randomStory = await getRandomStory()
        if (randomStory) {
          setRandomStoryId(randomStory.id)
        }
      } catch (error) {
        console.error('Error loading random story ID:', error)
      }
    }

    loadRandomStoryId()
  }, [])

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-100 p-12 shadow-sm">
          {/* Main About Content */}
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <p className="text-base leading-7 text-gray-700">
                These horror stories were written by middle school students at{' '}
                <a 
                  href="https://www.pepschoolv2.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:text-cyan-700 underline font-medium transition-colors duration-200"
                >
                  PEP Schoolv2
                </a>
                . Each one began as a handwritten, handcrafted piece that we digitized to share with the wider world.
              </p>

              <br />

              <p className="text-base leading-7 text-gray-700">
                Our goal is to give young writers a real audience beyond the classroom. We invite you to read their work and leave comments that are kind, gentle, and constructive.
              </p>

              <br />

              <p className="text-base leading-7 text-gray-700">
                Start by reading a{' '}
                {randomStoryId ? (
                  <a 
                    href={`/stories/${randomStoryId}`}
                    className="text-cyan-600 hover:text-cyan-700 underline font-medium transition-colors duration-200"
                  >
                    randomly selected story
                  </a>
                ) : (
                  <span className="text-cyan-600 font-medium">randomly selected story</span>
                )}{' '}
                from the selection…
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
              {randomStoryId && (
                <a 
                  href={`/stories/${randomStoryId}`}
                  className="btn btn-primary text-center font-medium tracking-wide"
                >
                  Read a Random Story
                </a>
              )}
              <Link 
                href="/stories" 
                className="btn btn-secondary text-center font-medium tracking-wide"
              >
                Browse All Stories
              </Link>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-light italic leading-6">
              These stories contain creative horror themes appropriate for middle school audiences.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}