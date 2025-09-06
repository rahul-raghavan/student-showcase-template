import SiteHeader from './SiteHeader';

interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export default function PageLayout({ 
  title, 
  subtitle, 
  children, 
  maxWidth = 'md' 
}: PageLayoutProps) {
  const containerClasses = {
    sm: 'max-w-xl',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader title={title} subtitle={subtitle} />
      
      <main className={`${containerClasses[maxWidth]} mx-auto px-6 py-12`}>
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              © 2025 PEP Schoolv2
            </p>
            <a 
              href="/admin" 
              className="text-xs text-gray-400 hover:text-cyan-500 transition-colors"
            >
              Teacher Login
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}