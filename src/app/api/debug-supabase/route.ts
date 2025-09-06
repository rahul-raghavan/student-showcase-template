import { NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Test both supabase clients
    console.log('Testing Supabase connections...')
    
    const results = {
      timestamp: new Date().toISOString(),
      clientsCreated: {
        supabase: !!supabase,
        supabaseAdmin: !!supabaseAdmin
      },
      tests: {} as any
    }

    // Test 1: Check if we can connect and list tables with regular client
    if (supabase) {
      try {
        console.log('Testing regular supabase client...')
        const { data: storiesRead, error: readError } = await supabase
          .from('stories')
          .select('count')
          .limit(1)
        
        results.tests.regularClientRead = {
          success: !readError,
          error: readError?.message,
          data: storiesRead
        }
      } catch (error: any) {
        results.tests.regularClientRead = {
          success: false,
          error: error.message
        }
      }
    }

    // Test 2: Check if we can insert with admin client
    if (supabaseAdmin) {
      try {
        console.log('Testing admin client insert...')
        const testStory = {
          title: 'Debug Test Story - ' + Date.now(),
          content: '<p>This is a test story created by the debug endpoint.</p>',
          is_visible: false // Make it invisible so it doesn't clutter the site
        }

        const { data: insertResult, error: insertError } = await supabaseAdmin
          .from('stories')
          .insert([testStory])
          .select()

        results.tests.adminClientInsert = {
          success: !insertError,
          error: insertError?.message,
          data: insertResult
        }

        // If insert worked, clean up by deleting the test story
        if (!insertError && insertResult && insertResult[0]) {
          console.log('Cleaning up test story...')
          await supabaseAdmin
            .from('stories')
            .delete()
            .eq('id', insertResult[0].id)
        }
      } catch (error: any) {
        results.tests.adminClientInsert = {
          success: false,
          error: error.message
        }
      }
    }

    // Test 3: Check database structure
    if (supabaseAdmin) {
      try {
        console.log('Checking database structure...')
        // Get table info
        const { data: tableInfo, error: tableError } = await supabaseAdmin
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable')
          .eq('table_name', 'stories')
          .eq('table_schema', 'public')

        results.tests.tableStructure = {
          success: !tableError,
          error: tableError?.message,
          columns: tableInfo
        }
      } catch (error: any) {
        results.tests.tableStructure = {
          success: false,
          error: error.message
        }
      }
    }

    console.log('Debug results:', results)
    return NextResponse.json(results)
  } catch (error: any) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}