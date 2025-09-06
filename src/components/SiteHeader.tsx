'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SiteHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function SiteHeader({ title, subtitle }: SiteHeaderProps) {
  const pathname = usePathname();
  
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* School Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/pep-logo.png"
            alt="PEP Schoolv2"
            width={200}
            height={50}
            className="h-12 w-auto"
          />
        </div>

        {/* Site Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-700 mb-4">
            All-Stars Horror Stories 2025
          </h1>
        </div>

        {/* Page Title */}
        {title && (
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex items-center justify-center space-x-6 text-sm">
          <Link 
            href="/" 
            className={`hover:text-cyan-500 transition-colors ${
              pathname === '/' ? 'text-cyan-500 font-medium' : 'text-gray-600'
            }`}
          >
            Home
          </Link>
          
          <span className="text-gray-300">•</span>
          
          <Link 
            href="/stories" 
            className={`hover:text-cyan-500 transition-colors ${
              pathname === '/stories' ? 'text-cyan-500 font-medium' : 'text-gray-600'
            }`}
          >
            All Stories
          </Link>
          
          <span className="text-gray-300">•</span>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="text-gray-600 hover:text-cyan-500 transition-colors"
          >
            Random Story
          </button>
        </nav>
      </div>
    </header>
  );
}