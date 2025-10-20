export const metadata = {
  title: 'Über uns - Leben in Deutschland Test',
  description: 'Erfahren Sie mehr über unseren kostenlosen Einbürgerungstest und wie wir Ihnen bei der Vorbereitung helfen.',
  robots: { index: true, follow: true }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Über uns</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unser Ziel</h2>
            <p className="text-gray-700 mb-6">
              Wir helfen Menschen dabei, sich erfolgreich auf den offiziellen Einbürgerungstest vorzubereiten. 
              Unser kostenloses Quiz enthält über 300 offizielle Fragen aus dem Leben in Deutschland Test.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Warum unser Test?</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Kostenlose Nutzung ohne Anmeldung</li>
              <li>Über 300 offizielle Fragen</li>
              <li>Detaillierte Erklärungen zu jeder Antwort</li>
              <li>Fortschrittsverfolgung</li>
              <li>Mobile-optimiert</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kontakt</h2>
            <p className="text-gray-700">
              Bei Fragen oder Anregungen können Sie uns gerne kontaktieren.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
