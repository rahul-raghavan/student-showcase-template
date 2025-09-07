# 🚀 Setup Guide: Create Your Student Showcase Site

> **For Teachers**: This guide helps you create a new website to showcase your students' creative work - stories, poems, essays, or any written content.

## 📋 **Quick Start (15 minutes)**

### Step 1: Get the Template
1. Go to https://github.com/rahul-raghavan/student-horror-stories
2. Click **"Use this template"** → **"Create a new repository"**
3. Name your repo (e.g., `lincoln-high-poetry-2025`)
4. Download or clone your new repository

### Step 2: Customize Your Site
Edit **ONE FILE**: `site.config.js`

```javascript
// Example for Poetry Site
export const siteConfig = {
  siteName: "Lincoln High Poetry Showcase 2025",
  siteDescription: "Beautiful poems by our talented students",
  
  school: {
    name: "Lincoln High School",
    website: "https://lincolnhigh.edu",
    logoPath: "/school-logo.png" // Add your logo to public folder
  },
  
  content: {
    type: "Poems",
    typeSingular: "Poem", 
    verb: "written",
    audience: "high school students",
    themes: "diverse poetic expressions",
    contentWarning: "These poems showcase diverse themes and artistic expression."
  },
  
  // ... rest stays the same
}
```

### Step 3: Deploy Your Site
1. **Create Supabase Account**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Run the SQL from `schema.sql` in SQL Editor

2. **Deploy to Vercel**:
   - Connect your GitHub repo to [vercel.com](https://vercel.com)
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `ADMIN_PASSWORD` (choose your admin password)

### Step 4: Start Using
- Visit your site → Go to `/admin` → Login
- Start adding student content!

## 🎨 **Pre-Made Configurations**

### Poetry Site
```javascript
content: {
  type: "Poems",
  typeSingular: "Poem",
  verb: "written",
  audience: "high school students", 
  themes: "diverse poetic expressions"
}
```

### Short Stories
```javascript
content: {
  type: "Stories", 
  typeSingular: "Story",
  verb: "written",
  audience: "middle school students",
  themes: "creative fictional narratives"
}
```

### Personal Essays
```javascript
content: {
  type: "Essays",
  typeSingular: "Essay", 
  verb: "written",
  audience: "senior students",
  themes: "personal reflections and experiences"
}
```

### Creative Writing
```javascript
content: {
  type: "Creative Pieces",
  typeSingular: "Piece",
  verb: "created", 
  audience: "students of all grades",
  themes: "experimental and innovative writing"
}
```

## 🎯 **What Teachers Get**

### **For Students**:
- Professional platform to showcase their work
- Real audience beyond the classroom  
- Comment system for constructive feedback
- Mobile-friendly reading experience

### **For Teachers**:
- Easy content management (add/edit/hide works)
- Comment moderation system
- Basic analytics (view counts, engagement)
- No ongoing maintenance required

### **For Parents/Community**:
- Beautiful, accessible website
- Easy sharing of individual student works
- Encourages engagement with student creativity

## 🔧 **Advanced Customization**

### Colors & Branding
```javascript
theme: {
  primaryColor: "blue-700",    // Main title color
  accentColor: "green-600",    // Link colors  
  logoHeight: "h-16"           // Logo size
}
```

### Feature Toggles
```javascript
features: {
  analytics: false,      // Disable analytics
  comments: true,        // Keep commenting
  randomSelection: true, // Keep random content feature
  adminPanel: true       // Keep admin access
}
```

### Custom About Text
```javascript
about: {
  mainText: "These poems were created by talented students at {school}. Each piece represents hours of thoughtful crafting and revision.",
  goalText: "We believe young voices deserve to be heard beyond classroom walls.",
  callToAction: "Explore our students' creative expressions..."
}
```

## ❓ **FAQ**

**Q: Do I need coding experience?**  
A: No! Just edit one config file and follow deployment steps.

**Q: What does this cost?**  
A: Free tier of Supabase + Vercel covers most school needs.

**Q: Can I change the design?**  
A: Colors and text yes, layout changes require coding.

**Q: How do I backup student work?**  
A: Export from Supabase dashboard, or use their backup features.

**Q: Can students submit directly?**  
A: Currently teacher-only for moderation. Student submission could be added.

---

**Need Help?** Reference the `CLAUDE_LESSONS_LEARNED.md` file for common issues and solutions.