# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbo (http://localhost:3000)
- `npm run build` - Build the application with Turbo
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Database & Setup
- `npm run seed` - Seed the database with sample stories (uses scripts/seed.ts)
- Configure environment variables in `.env.local` with Supabase credentials

### Key URLs
- Homepage: http://localhost:3000 (random story display)
- All Stories: http://localhost:3000/stories
- Individual Story: http://localhost:3000/stories/[id]
- Admin Panel: http://localhost:3000/admin (password-protected)

## Architecture

This is a **Next.js 15** application for displaying student stories with comment moderation. Built for educators to showcase student writing in a safe, moderated environment.

### Core Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Rich Text**: TinyMCE editor for story content creation
- **Deployment**: Vercel

### Data Model
Two main entities in `src/types/database.ts`:
- **Stories**: `{id, title, content (HTML), is_visible, timestamps}`
- **Comments**: `{id, story_id, author_name?, content, is_approved, timestamps}`

### File Structure
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage (random story)
│   ├── stories/           # Story browsing & individual pages
│   │   ├── page.tsx       # All stories list
│   │   └── [id]/page.tsx  # Individual story view
│   ├── admin/             # Admin panel (password protected)
│   └── api/               # API routes
├── lib/                   # Core business logic
│   ├── supabase.ts       # Database clients (public + admin)
│   ├── stories.ts        # Story CRUD operations
│   └── comments.ts       # Comment management & moderation
├── types/
│   └── database.ts       # TypeScript interfaces
└── components/           # Reusable UI components
```

### Database Schema
- Stories and Comments tables with RLS policies
- Public read access for visible/approved content
- Admin service role for management operations
- See `schema.sql` for complete setup

### Key Features
1. **Random Story Display**: Homepage shows random visible story
2. **Comment System**: Public submission, admin moderation
3. **Admin Panel**: Story management, comment approval/rejection
4. **Rich Text Support**: HTML content storage for formatted stories
5. **Responsive Design**: Mobile-first Tailwind implementation

### Authentication
- Simple password-based admin access (no user accounts for readers)
- Environment variable `ADMIN_PASSWORD` controls admin panel access
- Supabase service role for privileged operations

### Development State
Currently using mock data with localStorage for development. Supabase integration is set up but not fully implemented in all functions. See comments in `src/lib/stories.ts` for current mock vs. real database implementation status.