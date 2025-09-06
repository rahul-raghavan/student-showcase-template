import { NextRequest, NextResponse } from 'next/server'
import { createStory, updateStory, deleteStory } from '@/lib/stories'

// Verify admin authentication
function isAuthenticated(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  const authHeader = request.headers.get('authorization')
  
  if (!adminPassword || !authHeader) {
    return false
  }
  
  // Simple bearer token authentication
  const token = authHeader.replace('Bearer ', '')
  return token === adminPassword
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, isVisible = true } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    console.log('Creating story via API:', { title: title.substring(0, 50) + '...', isVisible })
    
    const success = await createStory(title, content, isVisible)

    if (success) {
      return NextResponse.json({ success: true, message: 'Story created successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in POST /api/admin/stories:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, title, content, isVisible } = body

    if (!id || !title || !content || typeof isVisible !== 'boolean') {
      return NextResponse.json({ error: 'ID, title, content, and isVisible are required' }, { status: 400 })
    }

    console.log('Updating story via API:', { id, title: title.substring(0, 50) + '...', isVisible })
    
    const success = await updateStory(id, title, content, isVisible)

    if (success) {
      return NextResponse.json({ success: true, message: 'Story updated successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to update story' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in PUT /api/admin/stories:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Story ID is required' }, { status: 400 })
    }

    console.log('Deleting story via API:', { id })
    
    const success = await deleteStory(id)

    if (success) {
      return NextResponse.json({ success: true, message: 'Story deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in DELETE /api/admin/stories:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}