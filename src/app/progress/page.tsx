import Link from 'next/link'

export const metadata = {
  title: 'Lernfortschritt - Leben in Deutschland Test | Einbürgerungstest',
  description: 'Verfolgen Sie Ihren Lernfortschritt für den Einbürgerungstest. Sehen Sie, in welchen Themenbereichen Sie noch üben müssen.',
  keywords: 'Lernfortschritt, Einbürgerungstest, Leben in Deutschland, Fortschritt, Übung',
}

type TopicProgress = { id: string; name: string; percent: number }

export default function ProgressPage() {
  // Mock data; can be replaced with API in the future
  const items: TopicProgress[] = [
    { id: 'history', name: 'Geschichte', percent: 65 },
    { id: 'politics', name: 'Politik', percent: 40 },
    { id: 'society', name: 'Gesellschaft', percent: 55 },
    { id: 'integration', name: 'Integration', percent: 30 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/logo/lid_logo.png" 
                alt="Leben in Deutschland Test Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="ml-2 text-lg font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Startseite
              </Link>
              <Link href="/quiz" className="text-blue-600 font-medium">
                Quiz
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Lernfortschritt
            </h1>
            <p className="text-base text-gray-600">
              Verfolgen Sie Ihren Lernfortschritt in verschiedenen Themenbereichen des Einbürgerungstests
            </p>
          </div>
          
          <div className="space-y-5">
            {items.map(item => (
              <div key={item.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">%{item.percent}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/quiz">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Quiz starten
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}


