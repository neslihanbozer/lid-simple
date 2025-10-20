export const metadata = {
  title: 'Häufig gestellte Fragen - Leben in Deutschland Test',
  description: 'Antworten auf die häufigsten Fragen zum Einbürgerungstest und unserem Quiz.',
  robots: { index: true, follow: true }
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Häufig gestellte Fragen</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Ist der Test kostenlos?</h2>
              <p className="text-gray-700">Ja, unser Quiz ist vollständig kostenlos und erfordert keine Anmeldung.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Wie viele Fragen gibt es?</h2>
              <p className="text-gray-700">Unser Quiz enthält über 300 offizielle Fragen aus dem Leben in Deutschland Test.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Wie lange dauert der Test?</h2>
              <p className="text-gray-700">Der offizielle Test dauert 60 Minuten. Unser Quiz kann in Ihrem eigenen Tempo absolviert werden.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Welche Themen werden abgedeckt?</h2>
              <p className="text-gray-700">Geschichte, Politik, Gesellschaft, Integration und weitere Themen des offiziellen Tests.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Kann ich den Test wiederholen?</h2>
              <p className="text-gray-700">Ja, Sie können das Quiz so oft wie gewünscht wiederholen, um sich zu verbessern.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
