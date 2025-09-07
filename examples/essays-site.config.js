// Configuration for Personal Essays Site
export const siteConfig = {
  siteName: "Roosevelt High Personal Essays 2025",
  siteDescription: "Thoughtful personal essays by graduating seniors",
  
  school: {
    name: "Roosevelt High School", 
    website: "https://roosevelthigh.edu",
    logoPath: "/school-logo.png"
  },
  
  content: {
    type: "Essays",
    typeSingular: "Essay",
    verb: "written", 
    audience: "graduating seniors",
    themes: "personal reflections and life experiences",
    contentWarning: "These essays contain personal reflections and experiences shared by our graduating class."
  },
  
  theme: {
    primaryColor: "blue-800",
    accentColor: "teal-600",
    logoHeight: "h-12"
  },
  
  about: {
    mainText: "These personal essays were written by graduating seniors at {school}. Each essay represents deep reflection on their high school journey and personal growth.", 
    goalText: "These voices matter. We invite you to read their stories of growth, challenge, and discovery, and share thoughtful responses.",
    callToAction: "Begin exploring our students' personal journeys through their essays..."
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