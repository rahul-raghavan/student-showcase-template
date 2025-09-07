import { siteConfig, getReplacements } from '../../site.config.js'

// Text replacement helper
export function replaceTemplateText(text: string): string {
  const replacements = getReplacements()
  let result = text
  
  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    result = result.replace(new RegExp(placeholder, 'g'), replacement)
  })
  
  return result
}

// Export configuration for easy access
export { siteConfig }

// Helper functions for common patterns
export const getContentLabels = () => ({
  plural: siteConfig.content.type,
  singular: siteConfig.content.typeSingular,
  pluralLower: siteConfig.content.type.toLowerCase(),
  singularLower: siteConfig.content.typeSingular.toLowerCase()
})

export const getNavigationLabels = () => ({
  home: siteConfig.navigation.homeLabel,
  random: replaceTemplateText(siteConfig.navigation.randomLabel),
  all: replaceTemplateText(siteConfig.navigation.allLabel),
  admin: siteConfig.navigation.adminLabel
})

export const getAboutContent = () => ({
  main: replaceTemplateText(siteConfig.about.mainText),
  goal: replaceTemplateText(siteConfig.about.goalText),
  callToAction: replaceTemplateText(siteConfig.about.callToAction)
})