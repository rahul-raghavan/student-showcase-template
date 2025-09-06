# 🚀 Production Deployment Guide
## All-Stars Horror Stories 2025

This comprehensive guide will walk you through deploying your student stories website to production using **Supabase** (database) and **Vercel** (hosting).

> ⚠️ **Important**: Your current app uses localStorage for data storage, which only works locally. For production, you **MUST** set up Supabase database or all data will be lost when users refresh the page.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ A GitHub account (to connect with Vercel)
- ✅ An email address for creating Supabase account
- ✅ Your chosen admin password for production site
- ✅ About 30-45 minutes to complete setup

---

## 🗄️ Step 1: Set Up Supabase Database (Required)

### 1.1 Create Supabase Account
1. **Go to [supabase.com](https://supabase.com)**
2. **Click "Start your project"**
3. **Sign up** with GitHub or email (GitHub recommended for easier workflow)
4. **Verify your email** if prompted

### 1.2 Create Your Project
1. **Click "New Project"** on your dashboard
2. **Choose organization** (or create new one if first time)
3. **Fill out project details:**
   - **Project Name**: `pep-horror-stories` (or your preferred name)
   - **Database Password**: **CREATE A STRONG PASSWORD** and save it securely!
   - **Region**: Choose closest to your school location
4. **Click "Create new project"**
5. **Wait 2-3 minutes** for Supabase to set up your database

### 1.3 Create Database Tables
1. **Go to "SQL Editor"** in the left sidebar
2. **Click "New Query"**
3. **Copy and paste this ENTIRE script** (scroll to see all of it):

```sql
-- Create stories table
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  author_name TEXT,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_stories_visible ON stories(is_visible);
CREATE INDEX idx_comments_story_id ON comments(story_id);
CREATE INDEX idx_comments_approved ON comments(is_approved);

-- Enable Row Level Security (RLS)
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for stories (public read access)
CREATE POLICY "Stories are viewable by everyone" ON stories
  FOR SELECT USING (is_visible = true);

-- Create policies for comments (public read for approved, public insert)
CREATE POLICY "Approved comments are viewable by everyone" ON comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. **Click "RUN"** (bottom right of editor)
5. **Verify success**: You should see "Success. No rows returned" message

### 1.4 Get Your Database Credentials
1. **Go to "Settings"** → **"API"** (in left sidebar)
2. **Copy and save these 3 values:**
   - **Project URL**: `https://xxxxxxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`
   - **service_role key**: Different long string, also starts with `eyJ...`

> 🔒 **Security Note**: Keep the service_role key SECRET - it has admin access to your database!

---

## 📁 Step 2: Prepare Your Code Repository

### 2.1 Create GitHub Repository
1. **Go to [github.com](https://github.com)**
2. **Click "New repository"** (green button)
3. **Repository settings:**
   - **Name**: `student-horror-stories` (or your choice)
   - **Description**: "PEP School Horror Stories Website"
   - **Visibility**: **Private** (recommended for school projects)
4. **Click "Create repository"**

### 2.2 Upload Your Code to GitHub
1. **Open Terminal/Command Prompt** in your project folder
2. **Run these commands** (replace YOUR_USERNAME and REPO_NAME):

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - ready for production deployment"

# Connect to GitHub (replace with your details)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

3. **Refresh your GitHub page** - you should see all your project files

---

## 🌐 Step 3: Deploy to Vercel

### 3.1 Create Vercel Account
1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Sign Up"**
3. **Choose "Continue with GitHub"**
4. **Authorize Vercel** to access your GitHub account

### 3.2 Import Your Project
1. **On Vercel dashboard, click "New Project"**
2. **Find your repository** in the list (search if needed)
3. **Click "Import"** next to your project

### 3.3 Configure Deployment Settings
1. **Project settings:**
   - **Project Name**: `pep-horror-stories-2025` (or your choice)
   - **Framework**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)

2. **Environment Variables** (MOST IMPORTANT STEP):
   **Expand the "Environment Variables" section** and add these **4 variables**:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `ADMIN_PASSWORD` | Your chosen admin password | `MySecurePassword123!` |
| `NEXT_PUBLIC_TINYMCE_API_KEY` | Your TinyMCE API key (see setup below) | `your-api-key-here` |

**🔧 TinyMCE API Key Setup:**
   1. **Go to [tiny.cloud](https://www.tiny.cloud/auth/signup/)**
   2. **Sign up for free account** (no credit card required)
   3. **After signup, go to [dashboard](https://www.tiny.cloud/my-account/dashboard/)**
   4. **Click "Tiny API Key" in sidebar**
   5. **Copy your API key** (format: `your-domain-here`)
   6. **Add as `NEXT_PUBLIC_TINYMCE_API_KEY` environment variable** in step above

3. **Click "Deploy"**
4. **Wait 3-5 minutes** for deployment to complete

### 3.4 Get Your Live URL
1. **After deployment completes**, you'll see a success page
2. **Your website URL** will be something like: `https://pep-horror-stories-2025.vercel.app`
3. **Click "Visit"** to see your live site!

---

## ✅ Step 4: Test Your Live Website

### 4.1 Basic Site Test
**Visit your Vercel URL and check:**
- ✅ Site loads with PEP Schoolv2 logo at top
- ✅ Red title "All-Stars Horror Stories 2025"
- ✅ "All Stories" page works (will be empty initially)
- ✅ Footer shows "Teacher Login" link

### 4.2 Admin Panel Test
1. **Click "Teacher Login"** in the footer
2. **Enter your admin password** (from environment variables)
3. **Create a test story:**
   - **Title**: "Test Story - Deployment Success"
   - **Content**: "This is a test story to verify everything is working correctly!"
   - **Make sure "Visible" is checked**
   - **Click "Save Story"**

### 4.3 Story Display Test
1. **Go to homepage** - your test story should appear randomly
2. **Click "All Stories"** - your test story should be listed
3. **Click the story title** - individual story page should load perfectly
4. **Try leaving a test comment** with name and message

### 4.4 Comment Moderation Test
1. **Go back to Admin panel** (Teacher Login)
2. **Check "Pending Comments" section** - should show your test comment
3. **Click "Approve"** on your test comment
4. **Go back to the story page** - your comment should now be visible to everyone

> 🎉 **If all tests pass, your website is successfully deployed and ready for students!**

---

## 🌍 Step 5: Custom Domain (Optional but Recommended)

If you want a professional URL like `stories.pepschool.org` instead of the Vercel URL:

### 5.1 Get a Domain
**Option A: Use School's Existing Domain**
- Contact your school's IT department
- Ask them to create a subdomain like `stories.yourschool.org`

**Option B: Purchase New Domain**
- Use services like Namecheap, GoDaddy, or Google Domains
- Search for available domains related to your school

### 5.2 Configure Domain in Vercel
1. **Go to your Vercel project dashboard**
2. **Click "Settings"** → **"Domains"**
3. **Add your domain name**
4. **Follow the DNS configuration instructions** provided by Vercel
5. **Wait 5-15 minutes** for DNS propagation and SSL certificate setup

---

## 🔧 Step 6: Ongoing Management

### 6.1 Adding Stories
- **Use admin panel** at `your-domain.com/admin`
- **Stories support rich text formatting** (bold, italic, paragraphs)
- **Toggle visibility** to hide stories temporarily
- **Students can create multiple stories** throughout the year

### 6.2 Comment Moderation
- **All comments require approval** before appearing publicly
- **Admin panel clearly shows which story** each comment belongs to
- **You can approve or reject comments** as needed
- **Approved comments appear immediately** on the story pages

### 6.3 Regular Maintenance
- **Check pending comments regularly** (weekly recommended)
- **Monitor story content** for appropriateness
- **Your Supabase database** is automatically backed up
- **Vercel handles all server maintenance** automatically

---

## 🔍 Troubleshooting Common Issues

### ❌ "Internal Server Error" or Site Won't Load
**Possible Causes:**
- Environment variables not set correctly in Vercel
- Supabase credentials are wrong

**Solutions:**
1. **Check Vercel environment variables**: Go to project Settings → Environment Variables
2. **Verify Supabase credentials**: Test them in your local `.env.local` first
3. **Redeploy**: In Vercel, go to Deployments → click "..." → "Redeploy"

### ❌ "Stories Not Loading" or Empty Pages
**Possible Causes:**
- Database tables not created properly
- RLS (Row Level Security) policies blocking access

**Solutions:**
1. **Check Supabase tables**: Go to Table Editor and verify `stories` and `comments` tables exist
2. **Re-run SQL script**: Go to SQL Editor and run the database creation script again
3. **Check RLS policies**: In Authentication → Policies, verify policies exist for both tables

### ❌ "Admin Login Not Working"
**Possible Causes:**
- `ADMIN_PASSWORD` environment variable not set
- Cached credentials in browser

**Solutions:**
1. **Check Vercel environment variable**: Verify `ADMIN_PASSWORD` is set exactly as intended
2. **Clear browser cache**: Try incognito/private browsing mode
3. **Redeploy**: Make changes in Vercel and redeploy

### ❌ "Comments Not Appearing"
**Expected Behavior**: Comments require teacher approval first!

**Check:**
1. **Admin panel**: Go to Teacher Login → check "Pending Comments"
2. **Approve comments**: Click "Approve" for comments to make them visible
3. **Story context**: Verify admin panel shows which story each comment belongs to

### 💡 Getting Help
- **Vercel Issues**: Check deployment logs in Vercel dashboard
- **Supabase Issues**: Check logs in Supabase dashboard
- **General Help**: Review error messages in browser developer tools (F12)

---

## 🛡️ Security & Best Practices

### ✅ Already Implemented Security Features
- **🔒 Row Level Security (RLS)** enabled on database
- **👥 Comment moderation** - all comments require approval
- **🔐 Admin panel** password protected
- **🚀 HTTPS** automatically provided by Vercel
- **🗃️ Environment variables** properly secured

### 🔒 Additional Security Recommendations
1. **Use strong admin password** (12+ characters, mixed case, numbers, symbols)
2. **Keep Supabase service key secret** - never share or commit to code
3. **Monitor admin access** - change password if compromised
4. **Regular backups**: Supabase auto-backups, but consider periodic exports

---

## 📊 Monitoring & Analytics (Optional)

### Vercel Analytics
1. **Go to your Vercel project dashboard**
2. **Click "Analytics" tab** to see visitor stats
3. **View performance metrics** and popular pages

### Supabase Monitoring
1. **Go to your Supabase dashboard**
2. **Check "Database" → "Logs"** for any errors
3. **Monitor usage** in Settings → Billing

---

## 🎓 Summary

After completing this guide, you'll have:

- ✅ **Professional website** hosted at a Vercel URL (and optional custom domain)
- ✅ **Secure database** on Supabase with automatic backups
- ✅ **Admin panel** for managing stories and comments
- ✅ **Comment moderation system** for safe community interaction
- ✅ **Shareable story URLs** for families and friends
- ✅ **Mobile-responsive design** that works on all devices
- ✅ **Production-ready security** with HTTPS and RLS

### 🎉 Your Students' Horror Stories Are Now Live!

Students can create spine-chilling stories, families can read and comment, and you maintain full control over all content. The website is ready for your classroom and the wider school community!

### 📝 Quick Reference Links
- **Your Live Site**: `https://your-project-name.vercel.app`
- **Admin Panel**: `https://your-project-name.vercel.app/admin`
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Supabase Dashboard**: [supabase.com/dashboard](https://supabase.com/dashboard)

---

## 📞 Need Help?

If you encounter issues during deployment:
1. **Double-check each step** in this guide
2. **Verify all credentials** are copied correctly
3. **Check error messages** in Vercel deployment logs
4. **Test locally first** with your production environment variables

The most common issues are missing or incorrect environment variables - make sure all 4 variables are set exactly as shown in the guide!
