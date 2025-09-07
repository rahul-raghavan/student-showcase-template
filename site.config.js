// Site Configuration - Edit this file to customize your student showcase site
export const siteConfig = {
  // Basic Site Info
  siteName: "All-Stars Horror Stories 2025",
  siteDescription: "Creative horror stories by middle school students",
  
  // School Information  
  school: {
    name: "PEP Schoolv2",
    website: "https://www.pepschoolv2.com",
    logoPath: "/pep-logo.png" // Put your school logo in public folder
  },
  
  // Content Configuration
  content: {
    type: "Stories", // "Stories", "Poems", "Essays", "Articles", etc.
    typeSingular: "Story", // "Story", "Poem", "Essay", "Article", etc.
    verb: "written", // "written", "created", "composed", "crafted"
    audience: "middle school students", // "high school seniors", "elementary students", etc.
    themes: "creative horror themes", // "poetic expressions", "personal narratives", etc.
    contentWarning: "These stories contain creative horror themes appropriate for middle school audiences."
  },
  
  // UI Customization
  theme: {
    primaryColor: "red-700", // Tailwind color for main title
    accentColor: "cyan-600", // Tailwind color for links
    logoHeight: "h-12" // Tailwind height class for logo
  },
  
  // About Page Content
  about: {
    mainText: "These horror stories were written by middle school students at {school}. Each one began as a handwritten, handcrafted piece that we digitized to share with the wider world.",
    goalText: "Our goal is to give young writers a real audience beyond the classroom. We invite you to read their work and leave comments that are kind, gentle, and constructive.",
    callToAction: "Start by reading a randomly selected story from the selection…"
  },
  
  // Navigation
  navigation: {
    homeLabel: "About",
    randomLabel: "Random {contentType}",
    allLabel: "All {contentType}",
    adminLabel: "Admin"
  },
  
  // Features to Enable/Disable
  features: {
    analytics: true,
    comments: true,
    randomSelection: true,
    adminPanel: true
  }
}

// Template replacements - these get automatically replaced throughout the app
export const getReplacements = () => ({
  '{school}': siteConfig.school.name,
  '{schoolWebsite}': siteConfig.school.website,
  '{contentType}': siteConfig.content.type.toLowerCase(),
  '{ContentType}': siteConfig.content.type,
  '{contentTypeSingular}': siteConfig.content.typeSingular.toLowerCase(),
  '{ContentTypeSingular}': siteConfig.content.typeSingular,
  '{verb}': siteConfig.content.verb,
  '{audience}': siteConfig.content.audience,
  '{themes}': siteConfig.content.themes
})