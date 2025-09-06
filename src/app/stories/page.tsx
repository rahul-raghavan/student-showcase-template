'use client'

import Link from "next/link";
import { getAllStories } from '@/lib/stories';
import PageLayout from '@/components/PageLayout';
import { useState, useEffect } from 'react';
import { Story } from '@/types/database';

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const loadedStories = await getAllStories();
        console.log('Stories loaded:', loadedStories.length, loadedStories.map(s => ({ id: s.id, title: s.title, is_visible: s.is_visible })));
        setStories(loadedStories);
      } catch (error) {
        console.error('Error loading stories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading stories...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="lg">
      {stories.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white rounded-lg border border-gray-100 p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              No Stories Available
            </h2>
            <p className="text-gray-600 text-sm">
              Stories will appear here once they are added by the teacher.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {stories.map((story) => (
            <article key={story.id} className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <header className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  <Link 
                    href={`/stories/${story.id}`}
                    className="hover:text-cyan-500 transition-colors"
                  >
                    {story.title}
                  </Link>
                </h2>
                <time className="text-sm text-gray-500" dateTime={story.created_at}>
                  {new Date(story.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </header>
              
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">
                  {story.content.replace(/<[^>]*>/g, '').substring(0, 180)}...
                </p>
              </div>
              
              <Link 
                href={`/stories/${story.id}`}
                className="inline-flex items-center text-cyan-500 hover:text-cyan-600 text-sm font-medium"
              >
                Read full story →
              </Link>
            </article>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
