# 📚 Student Showcase Website Template

> **A ready-to-deploy platform for showcasing student creative work** - stories, poems, essays, and more. Built with Next.js and Supabase.

## 🎯 **Perfect For**
- **Teachers** wanting to showcase student writing
- **Schools** creating digital portfolios  
- **Creative writing classes** sharing student work
- **Poetry clubs** publishing student poems
- **Any educational showcase** of written content

## ✨ **What You Get**
- 📱 **Mobile-responsive** student showcase site
- 👩‍🏫 **Teacher admin panel** for managing content  
- 💬 **Comment system** with moderation
- 📊 **Basic analytics** to see engagement
- 🎨 **Easy customization** - just edit one config file!

## 🚀 **15-Minute Setup**

### 1. Use This Template
Click **"Use this template"** above → Create your repository

### 2. Customize (Edit ONE file)
```javascript
// site.config.js - Change these values:
export const siteConfig = {
  siteName: "Your School Creative Writing 2025",
  school: {
    name: "Your School Name", 
    website: "https://yourschool.edu"
  },
  content: {
    type: "Stories", // "Poems", "Essays", etc.
    audience: "middle school students"
  }
  // ... see examples/ folder for more configs
}
```

### 3. Deploy
- **Database**: Create free Supabase project, run `schema.sql`
- **Website**: Connect repo to Vercel, add environment variables
- **Done!** Visit `/admin` to start adding student work

📖 **[Full Setup Guide](SETUP_NEW_SITE.md)** | 🎨 **[See Examples](examples/)**

## 📋 **Features**

### For Students
- Professional platform to share their work
- Real audience beyond the classroom
- Easy sharing of individual pieces
- Encouraging comment system

### For Teachers  
- Simple content management
- Comment moderation tools
- View analytics and engagement
- No ongoing maintenance

### For Community
- Beautiful reading experience
- Discover young talent
- Encourage student creativity
- Mobile-friendly access

## 🎨 **Example Sites**

| Use Case | Content Type | Perfect For |
|----------|-------------|-------------|
| **Horror Stories** | Creative Fiction | Middle school creative writing |  
| **Poetry Showcase** | Poems | High school poetry class |
| **Personal Essays** | Reflective Writing | Senior graduation portfolios |
| **Creative Writing** | Mixed Content | Writing club showcases |

See `examples/` folder for ready-made configurations!

## 🛠 **Tech Stack**
- **Frontend**: Next.js 15 + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Styling**: Tailwind CSS
- **Editor**: TinyMCE for rich text

## 🎓 **Educational Benefits**

### **Student Motivation**
- Real audience beyond teacher/classmates
- Professional presentation of their work
- Pride in published writing
- Constructive feedback from community

### **Teacher Benefits**
- Easy content management
- Built-in moderation tools
- Analytics on student engagement
- Professional portfolio platform

### **Community Connection**
- Showcases school talent
- Encourages community engagement
- Celebrates student achievement
- Builds school pride

## 📚 **Documentation**

- 📖 **[Setup Guide](SETUP_NEW_SITE.md)** - Complete deployment instructions
- 🔧 **[Lessons Learned](CLAUDE_LESSONS_LEARNED.md)** - Common issues and solutions
- 🎨 **[Example Configs](examples/)** - Ready-made site configurations
- 📊 **[Analytics Setup](create-analytics-table.sql)** - Database setup for analytics

## 💡 **Customization Options**

### Easy (Config File Only)
- Site name, school info, colors
- Content type (stories → poems → essays)
- About page text and messaging
- Feature toggles (analytics, comments, etc.)

### Advanced (Code Changes)  
- Layout and design modifications
- Additional content fields
- Custom features and functionality
- Advanced analytics and reporting

## 🤝 **Contributing**
This template is open source! Improvements welcome:
- Report issues or suggest features
- Submit pull requests for enhancements  
- Share your customizations with the community
- Help other educators succeed

## 📄 **License**
MIT License - use freely for educational purposes

---

**🎉 Ready to showcase your students' amazing work?** 
**[Use This Template](../../generate)** and have your site running in 15 minutes!

*Built with ❤️ for educators and students*