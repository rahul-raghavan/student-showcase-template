// Configuration for Poetry Showcase Site
export const siteConfig = {
  siteName: "Lincoln High Poetry Showcase 2025",
  siteDescription: "Beautiful poems by our talented high school students",
  
  school: {
    name: "Lincoln High School",
    website: "https://lincolnhigh.edu",
    logoPath: "/school-logo.png"
  },
  
  content: {
    type: "Poems",
    typeSingular: "Poem", 
    verb: "written",
    audience: "high school students",
    themes: "diverse poetic expressions and artistic exploration",
    contentWarning: "These poems showcase diverse themes, emotions, and artistic expression appropriate for all audiences."
  },
  
  theme: {
    primaryColor: "purple-700", 
    accentColor: "indigo-600", 
    logoHeight: "h-12"
  },
  
  about: {
    mainText: "These poems were written by talented students at {school}. Each piece represents thoughtful crafting, revision, and artistic expression.",
    goalText: "Poetry deserves an audience. We invite you to experience the creativity and voice of young poets, and leave encouraging feedback.",
    callToAction: "Discover the poetic voices of our students by reading a randomly selected poem..."
  },
  
  navigation: {
    homeLabel: "About",
    randomLabel: "Random {ContentTypeSingular}",
    allLabel: "All {ContentType}",
    adminLabel: "Admin"
  },
  
  features: {
    analytics: true,
    comments: true,
    randomSelection: true,
    adminPanel: true
  }
}