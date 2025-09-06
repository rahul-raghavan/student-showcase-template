import { NextResponse } from 'next/server'

export async function GET() {
  // Debug endpoint to check environment variables (remove after fixing)
  const envVars = {
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
    anonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    supabaseUrlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
    // Only show first/last few characters of keys for security
    anonKeyPreview: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10) + '...' + 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(-10) : 'missing',
    serviceKeyPreview: process.env.SUPABASE_SERVICE_ROLE_KEY ? 
      process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 10) + '...' + 
      process.env.SUPABASE_SERVICE_ROLE_KEY.slice(-10) : 'missing'
  }

  return NextResponse.json(envVars)
}