'use client'

import { Story } from '@/types/database'
import StoryDisplay from './StoryDisplay'

interface HomePageClientProps {
  story: Story | null
}

export default function HomePageClient({ story }: HomePageClientProps) {
  return <StoryDisplay story={story} />
}
