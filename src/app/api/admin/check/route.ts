import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const adminAuth = request.cookies.get('admin-auth')
    
    if (adminAuth?.value === 'true') {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json({ authenticated: false })
    }
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
