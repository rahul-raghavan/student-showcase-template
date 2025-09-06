'use client'

import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

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
          <div className="border rounded-lg overflow-hidden">
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || undefined}
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'charmap', 
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'table', 'preview', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | ' +
                  'bold italic underline strikethrough | forecolor backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; }',
                block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre',
                font_family_formats: 'Arial=arial,helvetica,sans-serif; Comic Sans MS=comic sans ms,cursive; Courier New=courier new,courier,monospace; Georgia=georgia,serif; Helvetica=helvetica,arial,sans-serif; Times New Roman=times new roman,times,serif; Trebuchet MS=trebuchet ms,geneva,sans-serif; Verdana=verdana,geneva,sans-serif',
                font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                branding: false,
                promotion: false
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ✨ <strong>Rich Editor:</strong> Use the toolbar above for different fonts, sizes, colors, and formatting!
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