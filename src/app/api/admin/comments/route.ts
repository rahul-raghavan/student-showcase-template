import { NextRequest, NextResponse } from 'next/server'
import { approveComment, rejectComment, getAllPendingCommentsWithStories } from '@/lib/comments'

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

// GET - Get all pending comments
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Getting pending comments via API')
    
    const comments = await getAllPendingCommentsWithStories()
    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Error in GET /api/admin/comments:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// PUT - Approve or reject comment
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { commentId, action } = body

    if (!commentId || !action) {
      return NextResponse.json({ error: 'Comment ID and action are required' }, { status: 400 })
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Action must be "approve" or "reject"' }, { status: 400 })
    }

    console.log(`${action}ing comment via API:`, { commentId, action })
    
    let success = false
    if (action === 'approve') {
      success = await approveComment(commentId)
    } else {
      success = await rejectComment(commentId)
    }

    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: `Comment ${action}d successfully` 
      })
    } else {
      return NextResponse.json({ 
        error: `Failed to ${action} comment` 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in PUT /api/admin/comments:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}