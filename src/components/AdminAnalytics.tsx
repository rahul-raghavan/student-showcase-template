'use client'

import { useState, useEffect } from 'react'
import { getStoryViewStats, getGlobalStats } from '@/lib/analytics'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface StoryStats {
  id: string
  title: string
  uniqueViews: number
  totalViews: number
}

interface GlobalStats {
  uniqueReaders: number
  totalViews: number
}

export default function AdminAnalytics() {
  const [storyStats, setStoryStats] = useState<StoryStats[]>([])
  const [globalStats, setGlobalStats] = useState<GlobalStats>({ uniqueReaders: 0, totalViews: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [showStoryPerformance, setShowStoryPerformance] = useState(false)

  const loadStats = async () => {
    setIsLoading(true)
    try {
      const [stories, global] = await Promise.all([
        getStoryViewStats(),
        getGlobalStats()
      ])
      
      setStoryStats(stories)
      setGlobalStats(global)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

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

  const sortedStats = storyStats.sort((a, b) => b.uniqueViews - a.uniqueViews)

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Classroom Overview
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {globalStats.uniqueReaders}
            </div>
            <div className="text-sm text-blue-700">
              Unique Readers
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {globalStats.totalViews}
            </div>
            <div className="text-sm text-green-700">
              Total Story Views
            </div>
          </div>
        </div>
      </div>

      {/* Per-Story Stats - Collapsible */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowStoryPerformance(!showStoryPerformance)}
            className="flex items-center space-x-2 text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            <span>Story Performance ({sortedStats.length} stories)</span>
            {showStoryPerformance ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={loadStats}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Refresh
          </button>
        </div>

        {showStoryPerformance && (
          <>        
            {sortedStats.length === 0 ? (
              <p className="text-gray-600 text-sm py-4">
                No views recorded yet. Share your stories to start seeing analytics!
              </p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sortedStats.map((story) => (
                  <div key={story.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {story.title}
                        </h4>
                        <div className="flex space-x-4 text-sm text-gray-600">
                          <span className="font-medium text-blue-600">
                            {story.uniqueViews} unique readers
                          </span>
                          <span className="text-gray-500">
                            {story.totalViews} total views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!showStoryPerformance && sortedStats.length > 0 && (
          <p className="text-sm text-gray-500 italic">
            Click to view detailed story performance metrics
          </p>
        )}
      </div>
    </div>
  )
}