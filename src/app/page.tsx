'use client'

import { useState, useEffect } from 'react'
import { getRandomStory } from '@/lib/stories'
import PageLayout from '@/components/PageLayout'
import Link from 'next/link'
import { siteConfig, getAboutContent, getContentLabels } from '@/lib/config'

export default function AboutPage() {
  const [randomStoryId, setRandomStoryId] = useState<string | null>(null)
  const aboutContent = getAboutContent()
  const contentLabels = getContentLabels()

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
                {aboutContent.main.split('{school}')[0]}
                <a 
                  href={siteConfig.school.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-${siteConfig.theme.accentColor} hover:text-${siteConfig.theme.accentColor.replace('600', '700')} underline font-medium transition-colors duration-200`}
                >
                  {siteConfig.school.name}
                </a>
                {aboutContent.main.split('{school}')[1]}
              </p>

              <br />

              <p className="text-base leading-7 text-gray-700">
                {aboutContent.goal}
              </p>

              <br />

              <p className="text-base leading-7 text-gray-700">
                {aboutContent.callToAction.split('randomly selected story')[0]}
                {randomStoryId ? (
                  <a 
                    href={`/stories/${randomStoryId}`}
                    className={`text-${siteConfig.theme.accentColor} hover:text-${siteConfig.theme.accentColor.replace('600', '700')} underline font-medium transition-colors duration-200`}
                  >
                    randomly selected {contentLabels.singularLower}
                  </a>
                ) : (
                  <span className={`text-${siteConfig.theme.accentColor} font-medium`}>randomly selected {contentLabels.singularLower}</span>
                )}{' '}
                {aboutContent.callToAction.split('randomly selected story')[1]}
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
                  Read a Random {contentLabels.singular}
                </a>
              )}
              <Link 
                href="/stories" 
                className="btn btn-secondary text-center font-medium tracking-wide"
              >
                Browse All {contentLabels.plural}
              </Link>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-light italic leading-6">
              {siteConfig.content.contentWarning}
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}