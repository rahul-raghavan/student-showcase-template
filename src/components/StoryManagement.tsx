'use client'

import { useState, useEffect } from 'react'
import { Story } from '@/types/database'
import { getAllStories, deleteStory, updateStoryVisibility } from '@/lib/stories'
import { Edit, Trash2, Eye, EyeOff, Plus } from 'lucide-react'

interface StoryManagementProps {
  onEditStory: (story: Story) => void
  onCreateStory: () => void
}

export default function StoryManagement({ onEditStory, onCreateStory }: StoryManagementProps) {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadStories = async () => {
    setIsLoading(true)
    try {
      const allStories = await getAllStories()
      setStories(allStories)
    } catch (error) {
      console.error('Error loading stories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStories()
  }, [])

  const handleToggleVisibility = async (storyId: string, currentVisibility: boolean) => {
    setActionLoading(storyId)
    try {
      const success = await updateStoryVisibility(storyId, !currentVisibility)
      if (success) {
        await loadStories() // Reload stories
      } else {
        alert('Failed to update story visibility')
      }
    } catch (error) {
      console.error('Error updating story visibility:', error)
      alert('Failed to update story visibility')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteStory = async (storyId: string, storyTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${storyTitle}"? This action cannot be undone.`)) {
      return
    }

    setActionLoading(storyId)
    try {
      const success = await deleteStory(storyId)
      if (success) {
        await loadStories() // Reload stories
      } else {
        alert('Failed to delete story')
      }
    } catch (error) {
      console.error('Error deleting story:', error)
      alert('Failed to delete story')
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Manage Stories ({stories.length})
        </h3>
        <button
          onClick={onCreateStory}
          className="btn btn-primary text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Story
        </button>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No stories found.</p>
          <button
            onClick={onCreateStory}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Story
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div className="flex-1 mb-3 sm:mb-0">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {story.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Created {new Date(story.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      story.is_visible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {story.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4">
                  <button
                    onClick={() => onEditStory(story)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit story"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleToggleVisibility(story.id, story.is_visible)}
                    disabled={actionLoading === story.id}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50"
                    title={story.is_visible ? 'Hide story' : 'Show story'}
                  >
                    {story.is_visible ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDeleteStory(story.id, story.title)}
                    disabled={actionLoading === story.id}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                    title="Delete story"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
