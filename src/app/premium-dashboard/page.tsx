'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PremiumDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState('de')
  const [selectedState, setSelectedState] = useState('all')
  const [aiExplanation, setAiExplanation] = useState('')

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', isDefault: true },
    { code: 'de-tr', name: 'Deutsch + Türkçe', flag: '🇩🇪🇹🇷' },
    { code: 'de-en', name: 'Deutsch + English', flag: '🇩🇪🇺🇸' },
    { code: 'de-fr', name: 'Deutsch + Français', flag: '🇩🇪🇫🇷' },
    { code: 'de-es', name: 'Deutsch + Español', flag: '🇩🇪🇪🇸' },
    { code: 'de-ar', name: 'Deutsch + العربية', flag: '🇩🇪🇸🇦' }
  ]

  const states = [
    { code: 'all', name: 'Tüm Eyaletler' },
    { code: 'bayern', name: 'Bayern' },
    { code: 'baden-wuerttemberg', name: 'Baden-Württemberg' },
    { code: 'north-rhine-westphalia', name: 'Nordrhein-Westfalen' },
    { code: 'hesse', name: 'Hessen' },
    { code: 'saxony', name: 'Sachsen' },
    { code: 'rhineland-palatinate', name: 'Rheinland-Pfalz' },
    { code: 'berlin', name: 'Berlin' },
    { code: 'schleswig-holstein', name: 'Schleswig-Holstein' },
    { code: 'brandenburg', name: 'Brandenburg' },
    { code: 'saxony-anhalt', name: 'Sachsen-Anhalt' },
    { code: 'thuringia', name: 'Thüringen' },
    { code: 'hamburg', name: 'Hamburg' },
    { code: 'mecklenburg-vorpommern', name: 'Mecklenburg-Vorpommern' },
    { code: 'bremen', name: 'Bremen' },
    { code: 'saarland', name: 'Saarland' }
  ]

  const questionCategories = [
    { id: 'history', name: 'Tarih', count: 50, icon: '📚' },
    { id: 'politics', name: 'Politika', count: 45, icon: '🏛️' },
    { id: 'society', name: 'Toplum', count: 40, icon: '👥' },
    { id: 'integration', name: 'Entegrasyon', count: 35, icon: '🤝' },
    { id: 'law', name: 'Hukuk', count: 30, icon: '⚖️' },
    { id: 'culture', name: 'Kültür', count: 25, icon: '🎭' },
    { id: 'economy', name: 'Ekonomi', count: 20, icon: '💰' },
    { id: 'education', name: 'Eğitim', count: 15, icon: '🎓' }
  ]

  const getAiExplanation = async (topic: string) => {
    try {
      const response = await fetch('/api/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, language: selectedLanguage })
      })
      
      if (response.ok) {
        const data = await response.json()
        setAiExplanation(data.explanation)
      }
    } catch (error) {
      console.error('AI explanation error:', error)
    }
  }

  // Session kontrolü kaldırıldı - test için

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🎉 Premium Dashboard
              </h1>
              <p className="text-gray-600">
                Hoş geldin! Artık 300+ soruya ve tüm premium özelliklere erişimin var.
              </p>
            </div>
            <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">
              PREMIUM
            </div>
          </div>
        </div>

        {/* Language & State Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🌍 Dil Seçimi</h3>
            <p className="text-sm text-gray-600 mb-4">
              Almanca + diğer dil kombinasyonları ile öğrenin
            </p>
            <div className="grid grid-cols-1 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedLanguage === lang.code
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${lang.isDefault ? 'ring-2 ring-yellow-300' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{lang.flag}</div>
                    <div>
                      <div className="font-medium">{lang.name}</div>
                      {lang.isDefault && (
                        <div className="text-xs text-yellow-600 font-bold">⭐ Varsayılan</div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🗺️ Eyalet Seçimi</h3>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Question Categories */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">📚 Soru Kategorileri (300+ Soru)</h3>
            <Link
              href="/all-questions"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              📖 Tüm Soruları Gör
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {questionCategories.map((category) => (
              <Link
                key={category.id}
                href={`/quiz?category=${category.id}&language=${selectedLanguage}&state=${selectedState}`}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg p-4 border-2 border-transparent hover:border-blue-300 transition-all group"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-800 mb-1">{category.name}</div>
                <div className="text-sm text-gray-600">{category.count} soru</div>
                <div className="text-xs text-blue-600 mt-2 group-hover:text-blue-800">
                  Başla →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Explanation */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI ile Konu Açıklaması</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                <button
                  onClick={() => getAiExplanation('Almanya Tarihi')}
                  className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  📚 Almanya Tarihi
                </button>
                <button
                  onClick={() => getAiExplanation('Alman Siyaseti')}
                  className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  🏛️ Alman Siyaseti
                </button>
                <button
                  onClick={() => getAiExplanation('Toplumsal Değerler')}
                  className="w-full p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  👥 Toplumsal Değerler
                </button>
                <button
                  onClick={() => getAiExplanation('Entegrasyon Süreci')}
                  className="w-full p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  🤝 Entegrasyon Süreci
                </button>
              </div>
            </div>
            <div>
              {aiExplanation ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">AI Açıklaması:</h4>
                  <p className="text-gray-700">{aiExplanation}</p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                  <div className="text-4xl mb-2">🤖</div>
                  <p>Bir konu seçin, AI size detaylı açıklama yapacak!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">İlerleme Takibi</h3>
            <p className="text-gray-600 text-sm mb-4">
              Hangi konularda ne kadar ilerlediğinizi görün
            </p>
            <Link
              href="/progress"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              İlerlemeyi Gör
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Gruplu Çalışma</h3>
            <p className="text-gray-600 text-sm mb-4">
              Arkadaşlarınızla birlikte çalışın
            </p>
            <Link
              href="/groups"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Gruplara Katıl
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">❌</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Yanlış Cevaplar</h3>
            <p className="text-gray-600 text-sm mb-4">
              Yanlış cevapladığınız soruları gözden geçirin
            </p>
            <Link
              href="/wrong-answers"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Yanlış Cevaplar
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Soru Durum Takibi</h3>
            <p className="text-gray-600 text-sm mb-4">
              Yanlış sorularınızın durumunu takip edin
            </p>
            <Link
              href="/question-status"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Durum Takibi
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
