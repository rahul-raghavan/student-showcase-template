'use client'

import { useState, useEffect } from 'react'
import Link from "next/link";
import AdminLogin from '@/components/AdminLogin';
import AdminCommentModeration from '@/components/AdminCommentModeration';
import StoryManagement from '@/components/StoryManagement';
import StoryEditor from '@/components/StoryEditor';
import { Story } from '@/types/database';
// Admin operations now use API routes instead of direct function calls

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showStoryEditor, setShowStoryEditor] = useState(false)
  const [editingStory, setEditingStory] = useState<Story | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      console.error('Error checking auth:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    localStorage.removeItem('admin-authenticated')
    setIsAuthenticated(false)
  }

  const handleCreateStory = () => {
    setEditingStory(null)
    setShowStoryEditor(true)
  }

  const handleEditStory = (story: Story) => {
    setEditingStory(story)
    setShowStoryEditor(true)
  }

  const handleSaveStory = async (storyData: { title: string; content: string; isVisible: boolean }) => {
    try {
      const adminPassword = localStorage.getItem('admin-authenticated')
      if (!adminPassword) {
        alert('Authentication required')
        return
      }

      let response: Response
      
      if (editingStory) {
        // Update existing story
        response = await fetch('/api/admin/stories', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminPassword}`
          },
          body: JSON.stringify({
            id: editingStory.id,
            title: storyData.title,
            content: storyData.content,
            isVisible: storyData.isVisible
          })
        })
      } else {
        // Create new story
        response = await fetch('/api/admin/stories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminPassword}`
          },
          body: JSON.stringify({
            title: storyData.title,
            content: storyData.content,
            isVisible: storyData.isVisible
          })
        })
      }

      if (response.ok) {
        const result = await response.json()
        console.log('Story saved successfully:', result)
        setShowStoryEditor(false)
        setEditingStory(null)
        // The StoryManagement component will refresh automatically
      } else {
        const error = await response.json()
        console.error('Failed to save story:', error)
        alert(`Failed to save story: ${error.message || error.error}`)
      }
    } catch (error) {
      console.error('Error saving story:', error)
      alert('Failed to save story. Please try again.')
    }
  }

  const handleCancelEdit = () => {
    setShowStoryEditor(false)
    setEditingStory(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if (showStoryEditor) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {editingStory ? 'Edit Story' : 'Add New Story'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {editingStory ? 'Update the story content and settings' : 'Create a new story for your collection'}
                </p>
              </div>
              <button
                onClick={handleCancelEdit}
                className="text-blue-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 transition-all duration-200 no-underline text-base font-medium"
              >
                ← Back to Admin
              </button>
            </div>
          </div>
        </header>

        {/* Story Editor */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <StoryEditor
            onSave={handleSaveStory}
            onCancel={handleCancelEdit}
            initialStory={editingStory ? {
              title: editingStory.title,
              content: editingStory.content,
              isVisible: editingStory.is_visible
            } : undefined}
            isEditing={!!editingStory}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Admin Panel
              </h1>
              <p className="text-gray-600 mt-1">
                Manage stories and moderate comments
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700 transition-all duration-200 no-underline text-base font-medium"
              >
                ← Back to Site
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:border-b-2 hover:border-red-700 transition-all duration-200 no-underline text-base font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Dashboard */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Comment Moderation */}
          <AdminCommentModeration />

          {/* Story Management */}
          <StoryManagement
            onEditStory={handleEditStory}
            onCreateStory={handleCreateStory}
          />
        </div>
      </main>
    </div>
  );
}
