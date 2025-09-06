import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Simple password check (in production, use proper authentication)
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    console.log('Login attempt:', { provided: password, expected: adminPassword })
    
    if (password === adminPassword) {
      // Set a simple session cookie (in production, use proper session management)
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      })
      return response
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
