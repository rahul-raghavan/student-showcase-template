import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="btn btn-primary inline-block"
          >
            Go Home
          </Link>
          <div>
            <Link 
              href="/stories" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Browse All Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
