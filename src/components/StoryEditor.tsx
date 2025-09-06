'use client'

import { useState } from 'react'

interface StoryEditorProps {
  onSave: (story: { title: string; content: string; isVisible: boolean }) => void
  onCancel: () => void
  initialStory?: {
    title: string
    content: string
    isVisible: boolean
  }
  isEditing?: boolean
}

export default function StoryEditor({ onSave, onCancel, initialStory, isEditing = false }: StoryEditorProps) {
  const [title, setTitle] = useState(initialStory?.title || '')
  const [content, setContent] = useState(initialStory?.content || '')
  const [isVisible, setIsVisible] = useState(initialStory?.isVisible ?? true)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title for the story')
      return
    }

    if (!content.trim()) {
      alert('Please enter content for the story')
      return
    }

    setIsSaving(true)
    try {
      await onSave({ title: title.trim(), content, isVisible })
    } catch (error) {
      console.error('Error saving story:', error)
      alert('Failed to save story. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {isEditing ? 'Edit Story' : 'Add New Story'}
      </h3>
      
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="story-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="story-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter story title"
          />
        </div>

        {/* Visibility Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="story-visible"
            checked={isVisible}
            onChange={(e) => setIsVisible(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="story-visible" className="ml-2 block text-sm text-gray-700">
            Make story visible to public
          </label>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            placeholder="Write your story content here..."
            rows={15}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            💡 <strong>Tip:</strong> You can use basic HTML tags like &lt;strong&gt;, &lt;em&gt;, &lt;p&gt;, &lt;br&gt; for formatting.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !title.trim() || !content.trim()}
            className="btn btn-primary disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : (isEditing ? 'Update Story' : 'Create Story')}
          </button>
        </div>
      </div>
    </div>
  )
}
