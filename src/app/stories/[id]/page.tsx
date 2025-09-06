'use client'

import Link from "next/link";
import { getStoryById } from '@/lib/stories';
import StoryDisplay from '@/components/StoryDisplay';
import ClientCommentSection from '@/components/ClientCommentSection';
import PageLayout from '@/components/PageLayout';
import { useParams, notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Story } from '@/types/database';

export default function StoryPage() {
  const params = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const storyId = params.id as string;
        const foundStory = await getStoryById(storyId);
        
        if (!foundStory) {
          setNotFoundError(true);
        } else {
          setStory(foundStory);
        }
      } catch (error) {
        console.error('Error loading story:', error);
        setNotFoundError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadStory();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading story...</p>
        </div>
      </PageLayout>
    );
  }

  if (notFoundError || !story) {
    notFound();
  }

  return (
    <PageLayout>
      {/* Story Content */}
      <StoryDisplay story={story} showDate={false} />

      {/* Comment Section */}
      <ClientCommentSection storyId={story.id} />

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <Link 
            href="/stories" 
            className="inline-flex items-center text-cyan-500 hover:text-cyan-600 text-sm font-medium"
          >
            ← All Stories
          </Link>
          <Link 
            href="/" 
            className="inline-flex items-center text-cyan-500 hover:text-cyan-600 text-sm font-medium"
          >
            Random Story →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
