import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy-service-key'

// Only create clients if we have valid configuration
const hasValidConfig = supabaseUrl !== 'your_supabase_url_here' && 
                      supabaseUrl !== 'https://dummy.supabase.co' &&
                      supabaseAnonKey !== 'your_supabase_anon_key_here' && 
                      supabaseAnonKey !== 'dummy-key'

export const supabase = hasValidConfig ? 
  createClient(supabaseUrl, supabaseAnonKey) : 
  null

// For server-side operations that need elevated permissions
export const supabaseAdmin = hasValidConfig ? 
  createClient(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  ) : 
  null
