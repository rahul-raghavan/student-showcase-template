# Adolescent Stories - Setup Instructions

## Database Setup (Supabase)

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and API keys

2. **Configure Environment Variables**
   - Copy `.env.local` and update with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   ADMIN_PASSWORD=your_admin_password_here
   ```

3. **Set up Database Schema**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `schema.sql`
   - Run the SQL to create the tables and policies

4. **Seed Sample Data (Optional)**
   ```bash
   npm run seed
   ```

## Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **View the Site**
   - Open [http://localhost:3000](http://localhost:3000)
   - Browse stories at [http://localhost:3000/stories](http://localhost:3000/stories)
   - Access admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

## Features Implemented

### ✅ Milestone 1: Project Setup & Foundation
- Next.js 15 with TypeScript and Tailwind CSS
- Supabase integration
- Clean, minimalist UI design
- Database schema with RLS policies

### ✅ Milestone 2: Core Story Display & Navigation
- Random story display on homepage
- "Show Another Random Story" functionality
- All Stories page with story listings
- Individual story pages
- Responsive navigation

### 🚧 Coming Next: Milestone 3
- Comment system with moderation
- Admin panel for story management
- Rich text editor for story creation

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with random story
│   ├── stories/           # Stories pages
│   │   ├── page.tsx       # All stories listing
│   │   └── [id]/page.tsx  # Individual story page
│   └── admin/             # Admin panel
├── components/            # React components
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── stories.ts        # Story data functions
│   └── seed-data.ts      # Sample data
└── types/                # TypeScript types
    └── database.ts       # Database type definitions
```
