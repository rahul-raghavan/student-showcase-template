# Claude Code Lessons Learned - Next.js/Supabase Project

> **Note to Future Self**: This document captures common mistakes and patterns from building a student horror stories website with Next.js 15, Supabase, and TypeScript. Read this BEFORE starting similar projects.

## 🚨 Most Common Issues (Read These First!)

### 1. **Database Schema vs Production Reality**
- **Mistake**: Added new tables to `schema.sql` but forgot they don't exist in production
- **Symptom**: Analytics/new features work localhost but fail in production with "table doesn't exist"
- **Prevention**: 
  - Create separate migration files for new features (`create-analytics-table.sql`)
  - Always provide SQL scripts for user to run in their Supabase dashboard
  - Test with both development (localStorage) and production (Supabase) modes

### 2. **TypeScript Compilation Errors in Production**
- **Mistake**: Used `any` types without proper ESLint handling
- **Symptom**: "Unexpected any" errors during Vercel deployment
- **Prevention**:
  - Always run `npm run build` locally before committing
  - Use `Record<string, unknown>` instead of `any` for external API responses
  - Add `// eslint-disable-next-line @typescript-eslint/no-explicit-any` when unavoidable
  - Define proper interfaces for Supabase query results

### 3. **Authentication Architecture Confusion**
- **Mistake**: Used client-side Supabase calls for admin operations
- **Symptom**: 401 errors, "service role key not available on client"
- **Prevention**:
  - Admin operations = Server-side API routes (`/api/admin/...`)
  - Public operations = Client-side Supabase calls
  - Store admin password in localStorage after login, pass as Bearer token to APIs

### 4. **Client vs Server Component Confusion**
- **Mistake**: Used server components for dynamic/interactive features
- **Symptom**: 404 errors on story links, hydration mismatches
- **Prevention**:
  - Dynamic content that changes = Client components (`'use client'`)
  - Static content = Server components
  - Individual story pages need client components for sharing, comments, etc.

## 🔧 Architecture Patterns That Work

### Database Integration Pattern
```typescript
// Always provide dual-mode support
function hasValidSupabaseConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && url !== 'your_supabase_url_here')
}

// Graceful fallbacks
export async function getData() {
  if (!hasValidSupabaseConfig()) {
    return getDataFromLocalStorage()
  }
  return getDataFromSupabase()
}
```

### Admin Authentication Pattern
```typescript
// Server-side API route
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... admin operation
}

// Client-side call
const adminPassword = localStorage.getItem('admin-authenticated')
const response = await fetch('/api/admin/operation', {
  headers: { 'Authorization': `Bearer ${adminPassword}` }
})
```

### Analytics Implementation Pattern
```typescript
// Non-blocking, graceful failure
export async function recordEvent(data: any): Promise<void> {
  try {
    if (!hasValidConfig()) {
      console.log('Skipping analytics (no config)')
      return
    }
    await supabase.from('events').insert(data)
  } catch (error) {
    console.warn('Analytics failed:', error) // Don't break the app
  }
}
```

## ⚠️ Medium Priority Issues

### 5. **Environment Variable Management**
- **Issue**: Hardcoded fallback values cause confusion
- **Solution**: Use clear placeholder values like `'your_supabase_url_here'`

### 6. **React Hook Dependencies**
- **Issue**: ESLint warnings about missing dependencies
- **Solution**: Include the full object in dependencies, not just properties

### 7. **UI State Management**
- **Issue**: Admin panel becomes cluttered with many items
- **Solution**: Use collapsible sections with state management from the start

### 8. **Build Process Warnings**
- **Issue**: Ignored Node.js version warnings
- **Solution**: Document version requirements, provide upgrade instructions

## 🎯 Best Practices for Similar Projects

### Project Setup
1. **Always use TypeScript** - catches issues early
2. **Set up both dev and prod environments** - test dual-mode from start
3. **Plan admin authentication** - server-side API routes from day 1
4. **Design for graceful degradation** - features should fail silently

### Development Workflow
1. **Test build locally** before every commit
2. **Use TodoWrite tool** to track complex multi-step tasks
3. **Read existing code patterns** before adding new features
4. **Conservative deployment** - explain rollback options to users

### User Communication
1. **Be transparent about risks** - users appreciate honesty
2. **Provide rollback instructions** - builds confidence
3. **Test on localhost first** - show user changes before deploying
4. **Explain what's safe vs risky** - existing data, new features, etc.

## 🚀 Feature Implementation Order

### Phase 1: Core Functionality
- Database schema with proper RLS policies
- Basic CRUD operations
- Admin authentication
- Comment system

### Phase 2: Polish & UX
- UI consistency and styling
- Navigation improvements
- Error handling and loading states

### Phase 3: Advanced Features
- Analytics (separate tables, graceful fallbacks)
- Enhanced admin features
- Performance optimizations

## 🔍 Testing Checklist

Before any deployment:
- [ ] `npm run build` passes locally
- [ ] Test with both localStorage and Supabase data
- [ ] Admin panel login/logout works
- [ ] All existing functionality unchanged
- [ ] New features fail gracefully when dependencies missing
- [ ] Mobile responsive design intact
- [ ] Error boundaries handle edge cases

## 📝 Common Code Smells to Avoid

1. **Direct database calls in components** - use API routes for admin operations
2. **Missing error boundaries** - analytics should never break the app
3. **Hardcoded strings** - use constants for table names, endpoints
4. **Complex nested ternaries** - break into separate components
5. **Mixed client/server patterns** - be consistent within each feature

---

**Remember**: Conservative approach wins. Users trust you more when you explain risks and provide rollback options rather than promising everything will work perfectly.