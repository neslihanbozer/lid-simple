import Link from 'next/link'
import AdSlot from '@/components/AdSlot'

export const metadata = {
  title: 'Leben in Deutschland Test - Kostenlose Übungsfragen | Einbürgerungstest',
  description: 'Bereiten Sie sich kostenlos auf den Einbürgerungstest vor! 300+ offizielle Übungsfragen aus dem Leben in Deutschland Test. Sofort starten, keine Anmeldung erforderlich.',
  keywords: 'Leben in Deutschland Test, Einbürgerungstest, Einbürgerung, Deutschland Test, Übungsfragen, kostenlos',
  openGraph: {
    title: 'Leben in Deutschland Test - Kostenlose Übungsfragen',
    description: 'Bereiten Sie sich kostenlos auf den Einbürgerungstest vor! 300+ offizielle Übungsfragen.',
    type: 'website',
    url: 'https://lebenindeutschland-prep.com',
  }
}

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/logo/lid_logo.png" 
                alt="Leben in Deutschland Test Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="ml-2 text-base font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Startseite</a>
              <a href="/quiz" className="text-gray-700 hover:text-blue-600 font-medium">Quiz</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Kontakt</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              Leben in Deutschland Test
            </h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
              Bereiten Sie sich auf den offiziellen Einbürgerungstest mit über 300 Übungsfragen vor.
            </p>
          </div>

          {/* Hero Image - Brandenburg Gate */}
          <div className="relative">
            <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/Brandenburger_Tor_abends.jpg"
                alt="Brandenburg Gate illuminated at night, Berlin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
                
        {/* Feature Cards */}
        <div className="grid md:grid-cols-1 gap-6 mb-8 max-w-xl mx-auto">
          {/* Quiz Card */}
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Leben in Deutschland Quiz
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              300 Übungsfragen zu allen Themen des offiziellen Einbürgerungstests.
            </p>
            <p className="text-xs text-green-600 font-semibold mb-3">
              ✓ Kostenlos für alle
            </p>
            <Link href="/quiz">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors text-sm">
                Quiz starten
              </button>
            </Link>
      </div>
        </div>

        {/* Ad Slot */}
        <div className="max-w-xl mx-auto px-4 py-4">
          <AdSlot slot="1234567890" />
        </div>
      </main>

      </div>
  )
}
